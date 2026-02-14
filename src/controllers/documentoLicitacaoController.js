import DocumentoLicitacaoModel from "../models/documentoLicitacaoModel.js";

class DocumentoLicitacaoController {
    async index(req, res) {
        try {
            const { status } = req.query;
            let documentos;
            
            if (status) {
                documentos = await DocumentoLicitacaoModel.findByStatus(status);
            } else {
                documentos = await DocumentoLicitacaoModel.findAll();
            }
            
            res.json(documentos);
        } catch (error) {
            console.error("Erro ao listar documentos:", error);
            res.status(500).json({ error: "Erro ao listar documentos" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const documento = await DocumentoLicitacaoModel.findById(id);
            
            if (!documento) {
                return res.status(404).json({ error: "Documento não encontrado" });
            }
            
            res.json(documento);
        } catch (error) {
            console.error("Erro ao buscar documento:", error);
            res.status(500).json({ error: "Erro ao buscar documento" });
        }
    }

    async store(req, res) {
        try {
            const { tipo, numero, emissao, validade } = req.body;

            if (!tipo || !numero || !emissao || !validade) {
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            // Determinar status baseado na data de validade
            const hoje = new Date();
            const dataValidade = new Date(validade);
            const diasParaVencer = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
            
            let status = 'Válido';
            if (diasParaVencer < 0) {
                status = 'Vencido';
            } else if (diasParaVencer <= 30) {
                status = 'Vencendo';
            }

            const data = {
                tipo,
                numero,
                emissao,
                validade,
                status
            };

            const documento = await DocumentoLicitacaoModel.create(data);
            res.status(201).json({
                message: "Documento criado com sucesso!",
                documento
            });
        } catch (error) {
            console.error("Erro ao criar documento:", error);
            res.status(500).json({ error: "Erro ao criar documento" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            // Atualizar status se a validade foi alterada
            if (data.validade) {
                const hoje = new Date();
                const dataValidade = new Date(data.validade);
                const diasParaVencer = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                
                if (diasParaVencer < 0) {
                    data.status = 'Vencido';
                } else if (diasParaVencer <= 30) {
                    data.status = 'Vencendo';
                } else {
                    data.status = 'Válido';
                }
            }

            const documento = await DocumentoLicitacaoModel.update(id, data);
            res.json({
                message: "Documento atualizado com sucesso!",
                documento
            });
        } catch (error) {
            console.error("Erro ao atualizar documento:", error);
            res.status(500).json({ error: "Erro ao atualizar documento" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await DocumentoLicitacaoModel.delete(id);
            res.json({ message: "Documento deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar documento:", error);
            res.status(500).json({ error: "Erro ao deletar documento" });
        }
    }

    async statusCount(req, res) {
        try {
            const counts = await DocumentoLicitacaoModel.getStatusCount();
            res.json(counts);
        } catch (error) {
            console.error("Erro ao obter contagem por status:", error);
            res.status(500).json({ error: "Erro ao obter contagem por status" });
        }
    }
}

export default new DocumentoLicitacaoController();