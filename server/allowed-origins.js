import "dotenv/config";
// Origins allowed to call the API / open sockets with credentials.
// Production: set ALLOWED_ORIGINS to a comma-separated list, e.g. "https://typefaster.example.com".
const DEV_ORIGINS = ['http://localhost:3000', 'http://localhost:5000'];

export const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : DEV_ORIGINS;
