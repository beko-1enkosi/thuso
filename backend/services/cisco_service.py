"""Backend-only extension point. No Cisco API contract has been supplied.

This placeholder makes no network requests and provides no reputation verdict.
Replace the implementation only after reviewing the selected product's API docs.
"""
from dataclasses import dataclass
from typing import Literal, Protocol


@dataclass(frozen=True)
class CiscoCheckResult:
    status: Literal["not_configured"]
    message: str


class CiscoService(Protocol):
    def check_opportunity(self, *, text: str, url: str | None = None) -> CiscoCheckResult:
        """Return provider availability; never interpret unavailability as safety."""
        ...


class UnconfiguredCiscoService:
    def check_opportunity(self, *, text: str, url: str | None = None) -> CiscoCheckResult:
        return CiscoCheckResult(
            status="not_configured",
            message="Cisco service is not configured.",
        )


def get_cisco_service() -> CiscoService:
    return UnconfiguredCiscoService()

