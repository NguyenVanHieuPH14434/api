import express from "express";
import urid from "urid";
import { client, dbName, url } from "../database/db.js";

const router = express.Router();
//get
router.get('/', async(req, res) => {

    const filter = {};

    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }

    const data = await client.db(dbName).collection('re').find(filter).toArray();

    return res.status(200).json(data);
})

//create
router.post('/', async(req, res) => {
    const data = req.body;
    const number = '123456789';
    data.user_id = urid(12, number);

    const newCustomer = await client.db(dbName).collection('re').insertOne({
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
    });
    return res.status(200).json(newCustomer)

})

//get by id
router.get('/:id', async(req, res) => {
    let param = req.params;

    const data = await client.db(dbName).collection('re').findOne({ user_id: param.id });

    return res.status(200).json(data);
});

//update

router.post('/:user_id', async(req, res) => {
    const data = req.body;
    const param = req.params;

    const updateCustomer = await client.db(dbName).collection('re').updateOne({ user_id: param.user_id }, {
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
    });
    return res.status(200).json(updateCustomer)

})

//delete
router.delete('/:user_id', async(req, res) => {
    const deleteCustomer = await client.db(dbName).collection('re').deleteOne({ user_id: req.params.user_id });
    return res.json(deleteCustomer);
});

export default router;