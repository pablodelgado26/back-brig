import RecebimentoModel from "../models/recebimentoModel.js";

class RecebimentoController {
    async index(req, res) {
        try {
            const { status } = req.query;
            let recebimentos;
            
            if (status) {
                recebimentos = await RecebimentoModel.findByStatus(status);
            } else {
                recebimentos = await RecebimentoModel.findAll();
            }
            
            res.json(recebimentos);
        } catch (error) {
            console.error("Erro ao listar recebimentos:", error);
            res.status(500).json({ error: "Erro ao listar recebimentos" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const recebimento = await RecebimentoModel.findById(id);
            
            if (!recebimento) {
                return res.status(404).json({ error: "Recebimento não encontrado" });
            }
            
            res.json(recebimento);
        } catch (error) {
            console.error("Erro ao buscar recebimento:", error);
            res.status(500).json({ error: "Erro ao buscar recebimento" });
        }
    }

    async store(req, res) {
        try {
            const { descricao, cliente, vencimento, valor, notaFiscal } = req.body;

            if (!descricao || !cliente || !vencimento || valor === undefined) {
                return res.status(400).json({ 
                    error: "Descrição, cliente, vencimento e valor são obrigatórios" 
                });
            }

            const data = {
                descricao,
                cliente,
                vencimento,
                valor: parseFloat(valor),
                notaFiscal
            };

            const recebimento = await RecebimentoModel.create(data);
            res.status(201).json({
                message: "Recebimento criado com sucesso!",
                recebimento
            });
        } catch (error) {
            console.error("Erro ao criar recebimento:", error);
            res.status(500).json({ error: "Erro ao criar recebimento" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.valor) {
                data.valor = parseFloat(data.valor);
            }

            const recebimento = await RecebimentoModel.update(id, data);
            res.json({
                message: "Recebimento atualizado com sucesso!",
                recebimento
            });
        } catch (error) {
            console.error("Erro ao atualizar recebimento:", error);
            res.status(500).json({ error: "Erro ao atualizar recebimento" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await RecebimentoModel.delete(id);
            res.json({ message: "Recebimento deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar recebimento:", error);
            res.status(500).json({ error: "Erro ao deletar recebimento" });
        }
    }

    async totals(req, res) {
        try {
            const totals = await RecebimentoModel.getTotals();
            res.json(totals);
        } catch (error) {
            console.error("Erro ao obter totais:", error);
            res.status(500).json({ error: "Erro ao obter totais" });
        }
    }

    // Marcar recebimento como recebido
    async marcarComoRecebido(req, res) {
        try {
            const { id } = req.params;
            
            const recebimento = await RecebimentoModel.update(id, {
                status: 'Recebido',
                dataRecebimento: new Date()
            });
            
            res.json({
                message: "Recebimento marcado como recebido!",
                recebimento
            });
        } catch (error) {
            console.error("Erro ao marcar recebimento como recebido:", error);
            res.status(500).json({ error: "Erro ao marcar recebimento como recebido" });
        }
    }
}

export default new RecebimentoController();