// Vercel serverless function for Google Maps place search
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.query;
  
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    console.error('GOOGLE_MAPS_API_KEY not set in environment');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      text
    )}&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return res.json({ photoUrl: null });
    }
    
    const place = data.results[0];
    
    if (place.photos && place.photos.length > 0) {
      const ref = place.photos[0].photo_reference;
      // Provide a proxied endpoint so client doesn't see the API key
      return res.json({
        photoUrl: `/api/photo?ref=${encodeURIComponent(ref)}`,
      });
    }
    
    return res.json({ photoUrl: null });
  } catch (error) {
    console.error('Error in /api/place:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
