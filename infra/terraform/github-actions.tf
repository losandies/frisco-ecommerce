variable "github_repository" {
  description = "Exact GitHub owner/repository allowed to assume the CI roles"
  type        = string
  default     = "losandies/frisco-ecommerce"
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN, if this AWS account already has one"
  type        = string
  default     = ""
}

resource "aws_iam_openid_connect_provider" "github" {
  count          = var.github_oidc_provider_arn == "" ? 1 : 0
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

locals {
  github_provider_arn = var.github_oidc_provider_arn != "" ? var.github_oidc_provider_arn : aws_iam_openid_connect_provider.github[0].arn
}

resource "aws_iam_role" "github_publish" {
  name_prefix = "frisco-github-publish-"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Federated = local.github_provider_arn }
      Action    = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:ref:refs/heads/master"
        }
      }
    }]
  })
  tags = { Project = "frisco" }
}

resource "aws_iam_role_policy" "github_publish" {
  name = "frisco-publish-image"
  role = aws_iam_role.github_publish.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ecr:GetAuthorizationToken"
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability", "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage", "ecr:InitiateLayerUpload", "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload", "ecr:PutImage"
        ]
        Resource = aws_ecr_repository.backend.arn
      }
    ]
  })
}

# Deployment can only invoke this fixed script, not arbitrary shell commands.
resource "aws_ssm_document" "backend_deploy" {
  name            = "frisco-deploy-backend"
  document_type   = "Command"
  document_format = "JSON"
  content = jsonencode({
    schemaVersion = "2.2"
    description   = "Deploy a versioned Frisco backend image with the installed rollback script"
    parameters = {
      ImageTag = {
        type              = "String"
        description       = "Existing immutable ECR image tag"
        allowedPattern    = "^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$"
        interpolationType = "ENV_VAR"
      }
    }
    mainSteps = [{
      action = "aws:runShellScript"
      name   = "deploy"
      inputs = {
        executionTimeout = "600"
        runCommand       = ["set -eu", "exec bash /opt/frisco/deploy.sh \"$SSM_ImageTag\""]
      }
    }]
  })
  tags = { Project = "frisco" }
}

resource "aws_iam_role" "github_deploy" {
  name_prefix = "frisco-github-deploy-"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Federated = local.github_provider_arn }
      Action    = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:environment:production"
        }
      }
    }]
  })
  tags = { Project = "frisco" }
}

resource "aws_iam_role_policy" "github_deploy" {
  name = "frisco-deploy-backend"
  role = aws_iam_role.github_deploy.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ssm:SendCommand"
        Resource = [aws_instance.backend.arn, aws_ssm_document.backend_deploy.arn]
      },
      {
        Effect   = "Allow"
        Action   = "ssm:GetCommandInvocation"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ecr:DescribeImages"
        Resource = aws_ecr_repository.backend.arn
      }
    ]
  })
}

output "github_publish_role_arn" { value = aws_iam_role.github_publish.arn }
output "github_deploy_role_arn" { value = aws_iam_role.github_deploy.arn }
output "backend_instance_id" { value = aws_instance.backend.id }
output "backend_deploy_document" { value = aws_ssm_document.backend_deploy.name }
output "backend_repository_url" { value = aws_ecr_repository.backend.repository_url }
