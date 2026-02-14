import express from "express";
import DocumentoLicitacaoController from "../controllers/documentoLicitacaoController.js";

const router = express.Router();

router.get("/", DocumentoLicitacaoController.index);
router.get("/status-count", DocumentoLicitacaoController.statusCount);
router.get("/:id", DocumentoLicitacaoController.show);
router.post("/", DocumentoLicitacaoController.store);
router.put("/:id", DocumentoLicitacaoController.update);
router.delete("/:id", DocumentoLicitacaoController.destroy);

export default router;