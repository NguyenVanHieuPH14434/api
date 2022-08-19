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

const url = 'mongodb+srv://bv_dev:bv123456@bv.jmrzod0.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'bv';
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

    app.use('/api/recep', ReceptionRouter);
    app.use('/api/xray', XrayRouter);


    app.listen(PORT, () => {
        console.log('Server runing on port: ' + PORT);
    })
}

main()