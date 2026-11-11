resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "frisco-frontend"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "frontend-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  default_cache_behavior {
    target_origin_id       = "frontend-s3"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    cache_policy_id = data.aws_cloudfront_cache_policy.frontend.id
    compress        = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.frontend_router.arn
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_function" "frontend_router" {
  name    = "frisco-frontend-router"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = file("${path.module}/frontend-router.js")
}

data "aws_cloudfront_cache_policy" "frontend" {
  name = "Managed-CachingOptimized"
}