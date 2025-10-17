import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment: prefer .env.local for local development, otherwise fall back to default .env
const localEnv = ".env.local";
import fs from "fs";
if (fs.existsSync(localEnv)) {
  dotenv.config({ path: localEnv });
} else {
  dotenv.config();
}

const app = express();
app.use(cors());

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) console.warn("GOOGLE_MAPS_API_KEY not set in environment");

// Prefer the global fetch available in Node 18+. If not present, we'll error at runtime
const globalFetch = globalThis.fetch;
if (!globalFetch) {
  console.warn(
    "Global fetch is not available in this Node runtime. Please use Node 18+ or install a compatible fetch polyfill (e.g., node-fetch)"
  );
}

// Search for a place and return a proxied photo URL (or null)
app.get("/api/place", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).json({ error: "text is required" });
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      text
    )}&key=${API_KEY}`;
    const r = await (globalFetch
      ? globalFetch(url)
      : (await import("node-fetch")).default(url));
    const data = await r.json();
    if (!data.results || data.results.length === 0)
      return res.json({ photoUrl: null });
    const place = data.results[0];
    if (place.photos && place.photos.length > 0) {
      const ref = place.photos[0].photo_reference;
      // Provide a proxied endpoint so client doesn't see the API key
      return res.json({
        photoUrl: `/api/photo?ref=${encodeURIComponent(ref)}`,
      });
    }
    return res.json({ photoUrl: null });
  } catch (e) {
    console.error("Error in /api/place", e);
    res.status(500).json({ error: "server error" });
  }
});

// Proxy the actual photo request and stream it back to the client
app.get("/api/photo", async (req, res) => {
  const ref = req.query.ref;
  if (!ref) return res.status(400).send("ref required");
  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(
      ref
    )}&key=${API_KEY}`;
    const r = await (globalFetch
      ? globalFetch(url)
      : (await import("node-fetch")).default(url));
    if (!r.ok) return res.status(r.status).send("failed to fetch photo");
    const contentType = r.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    const buffer = await r.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (e) {
    console.error("Error in /api/photo", e);
    res.status(500).send("server error");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Places proxy server listening on ${port}`));
