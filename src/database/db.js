import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export const collection = {};

// export const url = 'mongodb+srv://bv_dev:bv123456@bv.jmrzod0.mongodb.net/?retryWrites=true&w=majority';
export const client = new MongoClient(process.env.DB_URL);
// export const dbName = 'bv';
export const dbName = process.env.DB_NAME;

collection.xray = client.db(dbName).collection('customer_resultPatient');
collection.reception = client.db(dbName).collection('patient');