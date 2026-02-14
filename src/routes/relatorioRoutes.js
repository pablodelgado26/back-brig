import express from "express";
import RelatorioController from "../controllers/relatorioController.js";

const router = express.Router();

router.get("/faturamento", RelatorioController.faturamentoMensal);
router.get("/fluxo-caixa", RelatorioController.fluxoCaixa);
router.get("/contas", RelatorioController.contasPagarReceber);
router.get("/estoque", RelatorioController.estoque);
router.get("/funcionarios", RelatorioController.funcionarios);
router.get("/contratos", RelatorioController.contratos);
router.get("/dre", RelatorioController.dreSimplifcado);

export default router;