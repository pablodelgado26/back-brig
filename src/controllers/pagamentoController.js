import PagamentoModel from "../models/pagamentoModel.js";

class PagamentoController {
    async index(req, res) {
        try {
            const { status } = req.query;
            let pagamentos;
            
            if (status) {
                pagamentos = await PagamentoModel.findByStatus(status);
            } else {
                pagamentos = await PagamentoModel.findAll();
            }
            
            res.json(pagamentos);
        } catch (error) {
            console.error("Erro ao listar pagamentos:", error);
            res.status(500).json({ error: "Erro ao listar pagamentos" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const pagamento = await PagamentoModel.findById(id);
            
            if (!pagamento) {
                return res.status(404).json({ error: "Pagamento não encontrado" });
            }
            
            res.json(pagamento);
        } catch (error) {
            console.error("Erro ao buscar pagamento:", error);
            res.status(500).json({ error: "Erro ao buscar pagamento" });
        }
    }

    async store(req, res) {
        try {
            const { descricao, fornecedor, vencimento, valor, categoria } = req.body;

            if (!descricao || !fornecedor || !vencimento || valor === undefined || !categoria) {
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            const data = {
                descricao,
                fornecedor,
                vencimento,
                valor: parseFloat(valor),
                categoria
            };

            const pagamento = await PagamentoModel.create(data);
            res.status(201).json({
                message: "Pagamento criado com sucesso!",
                pagamento
            });
        } catch (error) {
            console.error("Erro ao criar pagamento:", error);
            res.status(500).json({ error: "Erro ao criar pagamento" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.valor) {
                data.valor = parseFloat(data.valor);
            }

            const pagamento = await PagamentoModel.update(id, data);
            res.json({
                message: "Pagamento atualizado com sucesso!",
                pagamento
            });
        } catch (error) {
            console.error("Erro ao atualizar pagamento:", error);
            res.status(500).json({ error: "Erro ao atualizar pagamento" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await PagamentoModel.delete(id);
            res.json({ message: "Pagamento deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar pagamento:", error);
            res.status(500).json({ error: "Erro ao deletar pagamento" });
        }
    }

    async totals(req, res) {
        try {
            const totals = await PagamentoModel.getTotals();
            res.json(totals);
        } catch (error) {
            console.error("Erro ao obter totais:", error);
            res.status(500).json({ error: "Erro ao obter totais" });
        }
    }

    // Marcar pagamento como pago
    async marcarComoPago(req, res) {
        try {
            const { id } = req.params;
            
            const pagamento = await PagamentoModel.update(id, {
                status: 'Pago',
                dataPagamento: new Date()
            });
            
            res.json({
                message: "Pagamento marcado como pago!",
                pagamento
            });
        } catch (error) {
            console.error("Erro ao marcar pagamento como pago:", error);
            res.status(500).json({ error: "Erro ao marcar pagamento como pago" });
        }
    }
}

export default new PagamentoController();