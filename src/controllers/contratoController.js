import ContratoModel from "../models/contratoModel.js";

class ContratoController {
    async index(req, res) {
        try {
            const { tipo } = req.query;
            let contratos;
            
            if (tipo) {
                contratos = await ContratoModel.findByTipo(tipo);
            } else {
                contratos = await ContratoModel.findAll();
            }
            
            res.json(contratos);
        } catch (error) {
            console.error("Erro ao listar contratos:", error);
            res.status(500).json({ error: "Erro ao listar contratos" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const contrato = await ContratoModel.findById(id);
            
            if (!contrato) {
                return res.status(404).json({ error: "Contrato não encontrado" });
            }
            
            res.json(contrato);
        } catch (error) {
            console.error("Erro ao buscar contrato:", error);
            res.status(500).json({ error: "Erro ao buscar contrato" });
        }
    }

    async store(req, res) {
        try {
            const { tipo, parte, objeto, inicio, termino, valor } = req.body;

            if (!tipo || !parte || !objeto || !inicio || !termino || valor === undefined) {
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            const data = {
                tipo,
                parte,
                objeto,
                inicio,
                termino,
                valor: parseFloat(valor)
            };

            const contrato = await ContratoModel.create(data);
            res.status(201).json({
                message: "Contrato criado com sucesso!",
                contrato
            });
        } catch (error) {
            console.error("Erro ao criar contrato:", error);
            res.status(500).json({ error: "Erro ao criar contrato" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.valor !== undefined) {
                data.valor = parseFloat(data.valor);
            }

            const contrato = await ContratoModel.update(id, data);
            res.json({
                message: "Contrato atualizado com sucesso!",
                contrato
            });
        } catch (error) {
            console.error("Erro ao atualizar contrato:", error);
            res.status(500).json({ error: "Erro ao atualizar contrato" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await ContratoModel.delete(id);
            res.json({ message: "Contrato deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar contrato:", error);
            res.status(500).json({ error: "Erro ao deletar contrato" });
        }
    }
}

export default new ContratoController();