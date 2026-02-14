import express from "express";
import LancamentoCaixaController from "../controllers/lancamentoCaixaController.js";

const router = express.Router();

// Rotas do livro caixa
router.get("/", LancamentoCaixaController.index);
router.get("/totals", LancamentoCaixaController.totals);
router.get("/resumo-categoria", LancamentoCaixaController.resumoCategoria);
router.get("/:id", LancamentoCaixaController.show);
router.post("/", LancamentoCaixaController.store);
router.put("/:id", LancamentoCaixaController.update);
router.delete("/:id", LancamentoCaixaController.destroy);

export default router;