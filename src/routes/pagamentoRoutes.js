import express from "express";
import PagamentoController from "../controllers/pagamentoController.js";

const router = express.Router();

// Rotas de pagamentos
router.get("/", PagamentoController.index);
router.get("/totals", PagamentoController.totals);
router.get("/:id", PagamentoController.show);
router.post("/", PagamentoController.store);
router.put("/:id", PagamentoController.update);
router.put("/:id/pagar", PagamentoController.marcarComoPago);
router.delete("/:id", PagamentoController.destroy);

export default router;