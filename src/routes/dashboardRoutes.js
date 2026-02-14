import express from "express";
import DashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// Rotas do dashboard
router.get("/stats", DashboardController.stats);
router.get("/resumo-mensal", DashboardController.resumoMensal);

export default router;