import express from "express";

import { auth } from "../middlewares/auth.js";
import * as transectionController from "../controllers/TransectionController.js";

// Router instance
const router = express.Router();

router.get("/", auth, transectionController.getTransections);
router.post("/", auth, transectionController.addTransection);
router.delete("/:id", transectionController.deleteTransection);

export default router;
