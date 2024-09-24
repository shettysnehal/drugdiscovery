import express from "express";
const router  = express.Router();

import users from "../routes/users/index.js"
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import { fetchDetails } from "../controllers/userController.js";
//import openai from "../routes/openai"
router.use("/users",users)
router.post("/ai",authenticateJWT)
router.post("/userDetails",authenticateJWT,fetchDetails)

export default router 






