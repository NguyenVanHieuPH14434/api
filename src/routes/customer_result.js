import express from "express";
import { createResult, deleteResult, getListResult, getResult, updateResult } from "../app/controller/Customer_resultController.js";

const router = express.Router();

//get customer result Patient
router.get('/', getListResult);

// Post
router.post('/', createResult);

// //get detail
router.get('/:id', getResult);

// //update
router.post('/:id', updateResult);

// //delete
router.delete('/:id', deleteResult);

export default router;