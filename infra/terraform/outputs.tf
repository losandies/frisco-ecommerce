output "frontend_url" {
  description = "Public HTTPS address for the frontend"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "frontend_bucket_name" {
  description = "S3 bucket containing frontend files"
  value       = aws_s3_bucket.frontend.id
}