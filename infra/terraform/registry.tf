resource "aws_ecr_repository" "backend" {
  name = "frisco-backend"

  image_tag_mutability = "IMMUTABLE"

  tags = {
    Project     = "frisco"
    Environment = "dev"
  }
}