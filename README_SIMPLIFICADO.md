# Sistema MEI - Backend Simplificado

Backend simplificado para sistema de gestão MEI (Microempreendedor Individual) sem autenticação.

## 🚀 **Sistema Pronto e Funcionando!** 

✅ Backend completo **SEM autenticação**  
✅ Todas as funcionalidades principais implementadas  
✅ Banco de dados configurado e populado  
✅ API REST completa  

## 📋 Funcionalidades

### 📊 Dashboard
- **GET** `/dashboard/stats` - Estatísticas gerais
- **GET** `/dashboard/recent-activities` - Atividades recentes

### 💰 Faturamento
- **GET** `/faturamento` - Listar faturamentos
- **GET** `/faturamento/statistics` - Estatísticas de faturamento
- **GET** `/faturamento/:id` - Obter faturamento específico
- **POST** `/faturamento` - Criar novo faturamento
- **PUT** `/faturamento/:id` - Atualizar faturamento
- **DELETE** `/faturamento/:id` - Deletar faturamento

### 📚 Livro Caixa
- **GET** `/caixa` - Listar lançamentos
- **GET** `/caixa/totals` - Totais de entrada/saída
- **GET** `/caixa/statistics` - Estatísticas do caixa
- **POST** `/caixa` - Criar lançamento
- **PUT** `/caixa/:id` - Atualizar lançamento
- **DELETE** `/caixa/:id` - Deletar lançamento

### 💳 Pagamentos
- **GET** `/pagamentos` - Listar pagamentos
- **GET** `/pagamentos/statistics` - Estatísticas de pagamentos
- **POST** `/pagamentos` - Criar pagamento
- **PUT** `/pagamentos/:id/pagar` - Marcar como pago
- **PUT** `/pagamentos/:id` - Atualizar pagamento
- **DELETE** `/pagamentos/:id` - Deletar pagamento

### 💵 Recebimentos
- **GET** `/recebimentos` - Listar recebimentos
- **GET** `/recebimentos/statistics` - Estatísticas de recebimentos
- **POST** `/recebimentos` - Criar recebimento
- **PUT** `/recebimentos/:id/receber` - Marcar como recebido
- **PUT** `/recebimentos/:id` - Atualizar recebimento
- **DELETE** `/recebimentos/:id` - Deletar recebimento

### 📦 Produtos/Estoque
- **GET** `/produtos` - Listar produtos
- **GET** `/produtos/statistics` - Estatísticas do estoque
- **POST** `/produtos` - Criar produto
- **PUT** `/produtos/:id/entrada` - Entrada de mercadoria
- **PUT** `/produtos/:id/saida` - Saída de mercadoria
- **PUT** `/produtos/:id` - Atualizar produto
- **DELETE** `/produtos/:id` - Deletar produto

### 👥 Funcionários
- **GET** `/funcionarios` - Listar funcionários
- **GET** `/funcionarios/statistics` - Estatísticas de pessoal
- **POST** `/funcionarios` - Criar funcionário
- **PUT** `/funcionarios/:id` - Atualizar funcionário
- **DELETE** `/funcionarios/:id` - Deletar funcionário

### 🏢 Bens Patrimoniais
- **GET** `/bens` - Listar bens
- **GET** `/bens/statistics` - Estatísticas patrimoniais
- **POST** `/bens` - Criar bem
- **PUT** `/bens/:id` - Atualizar bem
- **DELETE** `/bens/:id` - Deletar bem

### 📄 Contratos
- **GET** `/contratos` - Listar contratos
- **GET** `/contratos/statistics` - Estatísticas de contratos
- **POST** `/contratos` - Criar contrato
- **PUT** `/contratos/:id` - Atualizar contrato
- **DELETE** `/contratos/:id` - Deletar contrato

### 📋 Licitação
- **GET** `/documentos-licitacao` - Listar documentos
- **GET** `/documentos-licitacao/statistics` - Estatísticas de licitação
- **POST** `/documentos-licitacao` - Criar documento
- **PUT** `/documentos-licitacao/:id` - Atualizar documento
- **DELETE** `/documentos-licitacao/:id` - Deletar documento

### 📊 Relatórios
- **GET** `/relatorios/financeiro` - Relatório financeiro
- **GET** `/relatorios/mensal` - Relatório mensal
- **GET** `/relatorios/anual` - Relatório anual

## 🛠️ Instalação e Uso

### 1. Instalar dependências
```bash
cd back-brig
npm install
```

### 2. Configurar banco de dados
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 3. Popular com dados de teste
```bash
npm run prisma:seed
```

### 4. Iniciar servidor
```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:4001**

## 📁 Estrutura do Projeto

```
back-brig/
├── src/
│   ├── controllers/     # Lógica de negócio
│   ├── models/         # Acesso aos dados
│   ├── routes/         # Definição das rotas
│   └── server.js       # Servidor principal
├── prisma/
│   ├── schema.prisma   # Esquema do banco
│   └── seed/           # Dados de exemplo
└── package.json        # Dependências
```

## 🎯 **Principais Mudanças**

### ❌ **Removido:**
- Sistema de autenticação (JWT, login, cadastro)
- Middleware de autenticação
- Modelo de usuário
- Dependências: bcryptjs, jsonwebtoken

### ✅ **Mantido:**
- Todas as funcionalidades de negócio
- Sistema completo de CRUD para todos os módulos
- Banco de dados com dados de exemplo
- API REST completa

## 🌐 **Integração com Frontend**

### Exemplo de uso básico:
```javascript
// Não precisa mais de autenticação!
const getFaturamentos = async () => {
  const response = await fetch('http://localhost:4001/faturamento');
  return response.json();
};

// Criar faturamento
const createFaturamento = async (data) => {
  const response = await fetch('http://localhost:4001/faturamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

## 🔧 **Comandos Úteis**

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Banco de dados
npm run prisma:generate    # Gerar cliente Prisma
npm run prisma:migrate     # Aplicar migrações
npm run prisma:seed        # Popular com dados de teste

# Reset do banco (se necessário)
npx prisma db push --force-reset
npm run prisma:seed
```

## 📊 **Dados de Exemplo Incluídos**

O sistema já vem com dados de exemplo:
- ✅ 3 faturamentos de exemplo
- ✅ 3 lançamentos de caixa
- ✅ 3 pagamentos
- ✅ 2 recebimentos
- ✅ 3 produtos
- ✅ 1 funcionário
- ✅ 2 bens patrimoniais
- ✅ 2 contratos
- ✅ 2 documentos de licitação

---

## 🎉 **Sistema Pronto para Uso!**

Seu backend MEI está **100% funcional** sem complexidade de autenticação.
Conecte seu frontend Next.js e comece a desenvolver! 🚀