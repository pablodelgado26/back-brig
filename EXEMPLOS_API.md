# Exemplos Práticos de Uso da API

## 🚀 Como Testar a API

### 1. Iniciar o Servidor
```bash
cd back-brig
npm run dev
```

### 2. Testar Conexão
**GET** `http://localhost:4001/`
```json
{
  "message": "🚀 Sistema MEI - API funcionando!",
  "timestamp": "2026-02-14T22:57:37.202Z",
  "modules": {
    "dashboard": "/dashboard",
    "faturamento": "/faturamento",
    "caixa": "/caixa",
    "pagamentos": "/pagamentos",
    "recebimentos": "/recebimentos",
    "produtos": "/produtos",
    "funcionarios": "/funcionarios",
    "bens": "/bens",
    "contratos": "/contratos",
    "documentos-licitacao": "/documentos-licitacao",
    "relatorios": "/relatorios"
  }
}
```

## 📊 **Exemplos por Módulo**

### 🏠 Dashboard
```bash
# Estatísticas gerais
curl http://localhost:4001/dashboard/stats

# Atividades recentes
curl http://localhost:4001/dashboard/recent-activities
```

### 💰 Faturamento
```bash
# Listar todos os faturamentos
curl http://localhost:4001/faturamento

# Criar novo faturamento
curl -X POST http://localhost:4001/faturamento \
  -H "Content-Type: application/json" \
  -d '{
    "mes": "Março",
    "ano": "2026",
    "receitaBruta": 5000.00,
    "despesas": 800.00
  }'

# Obter faturamento específico
curl http://localhost:4001/faturamento/1

# Estatísticas de faturamento
curl http://localhost:4001/faturamento/statistics
```

### 📚 Livro Caixa
```bash
# Listar lançamentos
curl http://localhost:4001/caixa

# Criar lançamento de entrada
curl -X POST http://localhost:4001/caixa \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2026-02-14T10:00:00.000Z",
    "tipo": "Entrada",
    "descricao": "Venda de produto",
    "categoria": "Receita",
    "valor": 150.00
  }'

# Criar lançamento de saída
curl -X POST http://localhost:4001/caixa \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2026-02-14T14:00:00.000Z",
    "tipo": "Saída",
    "descricao": "Compra de material",
    "categoria": "Despesa",
    "valor": 50.00
  }'

# Ver totais
curl http://localhost:4001/caixa/totals
```

### 💳 Pagamentos
```bash
# Listar pagamentos
curl http://localhost:4001/pagamentos

# Criar pagamento
curl -X POST http://localhost:4001/pagamentos \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Conta de luz",
    "valor": 150.00,
    "dataVencimento": "2026-02-25T00:00:00.000Z",
    "categoria": "Utilidades"
  }'

# Marcar como pago
curl -X PUT http://localhost:4001/pagamentos/1/pagar

# Filtrar por status
curl "http://localhost:4001/pagamentos?status=Pendente"
```

### 💵 Recebimentos
```bash
# Listar recebimentos
curl http://localhost:4001/recebimentos

# Criar recebimento
curl -X POST http://localhost:4001/recebimentos \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Serviço prestado - Cliente X",
    "valor": 800.00,
    "dataRecebimento": "2026-02-20T00:00:00.000Z",
    "categoria": "Serviços"
  }'

# Marcar como recebido
curl -X PUT http://localhost:4001/recebimentos/1/receber
```

### 📦 Produtos/Estoque
```bash
# Listar produtos
curl http://localhost:4001/produtos

# Criar produto
curl -X POST http://localhost:4001/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Smartphone XYZ",
    "descricao": "Smartphone Android 128GB",
    "preco": 899.99,
    "categoria": "Eletrônicos",
    "estoque": 10,
    "estoqueMinimo": 2
  }'

# Entrada de mercadoria
curl -X PUT http://localhost:4001/produtos/1/entrada \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 5
  }'

# Saída de mercadoria
curl -X PUT http://localhost:4001/produtos/1/saida \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 2
  }'

# Estatísticas do estoque
curl http://localhost:4001/produtos/statistics
```

### 👥 Funcionários
```bash
# Listar funcionários
curl http://localhost:4001/funcionarios

# Criar funcionário
curl -X POST http://localhost:4001/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cargo": "Vendedor",
    "salario": 2500.00,
    "dataContratacao": "2026-02-01T00:00:00.000Z",
    "cpf": "123.456.789-01",
    "telefone": "(11) 99999-9999",
    "email": "joao@empresa.com"
  }'
```

### 🏢 Bens Patrimoniais
```bash
# Listar bens
curl http://localhost:4001/bens

# Criar bem
curl -X POST http://localhost:4001/bens \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Notebook Dell",
    "categoria": "Equipamento",
    "valorAquisicao": 3500.00,
    "dataAquisicao": "2026-01-15T00:00:00.000Z",
    "vidaUtil": 60,
    "descricao": "Notebook para trabalho"
  }'
```

### 📄 Contratos
```bash
# Listar contratos
curl http://localhost:4001/contratos

# Criar contrato
curl -X POST http://localhost:4001/contratos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Contrato de Prestação de Serviços",
    "contratante": "Empresa ABC Ltda",
    "valor": 15000.00,
    "dataInicio": "2026-02-01T00:00:00.000Z",
    "dataFim": "2026-08-01T00:00:00.000Z",
    "descricao": "Desenvolvimento de sistema web"
  }'
```

### 📋 Licitação
```bash
# Listar documentos de licitação
curl http://localhost:4001/documentos-licitacao

# Criar documento
curl -X POST http://localhost:4001/documentos-licitacao \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Pregão Eletrônico 001/2026",
    "orgao": "Prefeitura Municipal",
    "valor": 50000.00,
    "dataAbertura": "2026-03-01T00:00:00.000Z",
    "prazoEntrega": "2026-03-30T00:00:00.000Z",
    "objeto": "Aquisição de equipamentos de informática"
  }'
```

### 📊 Relatórios
```bash
# Relatório financeiro geral
curl http://localhost:4001/relatorios/financeiro

# Relatório mensal (com filtros)
curl "http://localhost:4001/relatorios/mensal?mes=2&ano=2026"

# Relatório anual (com filtros)  
curl "http://localhost:4001/relatorios/anual?ano=2026"
```

## 🔧 **Usando com JavaScript/Fetch**

### Exemplo completo em JavaScript:
```javascript
const API_BASE = 'http://localhost:4001';

// Função helper para fazer requisições
async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Exemplos de uso:

// 1. Listar faturamentos
const faturamentos = await apiCall('/faturamento');
console.log('Faturamentos:', faturamentos);

// 2. Criar novo faturamento
const novoFaturamento = await apiCall('/faturamento', {
  method: 'POST',
  body: JSON.stringify({
    mes: 'Março',
    ano: '2026',
    receitaBruta: 5000.00,
    despesas: 800.00
  }),
});
console.log('Faturamento criado:', novoFaturamento);

// 3. Obter estatísticas do dashboard
const stats = await apiCall('/dashboard/stats');
console.log('Estatísticas:', stats);

// 4. Marcar pagamento como pago
await apiCall('/pagamentos/1/pagar', { method: 'PUT' });
console.log('Pagamento marcado como pago');

// 5. Entrada de mercadoria
await apiCall('/produtos/1/entrada', {
  method: 'PUT',
  body: JSON.stringify({ quantidade: 10 }),
});
console.log('Estoque atualizado');
```

## 🧪 **Testando com Extensão REST Client (VS Code)**

Instale a extensão "REST Client" no VS Code e crie um arquivo `.http`:

```http
### Testar conexão
GET http://localhost:4001

### Listar faturamentos
GET http://localhost:4001/faturamento

### Criar faturamento
POST http://localhost:4001/faturamento
Content-Type: application/json

{
  "mes": "Março",
  "ano": "2026",
  "receitaBruta": 5000.00,
  "despesas": 800.00
}

### Listar produtos
GET http://localhost:4001/produtos

### Estatísticas do dashboard
GET http://localhost:4001/dashboard/stats

### Totais do caixa
GET http://localhost:4001/caixa/totals
```

---

## 🎯 **Próximos Passos**

1. **Inicie o servidor**: `npm run dev`
2. **Teste as rotas**: Use os exemplos acima
3. **Conecte seu frontend**: Use os exemplos JavaScript
4. **Desenvolva**: Adicione suas funcionalidades personalizadas!

**Seu sistema MEI está 100% funcional e pronto para uso! 🚀**