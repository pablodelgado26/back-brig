import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class FaturamentoModel {
    // Buscar todos os faturamentos
    async findAll() {
        return await prisma.faturamento.findMany({
            orderBy: [
                { ano: 'desc' },
                { mes: 'desc' }
            ]
        });
    }

    // Buscar faturamento por ID
    async findById(id) {
        return await prisma.faturamento.findUnique({
            where: { id: parseInt(id) }
        });
    }

    // Buscar faturamento por mês e ano
    async findByPeriodo(mes, ano) {
        return await prisma.faturamento.findUnique({
            where: { 
                mes_ano: {
                    mes,
                    ano
                }
            }
        });
    }

    // Criar novo faturamento
    async create(data) {
        const receitaLiquida = data.receitaBruta - (data.despesas || 0);
        
        return await prisma.faturamento.create({
            data: {
                ...data,
                receitaLiquida
            }
        });
    }

    // Atualizar faturamento
    async update(id, data) {
        if (data.receitaBruta || data.despesas) {
            const current = await this.findById(id);
            const receitaBruta = data.receitaBruta || current.receitaBruta;
            const despesas = data.despesas || current.despesas;
            data.receitaLiquida = receitaBruta - despesas;
        }

        return await prisma.faturamento.update({
            where: { id: parseInt(id) },
            data
        });
    }

    // Deletar faturamento
    async delete(id) {
        return await prisma.faturamento.delete({
            where: { id: parseInt(id) }
        });
    }

    // Obter estatísticas do faturamento
    async getStatistics() {
        const result = await prisma.faturamento.aggregate({
            _sum: {
                receitaBruta: true,
                despesas: true,
                receitaLiquida: true
            },
            _count: {
                id: true
            }
        });

        return {
            totalReceitaBruta: result._sum.receitaBruta || 0,
            totalDespesas: result._sum.despesas || 0,
            totalReceitaLiquida: result._sum.receitaLiquida || 0,
            totalDeclaracoes: result._count.id || 0
        };
    }
}

export default new FaturamentoModel();