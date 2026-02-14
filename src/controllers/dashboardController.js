import FaturamentoModel from "../models/faturamentoModel.js";
import LancamentoCaixaModel from "../models/lancamentoCaixaModel.js";
import PagamentoModel from "../models/pagamentoModel.js";
import RecebimentoModel from "../models/recebimentoModel.js";
import ProdutoModel from "../models/produtoModel.js";

class DashboardController {
    // Obter dados gerais do dashboard
    async stats(req, res) {
        try {
            // Faturamento
            const faturamentoStats = await FaturamentoModel.getStatistics();
            
            // Caixa
            const caixaTotals = await LancamentoCaixaModel.getTotals();
            
            // Pagamentos
            const pagamentoTotals = await PagamentoModel.getTotals();
            
            // Recebimentos
            const recebimentoTotals = await RecebimentoModel.getTotals();
            
            // Produtos
            const produtoStats = await ProdutoModel.getStatistics();

            // Atividades recentes (últimos 10 lançamentos)
            const atividadesRecentes = await LancamentoCaixaModel.findAll();
            const recentActivities = atividadesRecentes.slice(0, 10).map(item => ({
                type: item.tipo === 'Entrada' ? 'Recebimento' : 'Pagamento',
                description: item.descricao,
                value: new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                }).format(item.valor),
                date: new Date(item.data).toLocaleDateString('pt-BR')
            }));

            const dashboardData = {
                // Cards principais
                stats: [
                    {
                        title: 'Faturamento Mensal',
                        value: new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                        }).format(faturamentoStats.totalReceitaLiquida / Math.max(faturamentoStats.totalDeclaracoes, 1)),
                        change: '+12.5%',
                        trend: 'up'
                    },
                    {
                        title: 'Contas a Receber',
                        value: new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                        }).format(recebimentoTotals.pendente.total),
                        change: `${recebimentoTotals.pendente.count} pendentes`,
                        trend: 'neutral'
                    },
                    {
                        title: 'Contas a Pagar',
                        value: new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                        }).format(pagamentoTotals.pendente.total),
                        change: `${pagamentoTotals.pendente.count} pendentes`,
                        trend: pagamentoTotals.vencido.count > 0 ? 'down' : 'neutral'
                    },
                    {
                        title: 'Produtos em Estoque',
                        value: produtoStats.totalItens.toString(),
                        change: `${produtoStats.estoquesBaixos} itens baixos`,
                        trend: produtoStats.estoquesBaixos > 5 ? 'down' : 'neutral'
                    }
                ],
                
                // Saldo do caixa
                saldoCaixa: caixaTotals.saldo,
                
                // Resumo financeiro
                resumoFinanceiro: {
                    totalReceitaBruta: faturamentoStats.totalReceitaBruta,
                    totalDespesas: faturamentoStats.totalDespesas,
                    receitaLiquida: faturamentoStats.totalReceitaLiquida,
                    contasPagar: pagamentoTotals.pendente.total,
                    contasReceber: recebimentoTotals.pendente.total
                },
                
                // Alertas
                alertas: [
                    ...(pagamentoTotals.vencido.count > 0 ? [{
                        tipo: 'warning',
                        mensagem: `${pagamentoTotals.vencido.count} contas vencidas`,
                        valor: pagamentoTotals.vencido.total
                    }] : []),
                    ...(produtoStats.estoquesBaixos > 0 ? [{
                        tipo: 'info',
                        mensagem: `${produtoStats.estoquesBaixos} produtos com estoque baixo`
                    }] : []),
                    {
                        tipo: 'info',
                        mensagem: 'DAS MEI vence em 15 dias'
                    }
                ],
                
                // Atividades recentes
                recentActivities
            };

            res.json(dashboardData);
        } catch (error) {
            console.error("Erro ao obter dados do dashboard:", error);
            res.status(500).json({ error: "Erro ao obter dados do dashboard" });
        }
    }

    // Obter resumo mensal
    async resumoMensal(req, res) {
        try {
            const { mes, ano } = req.query;
            
            if (!mes || !ano) {
                return res.status(400).json({ error: "Mês e ano são obrigatórios" });
            }

            // Buscar faturamento do período
            const faturamento = await FaturamentoModel.findByPeriodo(mes, ano);
            
            // Buscar lançamentos do período (primeiro e último dia do mês)
            const dataInicio = new Date(parseInt(ano), parseInt(mes) - 1, 1);
            const dataFim = new Date(parseInt(ano), parseInt(mes), 0);
            
            const lancamentos = await LancamentoCaixaModel.findByPeriod(
                dataInicio.toISOString().split('T')[0],
                dataFim.toISOString().split('T')[0]
            );

            const resumo = {
                faturamento: faturamento || null,
                totalLancamentos: lancamentos.length,
                entradas: lancamentos.filter(l => l.tipo === 'Entrada').reduce((sum, l) => sum + l.valor, 0),
                saidas: lancamentos.filter(l => l.tipo === 'Saída').reduce((sum, l) => sum + l.valor, 0)
            };

            res.json(resumo);
        } catch (error) {
            console.error("Erro ao obter resumo mensal:", error);
            res.status(500).json({ error: "Erro ao obter resumo mensal" });
        }
    }
}

export default new DashboardController();