// Server-backed place/photo helper
// This calls the local server endpoints (server.js) which proxy Google Places
export async function getPlacePhotoByText(text) {
  if (!text) return null;
  try {
    const url = `/api/place?text=${encodeURIComponent(text)}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data.photoUrl) return null;
    return data.photoUrl;
  } catch (e) {
    console.error("getPlacePhotoByText error", e);
    return null;
  }
}
