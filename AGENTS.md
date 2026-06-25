# Project Core Rules
1. **Strict $0 Budget:** Absolutely no paid APIs, no server costs, and no heavy backend compute.
2. **Tech Stack:** Next.js for the frontend dashboard; Cloudflare Workers for the edge proxy.
3. **Security:** Implement BYOK (Bring Your Own Key) architecture. Never hardcode API keys. 
4. **Data Pipeline:** All heavy data scraping and extraction loops must be processed client-side via the browser to avoid server costs.
