
resource "aws_instance" "backend" {
  ami                         = "ami-0cc337c0f1a9da5ed"
  instance_type               = "t4g.micro"
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.backend.id]
  iam_instance_profile        = aws_iam_instance_profile.backend.name
  associate_public_ip_address = true

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 8
    encrypted             = true
    delete_on_termination = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  credit_specification {
    cpu_credits = "standard"
  }

  tags = {
    Name    = "frisco-backend"
    Project = "frisco"
  }
}