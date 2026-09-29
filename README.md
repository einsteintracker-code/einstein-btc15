# Einstein BTC15

This repository includes a basic ChatGPT integration using the OpenAI API.

## Features
- Express server
- `/api/chat` endpoint for sending chat messages to OpenAI
- `/health` endpoint for server health checks
- `.env.example` for configuration

## Setup

1. Install dependencies:
   npm install

2. Copy the environment file:
   cp .env.example .env

3. Add your OpenAI API key to `.env`:
   OPENAI_API_KEY=your_api_key_here

4. Start the server:
   npm start

## Example request

POST /api/chat

```json
{
  "messages": [
    { "role": "user", "content": "Write a short summary of Einstein BTC15." }
  ],
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 300
}
```

## Example response

```json
{
  "reply": "Einstein BTC15 is a project focused on...",
  "model": "gpt-4o-mini",
  "usage": {
    "prompt_tokens": 17,
    "completion_tokens": 32,
    "total_tokens": 49
  }
}
```

## Notes
- Make sure your OpenAI account has access to the selected model.
- If you want to connect this to a frontend, send requests to `/api/chat` from your client.
