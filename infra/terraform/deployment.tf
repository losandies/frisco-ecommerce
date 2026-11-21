resource "aws_s3_bucket" "deployment" {
  bucket_prefix = "frisco-deployment-"

  tags = {
    Project : "frisco"
    Environment : "dev"
  }
}

resource "aws_s3_bucket_public_access_block" "deployment" {
  bucket = aws_s3_bucket.deployment.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

}