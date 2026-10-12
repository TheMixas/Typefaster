# ---------- 1. Build the React client ----------
FROM node:20-slim AS client
WORKDIR /client
COPY client/package.json client/package-lock.json client/.npmrc ./
RUN npm ci --no-audit --no-fund
COPY client/ .
ENV GENERATE_SOURCEMAP=false CI=false
RUN npm run build

# ---------- 2. Server: API + Socket.IO + the built client ----------
FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production PORT=5000
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY server/ .
COPY --from=client /client/build ./public
EXPOSE 5000
CMD ["node", "index.js"]
