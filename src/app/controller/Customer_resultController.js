import { ObjectId } from "mongodb";
import { createResultModel, deleteResultModel, getListResultModel, getResultModel, updateResultModel } from "../model/customer_result.js";

//get list customer result 
export const getListResult = async(req, res, next) => {
    const filter = {};

    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }

    const listResult = await getListResultModel(filter);

    return res.status(200).json(listResult);
}

//post result
export const createResult = async(req, res, next) => {
    const data = req.body;

    const dataCreateResult = {
        user_id: data.user_id,
        user_name: data.user_name,
        codeFromService: data.codeFromService,
        description: data.description,
        conclusion: data.conclusion,
    }

    const dataCreate = await createResultModel(dataCreateResult);

    return res.status(200).json(dataCreate);
}

//get one result 
export const getResult = async(req, res, next) => {
    const param = req.params;

    const query = { _id: ObjectId(param.id) };

    const result = await getResultModel(query);

    return res.status(200).json(result);
}

//update result
export const updateResult = async(req, res, next) => {
    const data = req.body;

    const param = req.params;

    const query = { _id: ObjectId(param.id) };

    const dataUpdateResult = {
        $set: {
            user_id: data.user_id,
            user_name: data.user_name,
            codeFromService: data.codeFromService,
            description: data.description,
            conclusion: data.conclusion,
        }
    }

    const dataUpdate = await updateResultModel(query, dataUpdateResult);

    return res.status(200).json(dataUpdate);
}

//delete result 
export const deleteResult = async(req, res, next) => {
    const param = req.params;

    const query = { _id: ObjectId(param.id) };

    const dataDelete = await deleteResultModel(query);

    return res.status(200).json(dataDelete);
}