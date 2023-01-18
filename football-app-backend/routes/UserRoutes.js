import express from 'express';
import { createUser } from '../controllers/UserControllers.js';
const router = express.Router();

//CREATE NEW USER
router.post("/", createUser);

export default router;