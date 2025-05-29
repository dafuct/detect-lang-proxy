// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const DETECT_API_KEY = process.env.DETECT_API_KEY;

app.post('/api/detect', async (req, res) => {
  const { q } = req.body;

  if (!q) {
    return res.status(400).json({ error: 'Missing "q" text to detect' });
  }

  try {
    const detectRes = await fetch('https://ws.detectlanguage.com/0.2/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DETECT_API_KEY}`
      },
      body: JSON.stringify({ q })
    });

    const data = await detectRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to detect language', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});
