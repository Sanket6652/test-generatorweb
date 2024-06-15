import express from "express";
import { getusers,completedTestsByuser } from "../controller/user_controller.js";

const router = express.Router();

router.get("/alluser", getusers);
router.get("/getCompletedTests/:userId",completedTestsByuser )

export default router;