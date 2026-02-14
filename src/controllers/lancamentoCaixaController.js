import LancamentoCaixaModel from "../models/lancamentoCaixaModel.js";

class LancamentoCaixaController {
    // Listar todos os lançamentos
    async index(req, res) {
        try {
            const { tipo, dataInicio, dataFim } = req.query;
            
            let lancamentos;
            
            if (dataInicio && dataFim) {
                lancamentos = await LancamentoCaixaModel.findByPeriod(dataInicio, dataFim);
            } else if (tipo) {
                lancamentos = await LancamentoCaixaModel.findByTipo(tipo);
            } else {
                lancamentos = await LancamentoCaixaModel.findAll();
            }
            
            res.json(lancamentos);
        } catch (error) {
            console.error("Erro ao listar lançamentos:", error);
            res.status(500).json({ error: "Erro ao listar lançamentos" });
        }
    }

    // Buscar lançamento por ID
    async show(req, res) {
        try {
            const { id } = req.params;
            const lancamento = await LancamentoCaixaModel.findById(id);
            
            if (!lancamento) {
                return res.status(404).json({ error: "Lançamento não encontrado" });
            }
            
            res.json(lancamento);
        } catch (error) {
            console.error("Erro ao buscar lançamento:", error);
            res.status(500).json({ error: "Erro ao buscar lançamento" });
        }
    }

    // Criar novo lançamento
    async store(req, res) {
        try {
            const { data, tipo, descricao, categoria, valor, formaPagamento } = req.body;

            // Validação básica
            if (!data || !tipo || !descricao || !categoria || valor === undefined || !formaPagamento) {
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            if (!['Entrada', 'Saída'].includes(tipo)) {
                return res.status(400).json({ 
                    error: "Tipo deve ser 'Entrada' ou 'Saída'" 
                });
            }

            const dadosLancamento = {
                data,
                tipo,
                descricao,
                categoria,
                valor: parseFloat(valor),
                formaPagamento
            };

            const lancamento = await LancamentoCaixaModel.create(dadosLancamento);
            res.status(201).json({
                message: "Lançamento criado com sucesso!",
                lancamento
            });
        } catch (error) {
            console.error("Erro ao criar lançamento:", error);
            res.status(500).json({ error: "Erro ao criar lançamento" });
        }
    }

    // Atualizar lançamento
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.valor) {
                data.valor = parseFloat(data.valor);
            }

            const lancamento = await LancamentoCaixaModel.update(id, data);
            res.json({
                message: "Lançamento atualizado com sucesso!",
                lancamento
            });
        } catch (error) {
            console.error("Erro ao atualizar lançamento:", error);
            res.status(500).json({ error: "Erro ao atualizar lançamento" });
        }
    }

    // Deletar lançamento
    async destroy(req, res) {
        try {
            const { id } = req.params;
            await LancamentoCaixaModel.delete(id);
            res.json({ message: "Lançamento deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar lançamento:", error);
            res.status(500).json({ error: "Erro ao deletar lançamento" });
        }
    }

    // Obter totais
    async totals(req, res) {
        try {
            const totals = await LancamentoCaixaModel.getTotals();
            res.json(totals);
        } catch (error) {
            console.error("Erro ao obter totais:", error);
            res.status(500).json({ error: "Erro ao obter totais" });
        }
    }

    // Obter resumo por categoria
    async resumoCategoria(req, res) {
        try {
            const resumo = await LancamentoCaixaModel.getResumoByCategoria();
            res.json(resumo);
        } catch (error) {
            console.error("Erro ao obter resumo por categoria:", error);
            res.status(500).json({ error: "Erro ao obter resumo por categoria" });
        }
    }
}

export default new LancamentoCaixaController();