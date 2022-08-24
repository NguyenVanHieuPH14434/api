import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import cryptoRandomString from 'crypto-random-string';
import uniqueRandom from "./app/rand.js";
import urid from "urid";
import crypto from "crypto";
import ReceptionRouter from "./routes/repception.js";
import XrayRouter from "./routes/customer_result.js";
import { client } from "./database/db.js";
import dayjs from "dayjs";
const PORT = 4000;

const app = express();

const main = async() => {
    try {
        client.connect(() => {
            console.log('Connect DB');
        })
    } catch (error) {
        console.log(error);
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());


    // app.get('/', (req, res) => {
    //         const today = dayjs();
    //         const randomUser_id = today.format("YYMMDDhmmss");
    //         res.send(randomUser_id);
    //     })
    app.use('/api/recep', ReceptionRouter);
    app.use('/api/xray', XrayRouter);


    app.listen(PORT, () => {
        console.log('Server runing on port: ' + PORT);
    })
}

main()