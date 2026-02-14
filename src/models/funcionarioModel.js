import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class FuncionarioModel {
    async findAll() {
        return await prisma.funcionario.findMany({
            orderBy: { nome: 'asc' },
            include: {
                LancamentoTrabalhista: true
            }
        });
    }

    async findById(id) {
        return await prisma.funcionario.findUnique({
            where: { id: parseInt(id) },
            include: {
                LancamentoTrabalhista: true
            }
        });
    }

    async findByCPF(cpf) {
        return await prisma.funcionario.findUnique({
            where: { cpf }
        });
    }

    async create(data) {
        return await prisma.funcionario.create({
            data: {
                ...data,
                admissao: new Date(data.admissao)
            }
        });
    }

    async update(id, data) {
        if (data.admissao) {
            data.admissao = new Date(data.admissao);
        }
        
        return await prisma.funcionario.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.funcionario.delete({
            where: { id: parseInt(id) }
        });
    }
}

export default new FuncionarioModel();