import { collection } from "../../database/db.js";

//get list result 
export const getListResultModel = async(filter) => {
        const listResult = await collection.xray.find(filter).toArray();
        return listResult;
    }
    //create result 
export const createResultModel = async(data) => {
        const createResult = await collection.xray.insertOne(data);
        return createResult;
    }
    //get one result 
export const getResultModel = async(query) => {
        const Result = await collection.xray.findOne(query);
        const data = await collection.reception
        return Result;
    }
    //update result 
export const updateResultModel = async(query, data) => {
        const updateResult = await collection.xray.updateOne(query, data);
        return updateResult;
    }
    //delete result 
export const deleteResultModel = async(query) => {
    const deleteResult = await collection.xray.deleteOne(query);
    return deleteResult;
}