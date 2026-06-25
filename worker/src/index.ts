/**
 * Cloudflare Worker CORS Proxy
 */

export interface Env {
  // Add env vars here if needed in the future
}

// Allowed request headers (you can tighten this down later if desired)
const allowedHeaders = "*";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // 1. Handle CORS Preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          "Access-Control-Allow-Headers": allowedHeaders,
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 2. Determine target URL
    const url = new URL(request.url);
    let targetUrlStr = request.headers.get("x-target-url");

    if (!targetUrlStr) {
      targetUrlStr = url.searchParams.get("url");
    }

    if (!targetUrlStr) {
      return new Response("Missing target URL. Provide it via 'x-target-url' header or 'url' query parameter.", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(targetUrlStr);
    } catch (e) {
      return new Response(`Invalid target URL: ${targetUrlStr}`, {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // 3. Clone the request and modify headers as needed
    const proxyRequest = new Request(targetUrl, request);

    // Remove headers that might cause issues with the target server
    proxyRequest.headers.delete("x-target-url");
    // Depending on what you're proxying, you might also want to delete 'host', 'origin', 'referer'
    // Let's strip 'Origin' and 'Referer' to look more like a standard backend request if needed,
    // though leaving them is often okay.
    // proxyRequest.headers.delete("Origin");
    // proxyRequest.headers.delete("Referer");

    try {
      // 4. Fetch the target
      const response = await fetch(proxyRequest);

      // 5. Clone response and append CORS headers
      const proxyResponse = new Response(response.body, response);
      proxyResponse.headers.set("Access-Control-Allow-Origin", "*");
      proxyResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
      // Optional: expose headers so client can read them
      // proxyResponse.headers.set("Access-Control-Expose-Headers", "*");

      return proxyResponse;
    } catch (error: any) {
      return new Response(`Proxy error: ${error.message}`, {
        status: 502,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }
  },
};
