import express from "express";
import ContratoController from "../controllers/contratoController.js";

const router = express.Router();

router.get("/", ContratoController.index);
router.get("/:id", ContratoController.show);
router.post("/", ContratoController.store);
router.put("/:id", ContratoController.update);
router.delete("/:id", ContratoController.destroy);

export default router;