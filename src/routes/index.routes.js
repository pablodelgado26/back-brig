import express from "express"

// Importar todas as rotas
import authRouter from "./auth.routes.js"
import dashboardRouter from "./dashboardRoutes.js"
import faturamentoRouter from "./faturamentoRoutes.js"
import caixaRouter from "./caixaRoutes.js"
import pagamentoRouter from "./pagamentoRoutes.js"
import recebimentoRouter from "./recebimentoRoutes.js"
import produtoRouter from "./produtoRoutes.js"
import funcionarioRouter from "./funcionarioRoutes.js"
import bemRouter from "./bemRoutes.js"
import contratoRouter from "./contratoRoutes.js"
import documentoLicitacaoRouter from "./documentoLicitacaoRoutes.js"
import relatorioRouter from "./relatorioRoutes.js"

// Importar middleware de autenticação
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);

// Rotas protegidas (aplicar middleware de autenticação)
router.use(authMiddleware);

// Rotas do sistema MEI
router.use("/dashboard", dashboardRouter);
router.use("/faturamento", faturamentoRouter);
router.use("/caixa", caixaRouter);
router.use("/pagamentos", pagamentoRouter);
router.use("/recebimentos", recebimentoRouter);
router.use("/produtos", produtoRouter);
router.use("/funcionarios", funcionarioRouter);
router.use("/bens", bemRouter);
router.use("/contratos", contratoRouter);
router.use("/documentos-licitacao", documentoLicitacaoRouter);
router.use("/relatorios", relatorioRouter);

export default router