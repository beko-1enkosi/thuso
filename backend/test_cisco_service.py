import unittest
from unittest.mock import patch

from main import JobCheckRequest, verify_job
from services.cisco_service import get_cisco_service


class CiscoFallbackTests(unittest.TestCase):
    def test_unconfigured_service_is_explicit_and_does_not_connect(self):
        with patch("socket.socket", side_effect=AssertionError("No network expected")):
            result = get_cisco_service().check_opportunity(
                text="Private application content", url="https://example.com"
            )
        self.assertEqual(result.status, "not_configured")
        self.assertEqual(result.message, "Cisco service is not configured.")
        self.assertNotIn("Private application content", result.message)

    def test_verification_still_works_without_cisco(self):
        with patch.dict("os.environ", {}, clear=True):
            result = verify_job(JobCheckRequest(text="Pay a registration fee. Come alone. Bring cash."))
        self.assertEqual(result["risk_level"], "high")
        self.assertGreater(len(result["warnings"]), 0)
        self.assertNotIn("cisco", result)


if __name__ == "__main__":
    unittest.main()

