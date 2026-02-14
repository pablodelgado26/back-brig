import express from "express"

// Importar todas as rotas
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

const router = express.Router();

// Rota principal - teste da API
router.get("/", (req, res) => {
    res.json({
        message: "🚀 Sistema MEI - API funcionando!",
        timestamp: new Date().toISOString(),
        modules: {
            dashboard: "/dashboard",
            faturamento: "/faturamento",
            caixa: "/caixa",
            pagamentos: "/pagamentos", 
            recebimentos: "/recebimentos",
            produtos: "/produtos",
            funcionarios: "/funcionarios",
            bens: "/bens",
            contratos: "/contratos",
            "documentos-licitacao": "/documentos-licitacao",
            relatorios: "/relatorios"
        }
    });
});

// Rotas do sistema MEI (sem autenticação)
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