import express from "express";
import urid from "urid";
import { MongoClient } from "mongodb";
const url = 'mongodb+srv://bv_dev:bv123456@bv.jmrzod0.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'bv';
const router = express.Router();

//get
router.get('/', async(req, res) => {

    const filter = {};

    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }


    // const data = await client.db(dbName).collection('customer').find().toArray();
    const data = await client.db(dbName).collection('customer').aggregate([{
        $match: filter
    }, {
        $lookup: {
            from: 'customer_contact',
            localField: 'user_id',
            foreignField: 'id_user',
            as: 'user_contact'
        }
    }, {
        $lookup: {
            from: 'customer_service',
            localField: 'user_id',
            foreignField: 'id_user',
            as: 'user_service'
        }
    }, ]).toArray();
    return res.status(200).json(data);
})

//create
router.post('/', async(req, res) => {
        const data = req.body;
        // const { user_id = urid(12, number), user_name, user_birthday, user_sex, user_phone, user_district, user_city, user_ward, user_CMND, user_adress, user_PlateOfRegis, user_contact } = req.body;
        const number = '123456789';
        data.user_id = urid(12, number);

        // data.user_id = selectnum.join('');
        // data.user_id = cryptoRandomString({ length: 10, type: 'numeric' });
        // console.log(data.user_id);
        try {
            // const newData = await client.db(dbName).collection('receptions').insertOne({
            const newCustomer = await client.db(dbName).collection('customer').insertOne({
                user_id: data.user_id,
                user_name: data.user_name,
                user_birthday: data.user_birthday,
                user_sex: data.user_sex,
                user_phone: data.user_phone
            });
            // newCustomer.save();

            const newCustomer_contact = await client.db(dbName).collection('customer_contact').insertOne({
                id_user: data.user_id,
                user_CMND: data.user_CMND,
                user_adress: data.user_adress,
                user_city: data.user_city,
                user_district: data.user_district,
                user_ward: data.user_ward,
                user_PlateOfRegis: data.user_PlateOfRegis,
                user_contact: data.user_contact
            });

            const newCustomer_service = await client.db(dbName).collection('customer_service').insertOne({
                id_user: data.user_id,
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
            save();
            return res.status(200).json(newCustomer, newCustomer_contact, newCustomer_service)
        } catch (error) {
            console.log(error);
        }
    })
    //get by id
router.get('/:id', async(req, res) => {
    let param = req.params;

    const data = await client.db(dbName).collection('customer').aggregate([{
        $match: {
            user_id: param.id
        }
    }, {
        $lookup: {
            from: 'customer_contact',
            localField: 'user_id',
            foreignField: 'id_user',
            as: 'user_contact'
        }
    }, {
        $lookup: {
            from: 'customer_service',
            localField: 'user_id',
            foreignField: 'id_user',
            as: 'user_service'
        }
    }, ]).toArray();
    return res.status(200).json(data);
});

//update

router.post('/:user_id', async(req, res) => {
    const data = req.body;
    const param = req.params;

    try {
        // const newData = await client.db(dbName).collection('receptions').insertOne({
        const newCustomer = await client.db(dbName).collection('customer').updateOne({ user_id: param.user_id }, {
            $set: {

                user_name: data.user_name,
                user_birthday: data.user_birthday,
                user_sex: data.user_sex,
                user_phone: data.user_phone
            }
        });
        // newCustomer.save();

        const newCustomer_contact = await client.db(dbName).collection('customer_contact').updateOne({ id_user: param.user_id }, {
            $set: {

                user_CMND: data.user_CMND,
                user_adress: data.user_adress,
                user_city: data.user_city,
                user_district: data.user_district,
                user_ward: data.user_ward,
                user_PlateOfRegis: data.user_PlateOfRegis,
                user_contact: data.user_contact
            }
        });

        const newCustomer_service = await client.db(dbName).collection('customer_service').updateOne({ id_user: param.user_id }, {
            $set: {
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
        return res.status(200).json(newCustomer, newCustomer_contact, newCustomer_service)
    } catch (error) {
        console.log(error);
    }
})

//delete
router.delete('/:id', async(req, res) => {
    // const dataCus = req.params.user_id;
    const dataCus = await client.db(dbName).collection('customer').deleteOne({ user_id: req.params.id });
    const dataCus_Contact = await client.db(dbName).collection('customer_contact').deleteOne({ id_user: req.params.id });
    const dataCus_Service = await client.db(dbName).collection('customer_service').deleteOne({ id_user: req.params.id });
    return res.json(dataCus, dataCus_Contact, dataCus_Service);
});

export default router;