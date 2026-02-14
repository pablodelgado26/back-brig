import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class LancamentoCaixaModel {
    // Buscar todos os lançamentos
    async findAll() {
        return await prisma.lancamentoCaixa.findMany({
            orderBy: { data: 'desc' }
        });
    }

    // Buscar lançamento por ID
    async findById(id) {
        return await prisma.lancamentoCaixa.findUnique({
            where: { id: parseInt(id) }
        });
    }

    // Buscar lançamentos por período
    async findByPeriod(dataInicio, dataFim) {
        return await prisma.lancamentoCaixa.findMany({
            where: {
                data: {
                    gte: new Date(dataInicio),
                    lte: new Date(dataFim)
                }
            },
            orderBy: { data: 'desc' }
        });
    }

    // Buscar lançamentos por tipo
    async findByTipo(tipo) {
        return await prisma.lancamentoCaixa.findMany({
            where: { tipo },
            orderBy: { data: 'desc' }
        });
    }

    // Criar novo lançamento
    async create(data) {
        return await prisma.lancamentoCaixa.create({
            data: {
                ...data,
                data: new Date(data.data)
            }
        });
    }

    // Atualizar lançamento
    async update(id, data) {
        if (data.data) {
            data.data = new Date(data.data);
        }
        
        return await prisma.lancamentoCaixa.update({
            where: { id: parseInt(id) },
            data
        });
    }

    // Deletar lançamento
    async delete(id) {
        return await prisma.lancamentoCaixa.delete({
            where: { id: parseInt(id) }
        });
    }

    // Obter totais por tipo
    async getTotals() {
        const entradas = await prisma.lancamentoCaixa.aggregate({
            where: { tipo: 'Entrada' },
            _sum: { valor: true }
        });

        const saidas = await prisma.lancamentoCaixa.aggregate({
            where: { tipo: 'Saída' },
            _sum: { valor: true }
        });

        const totalEntradas = entradas._sum.valor || 0;
        const totalSaidas = saidas._sum.valor || 0;
        const saldo = totalEntradas - totalSaidas;

        return {
            totalEntradas,
            totalSaidas,
            saldo
        };
    }

    // Obter resumo por categoria
    async getResumoByCategoria() {
        const resultado = await prisma.lancamentoCaixa.groupBy({
            by: ['categoria', 'tipo'],
            _sum: {
                valor: true
            },
            _count: {
                id: true
            }
        });

        return resultado;
    }
}

export default new LancamentoCaixaModel();