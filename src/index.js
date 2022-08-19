import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import cryptoRandomString from 'crypto-random-string';
import uniqueRandom from "./app/rand.js";
import urid from "urid";
import crypto from "crypto";
import ReceptionRouter from "./routes/repception.js";

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
}

main()

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let selectnum = []

let i = 0;
const numrequired = 8;
for (let i = 0; i < numrequired; i++) {
    const element = Math.floor(Math.random() * num.length);
    selectnum.push(num[element]);

}
// while (i < numrequired) {
//     const pos = crypto.randomBytes(4).readInt32BE() % num.length;
//     if (selectnum.includes(num[pos])) {
//         continue;
//     }
//     i++;
//     selectnum.push(num[pos]);
// }




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/recep', ReceptionRouter);


app.listen(PORT, () => {
    console.log('Server runing on port: ' + PORT);
})

