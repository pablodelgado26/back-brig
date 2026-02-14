import express from "express";
import FaturamentoController from "../controllers/faturamentoController.js";

const router = express.Router();

// Rotas do faturamento
router.get("/", FaturamentoController.index);
router.get("/statistics", FaturamentoController.statistics);
router.get("/:id", FaturamentoController.show);
router.post("/", FaturamentoController.store);
router.put("/:id", FaturamentoController.update);
router.delete("/:id", FaturamentoController.destroy);

export default router;