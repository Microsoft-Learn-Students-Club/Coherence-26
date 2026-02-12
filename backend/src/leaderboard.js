const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN } // Frontend URL
});

// Initial Dummy Data (Teams JSON)
let teams = [
    { id: 1, name: "Team Alpha", points: 100 },
    { id: 2, name: "Team Beta", points: 85 },
    { id: 3, name: "Team Gamma", points: 120 },
    { id: 4, name: "Team Delta", points: 50 }
];

io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    // Initial load pe current data bhejdo
    socket.emit('update_leaderboard', teams);

    // Admin jab points update karega
    socket.on('add_points', (data) => {
    const { teamId, pointsToAdd } = data;
    
    // String ko number mein convert karna zaroori hai
    const points = parseInt(pointsToAdd);

    teams = teams.map(team => 
        team.id === teamId ? { ...team, points: team.points + points } : team
    );

    // Sabko update bhej do
    io.emit('update_leaderboard', teams);
});
    socket.on('disconnect', () => console.log('User Disconnected'));

});

server.listen(5000, () => console.log("Server running on port 5000"));