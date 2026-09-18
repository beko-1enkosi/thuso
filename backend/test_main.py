import unittest

from main import analyse_job, get_domain


class JobVerificationTests(unittest.TestCase):
    def test_demo_scam_is_high_risk(self):
        result = analyse_job(
            "Pay a R350 registration fee. WhatsApp only. Come alone and bring cash. "
            "Send your CV to jobs@gmail.com. Visit https://fake-careers.xyz immediately."
        )

        self.assertEqual(result["risk_level"], "high")
        self.assertGreaterEqual(result["risk_score"], 60)
        self.assertGreater(len(result["warnings"]), 0)
        self.assertGreater(len(result["recommendations"]), 0)

    def test_domain_without_scheme_is_parsed(self):
        self.assertEqual(get_domain("careers.example.com/jobs/123"), "careers.example.com")

    def test_shortened_link_adds_warning(self):
        result = analyse_job("Apply here", "bit.ly/example")

        self.assertEqual(result["risk_score"], 10)
        self.assertTrue(any("shortener" in warning for warning in result["warnings"]))

    def test_normal_job_message_stays_low_risk(self):
        result = analyse_job(
            "Software engineer role. Apply through our official careers portal.",
            "careers.example.com/jobs/123",
        )

        self.assertEqual(result["risk_level"], "low")


if __name__ == "__main__":
    unittest.main()
