import { collection } from "../../database/db.js"

export const getListReceptionsModel = async(filter) => {
    const listRepceptions = await collection.reception.find(filter).toArray();
    return listRepceptions;
}

export const createReceptionModel = async(data) => {
    const createReception = await collection.reception.insertOne(data);
    return createReception;
}

export const getReceptionModel = async(query) => {
    const getReception = await collection.reception.findOne(query);
    return getReception;
}

export const updateReceptionModel = async(query, data) => {
    const updateReception = await collection.reception.updateOne(query, data);
    return updateReception;
}

export const deleteReceptionModel = async(query) => {
    const deleteReception = await collection.reception.deleteOne(query);
    return deleteReception;
}