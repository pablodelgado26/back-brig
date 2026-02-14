import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ContratoModel {
    async findAll() {
        return await prisma.contrato.findMany({
            orderBy: { inicio: 'desc' }
        });
    }

    async findById(id) {
        return await prisma.contrato.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findByTipo(tipo) {
        return await prisma.contrato.findMany({
            where: { tipo },
            orderBy: { inicio: 'desc' }
        });
    }

    async create(data) {
        return await prisma.contrato.create({
            data: {
                ...data,
                inicio: new Date(data.inicio),
                termino: new Date(data.termino)
            }
        });
    }

    async update(id, data) {
        if (data.inicio) {
            data.inicio = new Date(data.inicio);
        }
        if (data.termino) {
            data.termino = new Date(data.termino);
        }
        
        return await prisma.contrato.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await prisma.contrato.delete({
            where: { id: parseInt(id) }
        });
    }
}

export default new ContratoModel();