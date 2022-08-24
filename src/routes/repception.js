import express from "express";
import { createReception, deleteReception, getListReceptions, getReception, updateReception } from "../app/controller/ReceptionController.js";

const router = express.Router();

//get
router.get('/', getListReceptions);

//create
router.post('/', createReception);

//get by id
router.get('/:id', getReception);

//update
router.post('/:user_id', updateReception);

//delete
router.delete('/:user_id', deleteReception);

export default router;