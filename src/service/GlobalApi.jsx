// Server-backed place/photo helper
// This calls the local server endpoints (server.js) which proxy Google Places
export async function getPlacePhotoByText(text) {
  if (!text) return null;
  try {
    // Use explicit backend base in dev to avoid proxy issues.
    // In production the API is expected to be same-origin, so base will be empty string.
    const devBase = import.meta.env.DEV
      ? import.meta.env.VITE_API_BASE || "http://localhost:3001"
      : "";
    const url = `${devBase}/api/place?text=${encodeURIComponent(text)}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    // Defensive: the dev server sometimes returns index.html (HTML) when the backend isn't reachable.
    const contentType = resp.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      const textBody = await resp.text();
      console.error(
        "getPlacePhotoByText error: received HTML instead of JSON from",
        url
      );
      // Log a short snippet to help debugging (avoid dumping entire HTML)
      console.error("HTML snippet:", textBody.slice(0, 200));
      return null;
    }
    const data = await resp.json();
    if (!data.photoUrl) return null;
    // Return proxied photo URL (the server will proxy the actual image)
    return data.photoUrl;
  } catch (e) {
    console.error("getPlacePhotoByText error", e);
    return null;
  }
}
