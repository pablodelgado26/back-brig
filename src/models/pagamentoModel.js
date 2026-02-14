import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PagamentoModel {
    async findAll() {
        return await prisma.pagamento.findMany({
            orderBy: { vencimento: 'asc' }
        });
    }

    async findById(id) {
        return await prisma.pagamento.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findByStatus(status) {
        return await prisma.pagamento.findMany({
            where: { status },
            orderBy: { vencimento: 'asc' }
        });
    }

    async create(data) {
        return await prisma.pagamento.create({
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
        if (data.dataPagamento) {
            data.dataPagamento = new Date(data.dataPagamento);
        }
        
        return await prisma.pagamento.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.pagamento.delete({
            where: { id: parseInt(id) }
        });
    }

    async getTotals() {
        const pendente = await prisma.pagamento.aggregate({
            where: { status: 'Pendente' },
            _sum: { valor: true },
            _count: { id: true }
        });

        const vencido = await prisma.pagamento.aggregate({
            where: { status: 'Vencido' },
            _sum: { valor: true },
            _count: { id: true }
        });

        const pago = await prisma.pagamento.aggregate({
            where: { status: 'Pago' },
            _sum: { valor: true },
            _count: { id: true }
        });

        return {
            pendente: { total: pendente._sum.valor || 0, count: pendente._count.id || 0 },
            vencido: { total: vencido._sum.valor || 0, count: vencido._count.id || 0 },
            pago: { total: pago._sum.valor || 0, count: pago._count.id || 0 }
        };
    }
}

export default new PagamentoModel();