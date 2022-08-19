import { MongoClient } from "mongodb";
export const url = 'mongodb+srv://bv_dev:bv123456@bv.jmrzod0.mongodb.net/?retryWrites=true&w=majority';
export const client = new MongoClient(url);
export const dbName = 'bv';