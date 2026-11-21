resource "aws_db_subnet_group" "main" {
  name_prefix = "frisco-"
  subnet_ids = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id,
  ]

  tags = {
    Name    = "frisco-database"
    Project = "frisco"
  }
}