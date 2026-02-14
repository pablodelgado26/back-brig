import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DocumentoLicitacaoModel {
    async findAll() {
        return await prisma.documentoLicitacao.findMany({
            orderBy: { validade: 'asc' }
        });
    }

    async findById(id) {
        return await prisma.documentoLicitacao.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findByStatus(status) {
        return await prisma.documentoLicitacao.findMany({
            where: { status },
            orderBy: { validade: 'asc' }
        });
    }

    async create(data) {
        return await prisma.documentoLicitacao.create({
            data: {
                ...data,
                emissao: new Date(data.emissao),
                validade: new Date(data.validade)
            }
        });
    }

    async update(id, data) {
        if (data.emissao) {
            data.emissao = new Date(data.emissao);
        }
        if (data.validade) {
            data.validade = new Date(data.validade);
        }
        
        return await prisma.documentoLicitacao.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.documentoLicitacao.delete({
            where: { id: parseInt(id) }
        });
    }

    async getStatusCount() {
        const counts = await prisma.documentoLicitacao.groupBy({
            by: ['status'],
            _count: { id: true }
        });
        
        const result = {
            'Válido': 0,
            'Vencendo': 0,
            'Vencido': 0
        };
        
        counts.forEach(item => {
            result[item.status] = item._count.id;
        });
        
        return result;
    }
}

export default new DocumentoLicitacaoModel();