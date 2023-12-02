// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

let threads = [];

app.use(express.json());

app.post('/api/threads', (req, res) => {
    const newThread = {
        id: generateUniqueId(),
        title: req.body.title,
        date: new Date(),
        comments: [],
    };

    threads.push(newThread);
    io.emit('newThread', newThread);
    res.json(newThread);
});

app.post('/api/comments/:threadId', (req, res) => {
    const { threadId } = req.params;
    const thread = threads.find((t) => t.id === threadId);

    if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
    }

    const newComment = {
        id: generateUniqueId(),
        content: req.body.content,
        date: new Date(),
        author: 'John', // Replace with actual user information
    };

    thread.comments.unshift(newComment);
    io.emit('newComment', { threadId, comment: newComment });
    res.json(newComment);
});

io.on('connection', (socket) => {
    console.log('User connected');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
