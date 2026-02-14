import BemModel from "../models/bemModel.js";

class BemController {
    async index(req, res) {
        try {
            const bens = await BemModel.findAll();
            res.json(bens);
        } catch (error) {
            console.error("Erro ao listar bens:", error);
            res.status(500).json({ error: "Erro ao listar bens" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const bem = await BemModel.findById(id);
            
            if (!bem) {
                return res.status(404).json({ error: "Bem não encontrado" });
            }
            
            res.json(bem);
        } catch (error) {
            console.error("Erro ao buscar bem:", error);
            res.status(500).json({ error: "Erro ao buscar bem" });
        }
    }

    async store(req, res) {
        try {
            const { descricao, categoria, dataAquisicao, valor, depreciacaoAnual } = req.body;

            if (!descricao || !categoria || !dataAquisicao || valor === undefined) {
                return res.status(400).json({ 
                    error: "Descrição, categoria, data de aquisição e valor são obrigatórios" 
                });
            }

            const data = {
                descricao,
                categoria,
                dataAquisicao,
                valor: parseFloat(valor),
                depreciacaoAnual: parseFloat(depreciacaoAnual) || 0
            };

            const bem = await BemModel.create(data);
            res.status(201).json({
                message: "Bem criado com sucesso!",
                bem
            });
        } catch (error) {
            console.error("Erro ao criar bem:", error);
            res.status(500).json({ error: "Erro ao criar bem" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.valor !== undefined) {
                data.valor = parseFloat(data.valor);
            }
            if (data.depreciacaoAnual !== undefined) {
                data.depreciacaoAnual = parseFloat(data.depreciacaoAnual);
            }

            const bem = await BemModel.update(id, data);
            res.json({
                message: "Bem atualizado com sucesso!",
                bem
            });
        } catch (error) {
            console.error("Erro ao atualizar bem:", error);
            res.status(500).json({ error: "Erro ao atualizar bem" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await BemModel.delete(id);
            res.json({ message: "Bem deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar bem:", error);
            res.status(500).json({ error: "Erro ao deletar bem" });
        }
    }

    async totalPatrimonio(req, res) {
        try {
            const total = await BemModel.getTotalPatrimonio();
            res.json({ totalPatrimonio: total });
        } catch (error) {
            console.error("Erro ao obter total do patrimônio:", error);
            res.status(500).json({ error: "Erro ao obter total do patrimônio" });
        }
    }
}

export default new BemController();