"""Exercise deployment control flow with fake CLI tools, never AWS or Docker.

The temporary script copy substitutes host paths and the root guard so tests can
run unprivileged. The production script and actual EC2 configuration are untouched.
"""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


STUB = r'''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
root = Path(os.environ["CHECK_ROOT"])
scenario = os.environ["CHECK_SCENARIO"]
name = Path(sys.argv[0]).name
args = sys.argv[1:]
if name == "aws":
    if scenario == "auth-failure": sys.exit(1)
    print("synthetic-credential")
elif name == "docker":
    if args[0] == "login":
        sys.stdin.read()
    elif args[0] == "inspect":
        print("775893835482.dkr.ecr.us-east-1.amazonaws.com/frisco-backend:v1")
    elif "config" in args and "--format" in args:
        mode = "require" if scenario == "weak-tls" else "verify-full"
        url = "jdbc:postgresql://db/frisco?sslmode=" + mode + "&sslrootcert=/etc/frisco/certs/rds-ca-bundle.pem"
        print(json.dumps({"services": {"backend": {"environment": {"DB_URL": url}}}}))
    elif "ps" in args:
        if scenario != "no-container": print("test-container")
    elif "pull" in args:
        if scenario == "pull-failure": sys.exit(1)
    elif "up" in args:
        tag = os.environ["IMAGE_TAG"]
        with (root / "updates").open("a") as log: log.write(tag + "\n")
        if scenario == "start-failure" and tag == "v2": sys.exit(1)
        (root / "active").write_text(tag)
elif name == "curl":
    active = (root / "active").read_text()
    if scenario == "both-unhealthy" or (scenario == "rollback" and active == "v2"):
        print("503", end="")
    elif scenario == "redirect" and active == "v2":
        print("302", end="")
    else:
        print("200", end="")
'''


class DeploymentTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="frisco-deploy-test-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source_path = Path(__file__).resolve().parents[1] / "deploy.sh"
        source = self.source_path.read_text()
        (self.root / "compose.yaml").write_text("services: {}\n")
        (self.root / "ca.pem").write_text("test certificate placeholder\n")
        source = source.replace('if [[ "$EUID" -ne 0 ]]; then', 'if false; then')
        source = source.replace(
            'readonly COMPOSE_FILE="/opt/frisco/compose.yaml"',
            f'readonly COMPOSE_FILE="{self.root / "compose.yaml"}"'
        ).replace(
            'readonly RDS_CA_FILE="/etc/frisco/certs/rds-ca-bundle.pem"',
            f'readonly RDS_CA_FILE="{self.root / "ca.pem"}"'
        )
        self.script = self.root / "deploy.sh"
        self.script.write_text(source)
        for name in ("aws", "docker", "curl", "sleep"):
            command = self.root / name
            command.write_text(STUB)
            command.chmod(0o755)

    def run_case(self, scenario, code, updates):
        (self.root / "active").write_text("v1")
        (self.root / "updates").write_text("")
        env = dict(os.environ, PATH=str(self.root) + os.pathsep + os.environ["PATH"],
                   CHECK_ROOT=str(self.root), CHECK_SCENARIO=scenario)
        result = subprocess.run(["bash", str(self.script), "v2"], env=env,
                                capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, code, result.stdout + result.stderr)
        self.assertEqual((self.root / "updates").read_text().splitlines(), updates)
        return result

    def test_success(self):
        self.run_case("success", 0, ["v2"])

    def test_unhealthy_image_restores_previous_version(self):
        result = self.run_case("rollback", 1, ["v2", "v1"])
        self.assertIn("Previous version restored successfully", result.stderr)

    def test_failed_container_start_restores_previous_version(self):
        self.run_case("start-failure", 1, ["v2", "v1"])

    def test_redirect_does_not_count_as_ready(self):
        self.run_case("redirect", 1, ["v2", "v1"])

    def test_failed_rollback_is_reported(self):
        result = self.run_case("both-unhealthy", 1, ["v2", "v1"])
        self.assertIn("Rollback failed", result.stderr)

    def test_auth_failure_leaves_existing_container(self):
        self.run_case("auth-failure", 1, [])

    def test_pull_failure_leaves_existing_container(self):
        self.run_case("pull-failure", 1, [])

    def test_missing_container_stops_deployment(self):
        self.run_case("no-container", 1, [])

    def test_unverified_database_tls_stops_deployment(self):
        self.run_case("weak-tls", 1, [])

    def test_missing_ca_stops_deployment(self):
        (self.root / "ca.pem").unlink()
        self.run_case("success", 1, [])

    def test_version_argument_is_required(self):
        result = subprocess.run(["bash", str(self.source_path)], capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Usage:", result.stderr)


if __name__ == "__main__":
    unittest.main()
