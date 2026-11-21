resource "aws_security_group" "backend" {
  name_prefix = "frisco-backend-"
  description = "Network access for the springboot server"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name    = "frisco-backend"
    Project = "frisco"
  }
}

resource "aws_security_group" "database" {
  name_prefix = "frisco-database-"
  description = "Postgresql access from the backend"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name    = "frisco-database"
    Project = "frisco"
  }
}

resource "aws_vpc_security_group_ingress_rule" "database_from_backend" {
  security_group_id            = aws_security_group.database.id
  referenced_security_group_id = aws_security_group.backend.id

  ip_protocol = "tcp"
  from_port   = 5432
  to_port     = 5432
}

resource "aws_vpc_security_group_egress_rule" "backend_to_database" {
  security_group_id            = aws_security_group.backend.id
  referenced_security_group_id = aws_security_group.database.id

  ip_protocol = "tcp"
  from_port   = 5432
  to_port     = 5432
}

resource "aws_vpc_security_group_egress_rule" "backend_https" {
  security_group_id = aws_security_group.backend.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "tcp"
  from_port   = 443
  to_port     = 443
}

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}

resource "aws_vpc_security_group_ingress_rule" "backend_from_cloudfront" {
  security_group_id = aws_security_group.backend.id
  prefix_list_id    = data.aws_ec2_managed_prefix_list.cloudfront.id

  ip_protocol = "tcp"
  from_port   = 443
  to_port     = 443
}