import express from "express";
import BemController from "../controllers/bemController.js";

const router = express.Router();

router.get("/", BemController.index);
router.get("/total-patrimonio", BemController.totalPatrimonio);
router.get("/:id", BemController.show);
router.post("/", BemController.store);
router.put("/:id", BemController.update);
router.delete("/:id", BemController.destroy);

export default router;