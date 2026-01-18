/* eslint-env node */
/* global process */
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

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
if (!GOOGLE_API_KEY) console.warn("GOOGLE_MAPS_API_KEY not set in environment");

// Prefer global fetch
const globalFetch = globalThis.fetch;

// Scrape Google Images as requested by user (fallback for API key issues)
app.get("/api/place", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).json({ error: "text is required" });

  try {
    // Scrape Bing Images for better quality (high-res retrieval is easier than Google)
    // "murl" in Bing HTML usually points to the original image
    const cleanText = text.replace(/map|direction|location/gi, "").trim();
    const query = `${cleanText} tourist attraction scenery`;
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1`;
    
    // Mimic a browser to avoid blocking
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const r = await (globalFetch
      ? globalFetch(url, options)
      : (await import("node-fetch")).default(url, options));

    // Bing returns 200 even if blocked, but we check anyway
    if (!r.ok) {
       console.error("Scrape error:", r.status, await r.text());
       return res.json({ photoUrl: null });
    }

    const html = await r.text();
    
    // Look for Bing's "murl" (Media URL) which links to the original image
    // It is often HTML-encoded inside the page source
    const match = html.match(/murl&quot;:&quot;(http[^&]+)&quot;/);
    
    if (match && match[1]) {
      return res.json({ photoUrl: match[1] });
    }
    
    // Fallback: Try simpler pattern or unencoded pattern
    const match2 = html.match(/"murl":"(http[^"]+)"/);
    if (match2 && match2[1]) {
         return res.json({ photoUrl: match2[1] });
    }
    
    console.warn("No image found in scrape for:", text);
    return res.json({ photoUrl: null });

  } catch (e) {
    console.error("Error in /api/place", e);
    res.status(500).json({ error: "server error" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Places proxy server listening on ${port}`));
