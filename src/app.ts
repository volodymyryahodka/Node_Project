import mongoose from "mongoose";
// @ts-ignore
import { socketController } from "./controller/socket.Controller";

// @ts-ignore
global.roorDir = __dirname;

import 'reflect-metadata';
import http from 'http';
import express from 'express';
import fileUpload from "express-fileupload";
import { createConnection } from "typeorm";
import SocketID from 'socket.io';


import { apiRouter  } from "./router/apiRouter";
import { config } from './config/config';
// @ts-ignore
import { cronRun } from "./cron";

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketID(server, {cors: {origin: '*'}});

// @ts-ignore
io.on('connection', (socket: any) => {
    console.log('___________')
    console.log('socket.handshake.query.userId');
    console.log('socket.handshake.query.accessToken');
    console.log('___________')

});

// --------------------------------------------------------------------------------------------------

// ONE TO ONE
// socket.emit(event, {});

// SEND TO ALL ONLINE USERS (INCLUDE SENDER)
// io.emit(event, {})

// SEND TO ALL ONLINE USERS (AVOID SENDER)
// socket.broadcast.emit(event, {})

// socket.join(room_id)

// TO ROOM AVOID SENDER
// socket.broadcast.to(room_id).emit(event, {})

// TO ROOM INCLUDE SENDER
// io.to(room_id).emit(event, {})

// --------------------------------------------------------------------------------------------------



app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/sep2021');

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data
        })
})


const {PORT}= config;

server.listen(PORT, async () => {
    console.log(`Server has started🚀🚀🚀 on Port:${PORT}`)

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            // cronRun();

        }
    } catch (err) {
        if (err) console.log(err);
    }
})























