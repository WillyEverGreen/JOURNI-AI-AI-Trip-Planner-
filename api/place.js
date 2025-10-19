// Vercel Serverless Function for Google Maps Place Search
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { text } = req.query;
  
  if (!text) {
    return res.status(400).json({ error: 'text parameter is required' });
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
    return res.status(500).json({ error: 'Failed to fetch place data' });
  }
}
