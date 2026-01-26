import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS configuration
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.VITE_QUBRID_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "VITE_QUBRID_API_KEY not set in environment" });
  }

  try {
    const url = "https://platform.qubrid.com/api/v1/qubridai/chat/completions";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const errText = await response.text();
        console.error("Qubrid API Error (Production):", response.status, errText);
        return res.status(response.status).json({ error: errText });
    }

    // Since this is a serverless function, we aggregate the stream
    // and return the final JSON. 
    // Note: node-fetch (v2/v3) on Vercel sometimes yields different body types.
    // For standard streaming in Vercel Node.js, we can read chunks.
    
    let fullText = "";
    
    // Check if the response body is streamable
    if (response.body && typeof response.body.on === 'function') {
        // Node-style stream
        await new Promise((resolve, reject) => {
            let buffer = "";
            response.body.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split(/\r?\n/);
                buffer = lines.pop() || "";
                
                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith("data:")) {
                        const jsonStr = trimmedLine.replace("data:", "").trim();
                        if (jsonStr === "[DONE]") continue;
                        try {
                            const parsed = JSON.parse(jsonStr);
                            const content = 
                                parsed.choices?.[0]?.delta?.content || 
                                parsed.choices?.[0]?.message?.content || 
                                parsed.content || "";
                            if (content) fullText += content;
                        } catch (e) {}
                    }
                }
            });
            response.body.on('end', () => {
                // Final buffer check not needed for SSE [DONE] usually
                resolve();
            });
            response.body.on('error', reject);
        });
    } else {
        // Fallback for non-streaming response
        const data = await response.json();
        fullText = data.choices?.[0]?.message?.content || data.content || "";
    }

    return res.json({ content: fullText });

  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Backend proxy error" });
  }
}
