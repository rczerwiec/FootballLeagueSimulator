import express from 'express';
import { createUser, getUser } from '../controllers/UserControllers.js';
const router = express.Router();

//CREATE NEW USER
router.post("/", createUser);

//GET USER
router.get("/:userId", getUser);

export default router;