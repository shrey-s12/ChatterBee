const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/connection');

const path = require('path');

const { app, server } = require('./lib/socket');

const AuthRoutes = require('./routes/authRouter');
const MessageRoutes = require('./routes/messageRouter');
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend-chatterbee/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend-chatterbee", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});