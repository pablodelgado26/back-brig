import FaturamentoModel from "../models/faturamentoModel.js";
import LancamentoCaixaModel from "../models/lancamentoCaixaModel.js";
import PagamentoModel from "../models/pagamentoModel.js";
import RecebimentoModel from "../models/recebimentoModel.js";
import ProdutoModel from "../models/produtoModel.js";
import FuncionarioModel from "../models/funcionarioModel.js";
import ContratoModel from "../models/contratoModel.js";

class RelatorioController {
    // Relatório de faturamento mensal
    async faturamentoMensal(req, res) {
        try {
            const faturamentos = await FaturamentoModel.findAll();
            
            const relatorio = {
                titulo: 'Relatório de Faturamento Mensal',
                data: new Date().toLocaleDateString('pt-BR'),
                dados: faturamentos.map(f => ({
                    periodo: `${f.mes}/${f.ano}`,
                    receitaBruta: f.receitaBruta,
                    despesas: f.despesas,
                    receitaLiquida: f.receitaLiquida,
                    status: f.status
                }))
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de faturamento:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de faturamento" });
        }
    }

    // Relatório de fluxo de caixa
    async fluxoCaixa(req, res) {
        try {
            const { dataInicio, dataFim } = req.query;
            
            let lancamentos;
            if (dataInicio && dataFim) {
                lancamentos = await LancamentoCaixaModel.findByPeriod(dataInicio, dataFim);
            } else {
                lancamentos = await LancamentoCaixaModel.findAll();
            }
            
            const totals = await LancamentoCaixaModel.getTotals();
            
            const relatorio = {
                titulo: 'Relatório de Fluxo de Caixa',
                periodo: dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : 'Todos os períodos',
                data: new Date().toLocaleDateString('pt-BR'),
                resumo: {
                    totalEntradas: totals.totalEntradas,
                    totalSaidas: totals.totalSaidas,
                    saldo: totals.saldo
                },
                detalhes: lancamentos.map(l => ({
                    data: new Date(l.data).toLocaleDateString('pt-BR'),
                    tipo: l.tipo,
                    descricao: l.descricao,
                    categoria: l.categoria,
                    valor: l.valor,
                    formaPagamento: l.formaPagamento
                }))
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de fluxo de caixa:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de fluxo de caixa" });
        }
    }

    // Relatório de contas a pagar/receber
    async contasPagarReceber(req, res) {
        try {
            const pagamentos = await PagamentoModel.findAll();
            const recebimentos = await RecebimentoModel.findAll();
            
            const relatorio = {
                titulo: 'Relatório de Contas a Pagar e Receber',
                data: new Date().toLocaleDateString('pt-BR'),
                contasPagar: {
                    total: pagamentos.length,
                    pendentes: pagamentos.filter(p => p.status === 'Pendente').length,
                    pagas: pagamentos.filter(p => p.status === 'Pago').length,
                    vencidas: pagamentos.filter(p => p.status === 'Vencido').length,
                    dados: pagamentos.map(p => ({
                        descricao: p.descricao,
                        fornecedor: p.fornecedor,
                        vencimento: new Date(p.vencimento).toLocaleDateString('pt-BR'),
                        valor: p.valor,
                        status: p.status
                    }))
                },
                contasReceber: {
                    total: recebimentos.length,
                    pendentes: recebimentos.filter(r => r.status === 'Pendente').length,
                    recebidas: recebimentos.filter(r => r.status === 'Recebido').length,
                    dados: recebimentos.map(r => ({
                        descricao: r.descricao,
                        cliente: r.cliente,
                        vencimento: new Date(r.vencimento).toLocaleDateString('pt-BR'),
                        valor: r.valor,
                        status: r.status,
                        notaFiscal: r.notaFiscal
                    }))
                }
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de contas:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de contas" });
        }
    }

    // Relatório de estoque
    async estoque(req, res) {
        try {
            const produtos = await ProdutoModel.findAll();
            const statistics = await ProdutoModel.getStatistics();
            
            const relatorio = {
                titulo: 'Relatório de Controle de Estoque',
                data: new Date().toLocaleDateString('pt-BR'),
                resumo: {
                    totalProdutos: statistics.totalProdutos,
                    totalItens: statistics.totalItens,
                    totalValor: statistics.totalValor,
                    estoquesBaixos: statistics.estoquesBaixos
                },
                produtos: produtos.map(p => ({
                    codigo: p.codigo,
                    nome: p.nome,
                    categoria: p.categoria,
                    quantidade: p.quantidade,
                    estoqueMinimo: p.estoqueMinimo,
                    valorUnitario: p.valorUnitario,
                    valorTotal: p.valorTotal,
                    status: p.quantidade < p.estoqueMinimo ? 'Estoque Baixo' : 'Normal'
                }))
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de estoque:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de estoque" });
        }
    }

    // Relatório de funcionários
    async funcionarios(req, res) {
        try {
            const funcionarios = await FuncionarioModel.findAll();
            
            const relatorio = {
                titulo: 'Relatório de Funcionários',
                data: new Date().toLocaleDateString('pt-BR'),
                totalFuncionarios: funcionarios.length,
                funcionariosAtivos: funcionarios.filter(f => f.status === 'Ativo').length,
                totalFolha: funcionarios.reduce((sum, f) => sum + f.salario, 0),
                funcionarios: funcionarios.map(f => ({
                    nome: f.nome,
                    cpf: f.cpf,
                    cargo: f.cargo,
                    admissao: new Date(f.admissao).toLocaleDateString('pt-BR'),
                    salario: f.salario,
                    status: f.status
                }))
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de funcionários:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de funcionários" });
        }
    }

    // Relatório de contratos
    async contratos(req, res) {
        try {
            const contratos = await ContratoModel.findAll();
            
            const relatorio = {
                titulo: 'Relatório de Contratos',
                data: new Date().toLocaleDateString('pt-BR'),
                totalContratos: contratos.length,
                contratosAtivos: contratos.filter(c => c.status === 'Ativo').length,
                valorTotal: contratos.reduce((sum, c) => sum + c.valor, 0),
                contratos: contratos.map(c => ({
                    tipo: c.tipo,
                    parte: c.parte,
                    objeto: c.objeto,
                    inicio: new Date(c.inicio).toLocaleDateString('pt-BR'),
                    termino: new Date(c.termino).toLocaleDateString('pt-BR'),
                    valor: c.valor,
                    status: c.status
                }))
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar relatório de contratos:", error);
            res.status(500).json({ error: "Erro ao gerar relatório de contratos" });
        }
    }

    // DRE Simplificado
    async dreSimplifcado(req, res) {
        try {
            const { mes, ano } = req.query;
            
            // Se não especificar período, pega o ano atual
            const anoFiltro = ano || new Date().getFullYear().toString();
            
            let faturamentos;
            if (mes && ano) {
                faturamentos = [await FaturamentoModel.findByPeriodo(mes, ano)].filter(Boolean);
            } else {
                faturamentos = await FaturamentoModel.findAll();
                faturamentos = faturamentos.filter(f => f.ano === anoFiltro);
            }
            
            const totalReceitas = faturamentos.reduce((sum, f) => sum + f.receitaBruta, 0);
            const totalDespesas = faturamentos.reduce((sum, f) => sum + f.despesas, 0);
            const resultado = totalReceitas - totalDespesas;
            
            const relatorio = {
                titulo: 'DRE - Demonstração do Resultado do Exercício (Simplificado)',
                periodo: mes && ano ? `${mes}/${ano}` : `Ano ${anoFiltro}`,
                data: new Date().toLocaleDateString('pt-BR'),
                receitas: {
                    receitaBruta: totalReceitas,
                    deducoes: 0, // Para MEI, geralmente não há deduções significativas
                    receitaLiquida: totalReceitas
                },
                despesas: {
                    operacionais: totalDespesas,
                    administrativas: 0, // Poderia ser separado se necessário
                    total: totalDespesas
                },
                resultado: {
                    lucroLiquido: resultado,
                    margemLucro: totalReceitas > 0 ? (resultado / totalReceitas) * 100 : 0
                }
            };
            
            res.json(relatorio);
        } catch (error) {
            console.error("Erro ao gerar DRE:", error);
            res.status(500).json({ error: "Erro ao gerar DRE" });
        }
    }
}

export default new RelatorioController();