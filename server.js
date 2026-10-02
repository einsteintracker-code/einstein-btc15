require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
  const {
  getLiveMatches,
  getUpcomingMatches,
  getMatchScore,
} = require('./tennis');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, temperature, max_tokens } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY is not configured.',
      });
    }

    const requestMessages = Array.isArray(messages) && messages.length > 0
      ? messages
      : [{ role: 'user', content: 'Hello! Please respond briefly.' }];

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4o-mini',
      messages: requestMessages,
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      max_tokens: typeof max_tokens === 'number' ? max_tokens : 500,
    });

    const reply = completion.choices?.[0]?.message?.content || 'No response returned.';

    res.json({
      reply,
      model: completion.model,
      usage: completion.usage || null,
    });
  } catch (error) {
    console.error('ChatGPT request failed:', error);

    const message = error?.response?.data?.error?.message || error.message || 'Failed to process request.';

    res.status(500).json({
      error: message,
    });
  }
});
// Einstein Tennis API routes

app.get('/api/tennis/live', async (req, res) => {
  try {
    const data = await getLiveMatches();
    res.json(data);
  } catch (error) {
    console.error('Live tennis request failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tennis/upcoming', async (req, res) => {
  try {
    const data = await getUpcomingMatches();
    res.json(data);
  } catch (error) {
    console.error('Upcoming tennis request failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tennis/match/:matchId', async (req, res) => {
  try {
    const data = await getMatchScore(req.params.matchId);
    res.json(data);
  } catch (error) {
    console.error('Tennis match request failed:', error);
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
