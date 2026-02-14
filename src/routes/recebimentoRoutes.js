import express from "express";
import RecebimentoController from "../controllers/recebimentoController.js";

const router = express.Router();

// Rotas de recebimentos
router.get("/", RecebimentoController.index);
router.get("/totals", RecebimentoController.totals);
router.get("/:id", RecebimentoController.show);
router.post("/", RecebimentoController.store);
router.put("/:id", RecebimentoController.update);
router.put("/:id/receber", RecebimentoController.marcarComoRecebido);
router.delete("/:id", RecebimentoController.destroy);

export default router;