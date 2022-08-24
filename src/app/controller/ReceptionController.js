import { createReceptionModel, deleteReceptionModel, getListReceptionsModel, getReceptionModel, updateReceptionModel } from "../model/reception.js";
import urid from "urid";
import { ObjectId } from "mongodb";

//get list reception
export const getListReceptions = async(req, res, next) => {
    const filter = {};

    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }

    const listReceptions = await getListReceptionsModel(filter)

    return res.status(200).json(listReceptions);
}

//create reception
export const createReception = async(req, res, next) => {
    const data = req.body;

    // const number = '123456789';

    // data.user_id = urid(12, number);

    const dataReception = {
        user_id: data.user_id,
        user_name: data.user_name,
        user_birthday: data.user_birthday,
        user_sex: data.user_sex,
        user_phone: data.user_phone,
        user_CMND: data.user_CMND,
        user_adress: data.user_adress,
        user_city: data.user_city,
        user_district: data.user_district,
        user_ward: data.user_ward,
        user_PlateOfRegis: data.user_PlateOfRegis,
        user_contact: data.user_contact,
        user_service: data.user_service,
        user_service_object: data.user_service_object,
        user_clinic: data.user_clinic,
        user_reason: data.user_reason,
        user_cost: data.user_cost,
        user_promotional_price: data.user_promotional_price,
        user_promotional_service: data.user_promotional_service,
        user_totalPromotional: data.user_totalPromotional,
        user_totalSevice: data.user_totalSevice
    }
    const newReception = await createReceptionModel(dataReception);

    return res.status(200).json(newReception);
}

//get one reception
export const getReception = async(req, res, next) => {
    const param = req.params;

    const query = { user_id: param.id };

    const getReception = await getReceptionModel(query);

    return res.status(200).json(getReception);
}

//update reception
export const updateReception = async(req, res, next) => {
    const data = req.body;

    const param = req.params;

    const query = { user_id: param.user_id };

    const dataUpdate = {
        $set: {
            user_name: data.user_name,
            user_birthday: data.user_birthday,
            user_sex: data.user_sex,
            user_phone: data.user_phone,
            user_CMND: data.user_CMND,
            user_adress: data.user_adress,
            user_city: data.user_city,
            user_district: data.user_district,
            user_ward: data.user_ward,
            user_PlateOfRegis: data.user_PlateOfRegis,
            user_contact: data.user_contact,
            user_service: data.user_service,
            user_service_object: data.user_service_object,
            user_clinic: data.user_clinic,
            user_reason: data.user_reason,
            user_cost: data.user_cost,
            user_promotional_price: data.user_promotional_price,
            user_promotional_service: data.user_promotional_service,
            user_totalPromotional: data.user_totalPromotional,
            user_totalSevice: data.user_totalSevice
        }
    }

    const dataUpdateReception = await updateReceptionModel(query, dataUpdate);

    return res.status(200).json(dataUpdateReception);
}

//delete reception
export const deleteReception = async(req, res, next) => {
    const param = req.params;

    const query = { user_id: param.user_id };

    const dataDeleteReception = await deleteReceptionModel(query);

    return res.status(200).json(dataDeleteReception);
}