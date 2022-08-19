import express from "express";
import { ObjectId } from "mongodb";
import { client, dbName, url } from "../database/db.js";

const router = express.Router();

//get customer result Patient
router.get('/', async(req, res) => {
    const filter = {};
    if (req.query._id) {
        filter._id = ObjectId(req.query._id);
    }
    const data = await client.db(dbName).collection('customer_resultPatient').find(filter).toArray();
    return res.status(200).json(data);
});

// Post
router.post('/', async(req, res) => {
    const data = req.body;

    const newResultPatient = await client.db(dbName).collection('customer_resultPatient').insertOne({
        user_id: data.user_id,
        codeFromService: data.codeFromService,
        description: data.description,
        conclusion: data.conclusion,
    });

    return res.status(200).json(newResultPatient);
});

// //get detail
router.get('/:id', async(req, res) => {
    const param = req.params;
    const data = await client.db(dbName).collection('customer_resultPatient').findOne({ _id: ObjectId(param.id) });
    return res.status(200).json(data);
});

// //update
router.post('/:id', async(req, res) => {
    const param = req.params;
    const data = req.body;
    const updateResultPatient = await client.db(dbName).collection('customer_resultPatient').updateOne({ _id: ObjectId(param.id) }, {
        $set: {
            user_id: data.user_id,
            codeFromService: data.codeFromService,
            description: data.description,
            conclusion: data.conclusion,
        }
    });

    return res.status(200).json(updateResultPatient)
});

// //delete
router.delete('/:id', async(req, res) => {
    const deleteResultPatient = await client.db(dbName).collection('customer_resultPatient').deleteOne({ _id: ObjectId(req.params.id) });
    return res.status(200).json(deleteResultPatient);
});

export default router;