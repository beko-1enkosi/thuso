# Cisco integration readiness

Repository inspection found no Cisco API documentation, product selection, endpoints, credentials, configuration or hackathon resources. No Cisco-named process environment variables were present. No external Cisco calls have been implemented.

## Prepared extension point

`services/cisco_service.py` defines a backend-only service protocol, typed availability result and unconfigured implementation. It returns `not_configured` with the developer-facing message "Cisco service is not configured." It makes no network requests and does not invent reputation data or treat unavailability as a low-risk verdict.

The existing `POST /api/verify` route and scoring logic remain unchanged and do not depend on Cisco. The placeholder is intentionally not invoked by the UI or verifier until the API's purpose and response contract are known.

## Information needed

- Exact Cisco product/API and the feature it should power in Thuso.
- Official API documentation and version, supported operation, base URL, regional/tenant requirements and endpoint.
- Authentication method (API key, OAuth, etc.), required scopes and credential provisioning instructions.
- Request/response schemas, reputation semantics, rate limits, timeout guidance and test/sandbox access.
- Valid credentials supplied privately through backend configuration, never source control or frontend variables.

Credential requirements cannot be confirmed until the product and authentication documentation are supplied. No environment variable names were invented, so no .env.example entries were added. Once documented, add only the actual required names with empty values to backend/.env.example; keep real values in an ignored backend .env and configure backend loading explicitly. Existing gitignore rules already exclude .env files.

## Implementation path once details are available

React -> Thuso FastAPI endpoint -> Cisco service. Any secret stays on the server; never use VITE_ variables for Cisco secrets. Validate and minimise submitted data, use documented destinations, enforce timeouts and handle authentication, rate-limit and availability failures without changing the existing verification result into a false safety guarantee. Test those failure modes before enabling calls.

## Verification

From backend: `..\\.venv\\Scripts\\python.exe -m unittest discover -v`.

