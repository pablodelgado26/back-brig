import express from "express";
import FuncionarioController from "../controllers/funcionarioController.js";

const router = express.Router();

router.get("/", FuncionarioController.index);
router.get("/:id", FuncionarioController.show);
router.post("/", FuncionarioController.store);
router.put("/:id", FuncionarioController.update);
router.delete("/:id", FuncionarioController.destroy);

export default router;