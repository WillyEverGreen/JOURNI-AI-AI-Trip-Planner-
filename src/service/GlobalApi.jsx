// Server-backed place/photo helper
// This calls the local server endpoints (server.js) which proxy Google Places
export async function getPlacePhotoByText(text) {
  if (!text) return null;
  try {
    // Prefer relative base in dev to leverage Vite proxy (see vite.config.js)
    // If VITE_API_BASE is set, it will override and allow custom backends.
    // In production, API is expected to be same-origin.
    const devBase = import.meta.env.DEV
      ? import.meta.env.VITE_API_BASE ?? ""
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
      // Fallback: use public Places client photo flow (no server key exposure) if available
      const clientKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!clientKey) return null;
      try {
        const tsUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          text
        )}&key=${clientKey}`;
        const tsResp = await fetch(tsUrl);
        const tsData = await tsResp.json();
        if (!tsData?.results?.length) return null;
        const place = tsData.results[0];
        const ref = place?.photos?.[0]?.photo_reference;
        if (!ref) return null;
        // Client-side photo URL (this reveals a client key which is fine for public browser usage)
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(
          ref
        )}&key=${clientKey}`;
      } catch (fallbackErr) {
        console.error("Client-side Places fallback failed", fallbackErr);
        return null;
      }
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
