// Where the API and Socket.IO server live.
// In production the server also serves this app, so the page's own origin is right.
// For local development (npm start on :3000) set REACT_APP_SERVER_URL in .env.development.
export const SERVER_URL = process.env.REACT_APP_SERVER_URL || window.location.origin;
