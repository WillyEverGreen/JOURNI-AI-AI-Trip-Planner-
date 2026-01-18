import fetch from 'node-fetch';

// Vercel Serverless Function for /api/place
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    // Scrape Bing Images logic (same as server.js)
    const cleanText = text.replace(/map|direction|location/gi, "").trim();
    const query = `${cleanText} tourist attraction scenery`;
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1`;
    
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const r = await fetch(url, options);

    if (!r.ok) {
       console.error("Scrape error:", r.status, await r.text());
       return res.json({ photoUrl: null });
    }

    const html = await r.text();
    
    const match = html.match(/murl&quot;:&quot;(http[^&]+)&quot;/);
    if (match && match[1]) {
      return res.json({ photoUrl: match[1] });
    }
    
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
}
