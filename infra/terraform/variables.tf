variable "db_password" {
  description = "Master password for frisco db"
  type        = string
  sensitive   = true
}

resource "aws_db_instance" "main" {
  identifier               = "frisco-dev"
  engine                   = "postgres"
  engine_version           = "17"
  instance_class           = "db.t4g.micro"
  allocated_storage        = 20
  storage_type             = "gp3"
  storage_encrypted        = true
  db_name                  = "frisco"
  username                 = "frisco_admin"
  password                 = var.db_password
  db_subnet_group_name     = aws_db_subnet_group.main.name
  vpc_security_group_ids   = [aws_security_group.database.id]
  publicly_accessible      = false
  multi_az                 = false
  backup_retention_period  = 7
  deletion_protection      = true
  engine_lifecycle_support = "open-source-rds-extended-support-disabled"
}