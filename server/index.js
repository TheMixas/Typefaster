import {    app} from './app.js';
import {createNewRoom, findPublicLobbyWithMostPlayers} from "./gameManager.js";
import cors from 'cors';
import http from "http";
import initializeSocketEvents from './socket.js';
import {Server} from "socket.io";
import {allowedOrigins} from "./allowed-origins.js";
import {migrate} from "./db/migrate.js";
let corsOptions = {
    origin: allowedOrigins,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true
}


const server = http.createServer(app);

// Initialize Socket.IO server
export const io = new Server(server, {
    cors: corsOptions
});
let port = process.env.PORT || 5000;

// Make sure the tables exist (and the DB is reachable) before accepting traffic.
await migrate();
server.listen(port, () => console.log(`Server is running on port ${port}`));
initializeSocketEvents();




