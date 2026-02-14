import FaturamentoModel from "../models/faturamentoModel.js";

class FaturamentoController {
    // Listar todos os faturamentos
    async index(req, res) {
        try {
            const faturamentos = await FaturamentoModel.findAll();
            res.json(faturamentos);
        } catch (error) {
            console.error("Erro ao listar faturamentos:", error);
            res.status(500).json({ error: "Erro ao listar faturamentos" });
        }
    }

    // Buscar faturamento por ID
    async show(req, res) {
        try {
            const { id } = req.params;
            const faturamento = await FaturamentoModel.findById(id);
            
            if (!faturamento) {
                return res.status(404).json({ error: "Faturamento não encontrado" });
            }
            
            res.json(faturamento);
        } catch (error) {
            console.error("Erro ao buscar faturamento:", error);
            res.status(500).json({ error: "Erro ao buscar faturamento" });
        }
    }

    // Criar novo faturamento
    async store(req, res) {
        try {
            const { mes, ano, receitaBruta, despesas } = req.body;

            // Validação básica
            if (!mes || !ano || receitaBruta === undefined) {
                return res.status(400).json({ error: "Mês, ano e receita bruta são obrigatórios" });
            }

            // Verificar se já existe faturamento para o período
            const existente = await FaturamentoModel.findByPeriodo(mes, ano);
            if (existente) {
                return res.status(400).json({ error: "Já existe faturamento para este período" });
            }

            const data = {
                mes,
                ano,
                receitaBruta: parseFloat(receitaBruta),
                despesas: parseFloat(despesas) || 0
            };

            const faturamento = await FaturamentoModel.create(data);
            res.status(201).json({
                message: "Faturamento criado com sucesso!",
                faturamento
            });
        } catch (error) {
            console.error("Erro ao criar faturamento:", error);
            res.status(500).json({ error: "Erro ao criar faturamento" });
        }
    }

    // Atualizar faturamento
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const faturamento = await FaturamentoModel.update(id, data);
            res.json({
                message: "Faturamento atualizado com sucesso!",
                faturamento
            });
        } catch (error) {
            console.error("Erro ao atualizar faturamento:", error);
            res.status(500).json({ error: "Erro ao atualizar faturamento" });
        }
    }

    // Deletar faturamento
    async destroy(req, res) {
        try {
            const { id } = req.params;
            await FaturamentoModel.delete(id);
            res.json({ message: "Faturamento deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar faturamento:", error);
            res.status(500).json({ error: "Erro ao deletar faturamento" });
        }
    }

    // Obter estatísticas
    async statistics(req, res) {
        try {
            const stats = await FaturamentoModel.getStatistics();
            res.json(stats);
        } catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            res.status(500).json({ error: "Erro ao obter estatísticas" });
        }
    }
}

export default new FaturamentoController();