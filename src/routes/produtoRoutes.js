import express from "express";
import ProdutoController from "../controllers/produtoController.js";

const router = express.Router();

// Rotas de produtos
router.get("/", ProdutoController.index);
router.get("/statistics", ProdutoController.statistics);
router.get("/:id", ProdutoController.show);
router.post("/", ProdutoController.store);
router.put("/:id", ProdutoController.update);
router.put("/:id/entrada", ProdutoController.entradaMercadoria);
router.delete("/:id", ProdutoController.destroy);

export default router;