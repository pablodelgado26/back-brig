import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class RecebimentoModel {
    async findAll() {
        return await prisma.recebimento.findMany({
            orderBy: { vencimento: 'asc' }
        });
    }

    async findById(id) {
        return await prisma.recebimento.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findByStatus(status) {
        return await prisma.recebimento.findMany({
            where: { status },
            orderBy: { vencimento: 'asc' }
        });
    }

    async create(data) {
        return await prisma.recebimento.create({
            data: {
                ...data,
                vencimento: new Date(data.vencimento)
            }
        });
    }

    async update(id, data) {
        if (data.vencimento) {
            data.vencimento = new Date(data.vencimento);
        }
        if (data.dataRecebimento) {
            data.dataRecebimento = new Date(data.dataRecebimento);
        }
        
        return await prisma.recebimento.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.recebimento.delete({
            where: { id: parseInt(id) }
        });
    }

    async getTotals() {
        const pendente = await prisma.recebimento.aggregate({
            where: { status: 'Pendente' },
            _sum: { valor: true },
            _count: { id: true }
        });

        const recebido = await prisma.recebimento.aggregate({
            where: { status: 'Recebido' },
            _sum: { valor: true },
            _count: { id: true }
        });

        return {
            pendente: { total: pendente._sum.valor || 0, count: pendente._count.id || 0 },
            recebido: { total: recebido._sum.valor || 0, count: recebido._count.id || 0 }
        };
    }
}

export default new RecebimentoModel();