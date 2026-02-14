import FuncionarioModel from "../models/funcionarioModel.js";

class FuncionarioController {
    async index(req, res) {
        try {
            const funcionarios = await FuncionarioModel.findAll();
            res.json(funcionarios);
        } catch (error) {
            console.error("Erro ao listar funcionários:", error);
            res.status(500).json({ error: "Erro ao listar funcionários" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await FuncionarioModel.findById(id);
            
            if (!funcionario) {
                return res.status(404).json({ error: "Funcionário não encontrado" });
            }
            
            res.json(funcionario);
        } catch (error) {
            console.error("Erro ao buscar funcionário:", error);
            res.status(500).json({ error: "Erro ao buscar funcionário" });
        }
    }

    async store(req, res) {
        try {
            const { nome, cpf, cargo, admissao, salario } = req.body;

            if (!nome || !cpf || !cargo || !admissao || salario === undefined) {
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            // Verificar se CPF já existe
            const existente = await FuncionarioModel.findByCPF(cpf);
            if (existente) {
                return res.status(400).json({ error: "Funcionário com este CPF já está cadastrado" });
            }

            const data = {
                nome,
                cpf,
                cargo,
                admissao,
                salario: parseFloat(salario)
            };

            const funcionario = await FuncionarioModel.create(data);
            res.status(201).json({
                message: "Funcionário criado com sucesso!",
                funcionario
            });
        } catch (error) {
            console.error("Erro ao criar funcionário:", error);
            res.status(500).json({ error: "Erro ao criar funcionário" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            if (data.salario !== undefined) {
                data.salario = parseFloat(data.salario);
            }

            const funcionario = await FuncionarioModel.update(id, data);
            res.json({
                message: "Funcionário atualizado com sucesso!",
                funcionario
            });
        } catch (error) {
            console.error("Erro ao atualizar funcionário:", error);
            res.status(500).json({ error: "Erro ao atualizar funcionário" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await FuncionarioModel.delete(id);
            res.json({ message: "Funcionário deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
            res.status(500).json({ error: "Erro ao deletar funcionário" });
        }
    }
}

export default new FuncionarioController();