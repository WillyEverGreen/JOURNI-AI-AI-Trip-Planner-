// Vercel serverless function for Google Maps photo proxy
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

  const { ref } = req.query;
  
  if (!ref) {
    return res.status(400).send('ref required');
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    console.error('GOOGLE_MAPS_API_KEY not set in environment');
    return res.status(500).send('Server configuration error');
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(
      ref
    )}&key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch photo');
    }
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error in /api/photo:', error);
    return res.status(500).send('Server error');
  }
}
