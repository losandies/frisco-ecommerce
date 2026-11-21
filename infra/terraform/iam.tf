resource "aws_iam_role" "backend" {
  name_prefix = "frisco-backend-"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Project = "frisco"
  }
}

resource "aws_iam_role_policy_attachment" "backend_ssm" {
  role       = aws_iam_role.backend.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "backend" {
  name_prefix = "frisco-backend-"
  role        = aws_iam_role.backend.name
}

resource "aws_iam_role_policy" "backend_deployment" {
  name = "frisco-deployment-read"
  role = aws_iam_role.backend.id

  policy = jsonencode({
    Version : "2012-10-17",
    Statement = [{
      Effect : "Allow",
      Action   = "s3:GetObject",
      Resource = "${aws_s3_bucket.deployment.arn}/backend/frisco.jar"
    }]
  })
}

resource "aws_iam_role_policy" "backend_registry" {
  name = "frisco-registry-read"
  role = aws_iam_role.backend.id


  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "ecr:GetAuthorizationToken"
      Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer"
        ]
        Resource = aws_ecr_repository.backend.arn
    }]
  })
}