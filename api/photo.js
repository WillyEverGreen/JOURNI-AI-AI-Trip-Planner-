// Vercel Serverless Function for Google Maps Photo Proxy
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { ref } = req.query;

  if (!ref) {
    return res.status(400).send("ref parameter is required");
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(
      ref
    )}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch photo");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return res.send(buffer);
  } catch (error) {
    console.error("Error in /api/photo:", error);
    return res.status(500).send("Failed to fetch photo");
  }
}
