import ProdutoModel from "../models/produtoModel.js";

class ProdutoController {
    async index(req, res) {
        try {
            const produtos = await ProdutoModel.findAll();
            res.json(produtos);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(500).json({ error: "Erro ao listar produtos" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.findById(id);
            
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
            
            res.json(produto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            res.status(500).json({ error: "Erro ao buscar produto" });
        }
    }

    async store(req, res) {
        try {
            const { codigo, nome, categoria, quantidade, estoqueMinimo, unidade, valorUnitario } = req.body;

            if (!codigo || !nome || !categoria) {
                return res.status(400).json({ 
                    error: "Código, nome e categoria são obrigatórios" 
                });
            }

            // Verificar se código já existe
            const existente = await ProdutoModel.findByCodigo(codigo);
            if (existente) {
                return res.status(400).json({ error: "Código de produto já existe" });
            }

            const data = {
                codigo,
                nome,
                categoria,
                quantidade: parseInt(quantidade) || 0,
                estoqueMinimo: parseInt(estoqueMinimo) || 0,
                unidade: unidade || 'UN',
                valorUnitario: parseFloat(valorUnitario) || 0
            };

            const produto = await ProdutoModel.create(data);
            res.status(201).json({
                message: "Produto criado com sucesso!",
                produto
            });
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ error: "Erro ao criar produto" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.quantidade !== undefined) {
                data.quantidade = parseInt(data.quantidade);
            }
            if (data.estoqueMinimo !== undefined) {
                data.estoqueMinimo = parseInt(data.estoqueMinimo);
            }
            if (data.valorUnitario !== undefined) {
                data.valorUnitario = parseFloat(data.valorUnitario);
            }

            const produto = await ProdutoModel.update(id, data);
            res.json({
                message: "Produto atualizado com sucesso!",
                produto
            });
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).json({ error: "Erro ao atualizar produto" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await ProdutoModel.delete(id);
            res.json({ message: "Produto deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).json({ error: "Erro ao deletar produto" });
        }
    }

    async statistics(req, res) {
        try {
            const stats = await ProdutoModel.getStatistics();
            res.json(stats);
        } catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            res.status(500).json({ error: "Erro ao obter estatítticas" });
        }
    }

    // Entrada de mercadorias
    async entradaMercadoria(req, res) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            if (quantidade === undefined || quantidade <= 0) {
                return res.status(400).json({ error: "Quantidade deve ser maior que zero" });
            }

            const produto = await ProdutoModel.findById(id);
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            const novaQuantidade = produto.quantidade + parseInt(quantidade);
            const produtoAtualizado = await ProdutoModel.update(id, {
                quantidade: novaQuantidade
            });

            res.json({
                message: "Entrada de mercadoria registrada com sucesso!",
                produto: produtoAtualizado
            });
        } catch (error) {
            console.error("Erro ao registrar entrada:", error);
            res.status(500).json({ error: "Erro ao registrar entrada" });
        }
    }
}

export default new ProdutoController();