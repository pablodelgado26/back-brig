import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando o seed...");

    // Limpar dados existentes
    await prisma.lancamentoTrabalhista.deleteMany();
    await prisma.lancamentoFiscal.deleteMany();
    await prisma.preco.deleteMany();
    await prisma.bem.deleteMany();
    await prisma.contrato.deleteMany();
    await prisma.documentoLicitacao.deleteMany();
    await prisma.funcionario.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.recebimento.deleteMany();
    await prisma.pagamento.deleteMany();
    await prisma.lancamentoCaixa.deleteMany();
    await prisma.faturamento.deleteMany();

    // Criar faturamentos
    console.log("Criando faturamentos...");
    const faturamentos = await prisma.faturamento.createMany({
        data: [
            {
                mes: "Janeiro",
                ano: "2025",
                receitaBruta: 25000,
                despesas: 4000,
                receitaLiquida: 21000,
                status: "Declarado"
            },
            {
                mes: "Fevereiro",
                ano: "2025",
                receitaBruta: 28000,
                despesas: 4500,
                receitaLiquida: 23500,
                status: "Declarado"
            },
            {
                mes: "Março",
                ano: "2025",
                receitaBruta: 32000,
                despesas: 5000,
                receitaLiquida: 27000,
                status: "Pendente"
            }
        ]
    });

    // Criar lançamentos de caixa
    console.log("Criando lançamentos de caixa...");
    const lancamentosCaixa = await prisma.lancamentoCaixa.createMany({
        data: [
            {
                data: new Date("2025-02-10"),
                tipo: "Entrada",
                descricao: "Venda de produtos - Cliente ABC",
                categoria: "Receita de Venda",
                valor: 1500,
                formaPagamento: "PIX"
            },
            {
                data: new Date("2025-02-11"),
                tipo: "Saída",
                descricao: "Compra de materiais",
                categoria: "Despesa Operacional",
                valor: 800,
                formaPagamento: "Débito"
            },
            {
                data: new Date("2025-02-12"),
                tipo: "Entrada",
                descricao: "Prestação de serviços",
                categoria: "Receita de Serviço",
                valor: 2500,
                formaPagamento: "Transferência"
            }
        ]
    });

    // Criar pagamentos
    console.log("Criando pagamentos...");
    const pagamentos = await prisma.pagamento.createMany({
        data: [
            {
                descricao: "Aluguel do estabelecimento",
                fornecedor: "Imobiliária ABC",
                vencimento: new Date("2025-02-20"),
                valor: 1500,
                status: "Pendente",
                categoria: "Fixo"
            },
            {
                descricao: "Energia elétrica",
                fornecedor: "Companhia de Energia",
                vencimento: new Date("2025-02-25"),
                valor: 350,
                status: "Pendente",
                categoria: "Fixo"
            },
            {
                descricao: "DAS MEI",
                fornecedor: "Receita Federal",
                vencimento: new Date("2025-02-20"),
                valor: 67,
                status: "Pendente",
                categoria: "Imposto"
            }
        ]
    });

    // Criar recebimentos
    console.log("Criando recebimentos...");
    const recebimentos = await prisma.recebimento.createMany({
        data: [
            {
                descricao: "Venda de produtos",
                cliente: "Cliente XYZ Ltda",
                vencimento: new Date("2025-02-18"),
                valor: 3500,
                status: "Pendente",
                notaFiscal: "NF-1234"
            },
            {
                descricao: "Prestação de serviços",
                cliente: "Empresa ABC",
                vencimento: new Date("2025-02-22"),
                valor: 2800,
                status: "Pendente",
                notaFiscal: "NF-1235"
            }
        ]
    });

    // Criar produtos
    console.log("Criando produtos...");
    const produtos = await prisma.produto.createMany({
        data: [
            {
                codigo: "P001",
                nome: "Produto A",
                categoria: "Revenda",
                quantidade: 150,
                estoqueMinimo: 50,
                unidade: "UN",
                valorUnitario: 25.00,
                valorTotal: 3750
            },
            {
                codigo: "P002",
                nome: "Produto B",
                categoria: "Revenda",
                quantidade: 35,
                estoqueMinimo: 40,
                unidade: "UN",
                valorUnitario: 18.50,
                valorTotal: 647.50
            },
            {
                codigo: "P003",
                nome: "Produto C",
                categoria: "Insumo",
                quantidade: 8,
                estoqueMinimo: 20,
                unidade: "UN",
                valorUnitario: 45.00,
                valorTotal: 360
            }
        ]
    });

    // Criar funcionário
    console.log("Criando funcionário...");
    const funcionario = await prisma.funcionario.create({
        data: {
            nome: "João da Silva",
            cpf: "123.456.789-00",
            cargo: "Auxiliar Administrativo",
            admissao: new Date("2024-01-15"),
            salario: 1500,
            status: "Ativo"
        }
    });

    // Criar bens
    console.log("Criando bens...");
    const bens = await prisma.bem.createMany({
        data: [
            {
                descricao: "Computador Dell",
                categoria: "Equipamento",
                dataAquisicao: new Date("2024-01-15"),
                valor: 3500,
                depreciacaoAnual: 20
            },
            {
                descricao: "Mesa de escritório",
                categoria: "Móvel",
                dataAquisicao: new Date("2024-02-20"),
                valor: 800,
                depreciacaoAnual: 10
            }
        ]
    });

    // Criar contratos
    console.log("Criando contratos...");
    const contratos = await prisma.contrato.createMany({
        data: [
            {
                tipo: "Fornecedor",
                parte: "Distribuidora XYZ",
                objeto: "Fornecimento de materiais",
                inicio: new Date("2024-01-15"),
                termino: new Date("2025-01-15"),
                valor: 50000,
                status: "Ativo"
            },
            {
                tipo: "Prestador",
                parte: "Contador ABC",
                objeto: "Serviços contábeis",
                inicio: new Date("2024-06-01"),
                termino: new Date("2025-06-01"),
                valor: 3600,
                status: "Ativo"
            }
        ]
    });

    // Criar documentos de licitação
    console.log("Criando documentos de licitação...");
    const documentos = await prisma.documentoLicitacao.createMany({
        data: [
            {
                tipo: "CND Federal",
                numero: "CND-2024-001",
                emissao: new Date("2024-10-15"),
                validade: new Date("2025-04-15"),
                status: "Válido"
            },
            {
                tipo: "CND Municipal",
                numero: "CND-MUN-2024-003",
                emissao: new Date("2024-08-10"),
                validade: new Date("2025-02-25"),
                status: "Vencendo"
            }
        ]
    });

    console.log("Seed concluído com sucesso!");
    console.log(`✅ Criados 3 faturamentos`);
    console.log(`✅ Criados 3 lançamentos de caixa`);
    console.log(`✅ Criados 3 pagamentos`);
    console.log(`✅ Criados 2 recebimentos`);
    console.log(`✅ Criados 3 produtos`);
    console.log(`✅ Criado 1 funcionário`);
    console.log(`✅ Criados 2 bens`);
    console.log(`✅ Criados 2 contratos`);
    console.log(`✅ Criados 2 documentos`);
}

main()
    .catch((e) => {
        console.error("Erro durante o seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });