// Einstein Tennis — Live Tennis API
// API key stays in the TENNIS_API_KEY environment variable.
// Never put the actual key in this file.

const TENNIS_API_KEY = process.env.TENNIS_API_KEY;

const BASE_URL =
  "https://api.livetennisapi.com/api/public/v1";

async function tennisRequest(endpoint) {
  if (!TENNIS_API_KEY) {
    throw new Error(
      "TENNIS_API_KEY is not configured"
    );
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${TENNIS_API_KEY}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `Live Tennis API error ${response.status}: ${body}`
    );
  }

  return response.json();
}

async function getLiveMatches() {
  return tennisRequest("/matches?status=live");
}

async function getUpcomingMatches() {
  return tennisRequest("/matches?status=upcoming");
}

async function getMatchScore(matchId) {
  return tennisRequest(
    `/matches/${matchId}/score`
  );
}

module.exports = {
  tennisRequest,
  getLiveMatches,
  getUpcomingMatches,
  getMatchScore,
};
