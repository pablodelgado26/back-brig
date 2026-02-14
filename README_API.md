# Sistema de Gestão MEI - Backend API

API completa para sistema de gestão de Microempreendedor Individual (MEI) com todas as funcionalidades necessárias para gerenciar um negócio MEI.

## 🚀 Funcionalidades Implementadas

### ✅ Módulos Principais

1. **Dashboard** - Visão geral e estatísticas
2. **Faturamento** - Declarações mensais de faturamento
3. **Livro Caixa** - Controle de entradas e saídas
4. **Pagamentos** - Contas a pagar
5. **Recebimentos** - Contas a receber
6. **Estoque** - Controle de produtos
7. **Licitação** - Gestão de documentos (CND, procurações)
8. **Pessoal** - Funcionários e folha de pagamento
9. **Bens** - Controle patrimonial
10. **Preços** - Gestão de preços e margens
11. **Contratos** - Controle de contratos
12. **Relatórios** - Diversos relatórios fiscais e gerenciais

## 📦 Instalação e Configuração

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar banco de dados:**
```bash
npx prisma migrate dev
npx prisma generate
```

3. **Iniciar servidor:**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:4001`

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

## 📚 API Endpoints

### Autenticação
```
POST /auth/register - Registrar usuário
POST /auth/login - Login
GET /auth/users - Listar usuários
```

### Dashboard
```
GET /dashboard/stats - Estatísticas gerais
GET /dashboard/resumo-mensal - Resumo do mês
```

### Faturamento
```
GET /faturamento - Listar faturamentos
POST /faturamento - Criar faturamento
GET /faturamento/:id - Buscar por ID
PUT /faturamento/:id - Atualizar
DELETE /faturamento/:id - Deletar
GET /faturamento/statistics - Estatísticas
```

### Livro Caixa
```
GET /caixa - Listar lançamentos
POST /caixa - Criar lançamento
GET /caixa/:id - Buscar por ID
PUT /caixa/:id - Atualizar
DELETE /caixa/:id - Deletar
GET /caixa/totals - Totais (entradas/saídas/saldo)
GET /caixa/resumo-categoria - Resumo por categoria
```

### Pagamentos
```
GET /pagamentos - Listar pagamentos
POST /pagamentos - Criar pagamento
GET /pagamentos/:id - Buscar por ID
PUT /pagamentos/:id - Atualizar
DELETE /pagamentos/:id - Deletar
PUT /pagamentos/:id/pagar - Marcar como pago
GET /pagamentos/totals - Totais por status
```

### Recebimentos
```
GET /recebimentos - Listar recebimentos
POST /recebimentos - Criar recebimento
GET /recebimentos/:id - Buscar por ID
PUT /recebimentos/:id - Atualizar
DELETE /recebimentos/:id - Deletar
PUT /recebimentos/:id/receber - Marcar como recebido
GET /recebimentos/totals - Totais por status
```

### Produtos/Estoque
```
GET /produtos - Listar produtos
POST /produtos - Criar produto
GET /produtos/:id - Buscar por ID
PUT /produtos/:id - Atualizar
DELETE /produtos/:id - Deletar
PUT /produtos/:id/entrada - Registrar entrada de mercadoria
GET /produtos/statistics - Estatísticas do estoque
```

### Funcionários
```
GET /funcionarios - Listar funcionários
POST /funcionarios - Criar funcionário
GET /funcionarios/:id - Buscar por ID
PUT /funcionarios/:id - Atualizar
DELETE /funcionarios/:id - Deletar
```

### Bens Patrimoniais
```
GET /bens - Listar bens
POST /bens - Criar bem
GET /bens/:id - Buscar por ID
PUT /bens/:id - Atualizar
DELETE /bens/:id - Deletar
GET /bens/total-patrimonio - Total do patrimônio
```

### Contratos
```
GET /contratos - Listar contratos
POST /contratos - Criar contrato
GET /contratos/:id - Buscar por ID
PUT /contratos/:id - Atualizar
DELETE /contratos/:id - Deletar
```

### Documentos de Licitação
```
GET /documentos-licitacao - Listar documentos
POST /documentos-licitacao - Criar documento
GET /documentos-licitacao/:id - Buscar por ID
PUT /documentos-licitacao/:id - Atualizar
DELETE /documentos-licitacao/:id - Deletar
GET /documentos-licitacao/status-count - Contagem por status
```

### Relatórios
```
GET /relatorios/faturamento - Relatório de faturamento
GET /relatorios/fluxo-caixa - Relatório de fluxo de caixa
GET /relatorios/contas - Relatório de contas a pagar/receber
GET /relatorios/estoque - Relatório de estoque
GET /relatorios/funcionarios - Relatório de funcionários
GET /relatorios/contratos - Relatório de contratos
GET /relatorios/dre - DRE Simplificado
```

## 🔑 Autenticação

Todas as rotas (exceto `/auth/register` e `/auth/login`) requerem autenticação via JWT. Inclua o token no header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:
- `users` - Usuários do sistema
- `faturamentos` - Declarações de faturamento mensal
- `lancamentos_caixa` - Lançamentos do livro caixa
- `pagamentos` - Contas a pagar
- `recebimentos` - Contas a receber
- `produtos` - Produtos em estoque
- `funcionarios` - Dados dos funcionários
- `bens` - Bens patrimoniais
- `contratos` - Contratos diversos
- `documentos_licitacao` - CNDs e documentos
- `precos` - Controle de preços
- `lancamentos_fiscais` - Lançamentos fiscais
- `lancamentos_trabalhistas` - Lançamentos trabalhistas
- `cadastros_gerais` - Cadastros diversos

## 🎯 Exemplos de Uso

### Criar um lançamento no caixa:
```json
POST /caixa
{
  "data": "2025-12-01",
  "tipo": "Entrada",
  "descricao": "Venda de produtos",
  "categoria": "Receita de Venda",
  "valor": 1500.00,
  "formaPagamento": "PIX"
}
```

### Criar um produto:
```json
POST /produtos
{
  "codigo": "P001",
  "nome": "Produto A",
  "categoria": "Revenda",
  "quantidade": 100,
  "estoqueMinimo": 20,
  "unidade": "UN",
  "valorUnitario": 25.00
}
```

### Obter estatísticas do dashboard:
```json
GET /dashboard/stats
Response:
{
  "stats": [...],
  "saldoCaixa": 5000.00,
  "resumoFinanceiro": {...},
  "alertas": [...],
  "recentActivities": [...]
}
```

## 🚧 Features Implementadas

✅ Sistema completo de autenticação JWT  
✅ CRUD completo para todos os módulos  
✅ Dashboard com estatísticas em tempo real  
✅ Controle de estoque com alertas  
✅ Gestão financeira completa  
✅ Sistema de relatórios  
✅ Validação de dados  
✅ Relacionamentos entre entidades  
✅ Middleware de autenticação  
✅ Estrutura MVC organizada  

## 🔧 Configuração de Ambiente

Edite o arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=4001
```

## 📱 Integração com Frontend

Este backend foi desenvolvido especificamente para integrar com o frontend React/Next.js do sistema MEI. Todas as rotas seguem padrões REST e retornam dados no formato esperado pelo frontend.

Para conectar o frontend, configure a URL base da API:
```javascript
const API_BASE_URL = 'http://localhost:4001';
```

## 🎉 Status do Projeto

✅ **COMPLETO** - Backend totalmente funcional com todas as funcionalidades necessárias para o sistema de gestão MEI!

O sistema está pronto para uso com todas as funcionalidades implementadas conforme as necessidades identificadas no frontend.