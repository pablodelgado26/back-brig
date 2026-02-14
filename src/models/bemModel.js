import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class BemModel {
    async findAll() {
        return await prisma.bem.findMany({
            orderBy: { descricao: 'asc' }
        });
    }

    async findById(id) {
        return await prisma.bem.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async create(data) {
        return await prisma.bem.create({
            data: {
                ...data,
                dataAquisicao: new Date(data.dataAquisicao)
            }
        });
    }

    async update(id, data) {
        if (data.dataAquisicao) {
            data.dataAquisicao = new Date(data.dataAquisicao);
        }
        
        return await prisma.bem.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.bem.delete({
            where: { id: parseInt(id) }
        });
    }

    async getTotalPatrimonio() {
        const result = await prisma.bem.aggregate({
            _sum: { valor: true }
        });
        return result._sum.valor || 0;
    }
}

export default new BemModel();