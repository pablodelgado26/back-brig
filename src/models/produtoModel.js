import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProdutoModel {
    async findAll() {
        return await prisma.produto.findMany({
            orderBy: { nome: 'asc' },
            include: {
                Preco: true
            }
        });
    }

    async findById(id) {
        return await prisma.produto.findUnique({
            where: { id: parseInt(id) },
            include: {
                Preco: true
            }
        });
    }

    async findByCodigo(codigo) {
        return await prisma.produto.findUnique({
            where: { codigo },
            include: {
                Preco: true
            }
        });
    }

    async create(data) {
        const valorTotal = (data.quantidade || 0) * (data.valorUnitario || 0);
        
        return await prisma.produto.create({
            data: {
                ...data,
                valorTotal
            }
        });
    }

    async update(id, data) {
        if (data.quantidade !== undefined || data.valorUnitario !== undefined) {
            const current = await this.findById(id);
            const quantidade = data.quantidade !== undefined ? data.quantidade : current.quantidade;
            const valorUnitario = data.valorUnitario !== undefined ? data.valorUnitario : current.valorUnitario;
            data.valorTotal = quantidade * valorUnitario;
        }
        
        return await prisma.produto.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.produto.delete({
            where: { id: parseInt(id) }
        });
    }

    async getStatistics() {
        const total = await prisma.produto.aggregate({
            _sum: {
                quantidade: true,
                valorTotal: true
            },
            _count: {
                id: true
            }
        });

        const estoquesBaixos = await prisma.produto.count({
            where: {
                quantidade: {
                    lt: prisma.produto.fields.estoqueMinimo
                }
            }
        });

        return {
            totalItens: total._sum.quantidade || 0,
            totalValor: total._sum.valorTotal || 0,
            totalProdutos: total._count.id || 0,
            estoquesBaixos
        };
    }
}

export default new ProdutoModel();