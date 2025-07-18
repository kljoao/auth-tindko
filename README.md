# 🔐 Sistema de Autenticação Multi-Tenant - Node.js, Express, TypeScript & Prisma

Um sistema de autenticação robusto, seguro e escalável para aplicações SaaS multi-tenant, construído com as melhores práticas de segurança e arquitetura moderna.

## 🚀 Características Principais

### 🔒 Segurança Avançada
- **JWT Authentication** com tokens de acesso e refresh
- **Refresh Tokens** com hash seguro e expiração configurável
- **Password Reset** com tokens criptografados e expiração
- **Role-Based Access Control (RBAC)** completo
- **Multi-tenant** com isolamento de dados
- **Rate Limiting** e proteção contra ataques
- **IP Address Tracking** para auditoria de segurança
- **Device Management** com informações de dispositivo

### 🏗️ Arquitetura Moderna
- **Node.js + Express** para API REST robusta
- **TypeScript** para tipagem forte e desenvolvimento seguro
- **Prisma ORM** para PostgreSQL com migrations automáticas
- **bcrypt** para hash seguro de senhas e tokens
- **Zod** para validação de dados e DTOs
- **pnpm** para gerenciamento eficiente de dependências

### 📊 Funcionalidades Completas
- **Autenticação completa** (login, logout, refresh, logout-all)
- **Gestão de usuários** com papéis e permissões
- **Sistema de tenants** para isolamento de dados
- **Gestão de lojas e sócios** com regras de negócio
- **Sistema de endereços** reutilizável
- **Auditoria de segurança** e logs de acesso

---

## 📁 Estrutura do Projeto

```
authentication/
├── src/
│   ├── modules/
│   │   ├── auth/                 # Autenticação e autorização
│   │   │   ├── controllers/      # Controllers de auth
│   │   │   ├── dto/             # DTOs de validação
│   │   │   ├── routes/          # Rotas de auth
│   │   │   └── services/        # Serviços de auth
│   │   ├── tenant/              # Gestão de tenants
│   │   ├── usuarios/            # Gestão de usuários
│   │   ├── lojas/               # Gestão de lojas
│   │   ├── socios/              # Gestão de sócios
│   │   ├── papeis/              # Gestão de papéis/roles
│   │   └── enderecos/           # Gestão de endereços
│   ├── config/
│   │   └── env.ts               # Configurações de ambiente
│   ├── prisma/
│   │   └── client.ts            # Cliente Prisma
│   ├── types/
│   │   └── global.d.ts          # Tipos globais
│   └── server.ts                # Servidor Express
├── prisma/
│   └── schema.prisma            # Schema do banco de dados
├── package.json                 # Dependências do projeto
└── README.md                    # Esta documentação
```

---

## 🗄️ Modelo de Dados

### Tabelas Principais

#### `usuarios`
- **id**: UUID único do usuário
- **email**: Email único (case-insensitive)
- **senha_hash**: Hash bcrypt da senha
- **nome**: Nome completo
- **papel_id**: Referência ao papel/role
- **tenant_id**: Referência ao tenant (obrigatório para usuários não-admin)
- **loja_id**: Referência à loja (opcional)
- **ativo**: Status de ativação
- **timestamps**: Criado/atualizado em

#### `refresh_tokens`
- **id**: UUID único do token
- **usuario_id**: Referência ao usuário
- **token_hash**: Hash bcrypt do token
- **expires_at**: Data de expiração (30 dias)
- **device_info**: Informações do dispositivo
- **ip_address**: Hash do endereço IP
- **user_agent**: User agent do navegador
- **is_revoked**: Status de revogação
- **timestamps**: Criado/atualizado em

#### `password_reset_tokens`
- **id**: UUID único do token
- **usuario_id**: Referência ao usuário
- **token_hash**: Hash bcrypt do token
- **expires_at**: Data de expiração (1 hora)
- **used_at**: Data de uso (null se não usado)
- **timestamps**: Criado/atualizado em

#### `tenants`
- **id**: UUID único do tenant
- **nome**: Nome da empresa/franquia
- **cnpj**: CNPJ único
- **ativo**: Status de ativação
- **timestamps**: Criado/atualizado em

#### `papels`
- **id**: UUID único do papel
- **nome**: Nome do papel (admin, gerente, vendedor, etc.)
- **descricao**: Descrição das permissões
- **permissoes**: Array de permissões
- **ativo**: Status de ativação
- **timestamps**: Criado/atualizado em

---

## 🔐 Sistema de Autenticação

### Fluxo de Login
1. **POST /auth/login**
   - Valida credenciais (email/senha)
   - Verifica se usuário está ativo
   - Gera JWT access token (15 minutos)
   - Gera refresh token (30 dias)
   - Retorna tokens e dados do usuário

### Fluxo de Refresh Token
1. **POST /auth/refresh**
   - Valida refresh token
   - Verifica se não foi revogado
   - Gera novo access token
   - Retorna novo access token

### Fluxo de Logout
1. **POST /auth/logout** - Revoga token específico
2. **POST /auth/logout-all** - Revoga todos os tokens do usuário

### Fluxo de Reset de Senha
1. **POST /auth/forgot-password**
   - Valida email
   - Gera token de reset (1 hora)
   - Envia email (implementação necessária)
2. **POST /auth/reset-password**
   - Valida token de reset
   - Atualiza senha
   - Revoga token usado

---

## 🛡️ Segurança

### JWT Tokens
- **Access Token**: 15 minutos de duração
- **Refresh Token**: 30 dias de duração
- **Password Reset Token**: 1 hora de duração
- Todos os tokens são hasheados no banco

### Hash e Criptografia
- **Senhas**: bcrypt com salt rounds 10
- **Refresh Tokens**: bcrypt com salt rounds 10
- **Password Reset Tokens**: bcrypt com salt rounds 10
- **IP Addresses**: bcrypt para privacidade

### Validações
- **Zod DTOs** para validação de entrada
- **Unicidade** de emails e CNPJs
- **Relacionamentos** obrigatórios
- **Status de ativação** verificado

### Auditoria
- **IP Address Tracking** para segurança
- **Device Information** para identificação
- **User Agent** para contexto
- **Timestamps** completos

---

## 📡 API Endpoints

### Autenticação (`/auth`)
```
POST   /auth/login              # Login com email/senha
POST   /auth/refresh            # Renovar access token
POST   /auth/logout             # Logout (revoga token atual)
POST   /auth/logout-all         # Logout de todos os dispositivos
POST   /auth/forgot-password    # Solicitar reset de senha
POST   /auth/reset-password     # Resetar senha com token
```

### Usuários (`/usuarios`)
```
GET    /usuarios                # Listar usuários (com filtros)
POST   /usuarios                # Criar usuário
GET    /usuarios/:id            # Buscar usuário por ID
PUT    /usuarios/:id            # Atualizar usuário
DELETE /usuarios/:id            # Deletar usuário
```

### Tenants (`/tenants`)
```
GET    /tenants                 # Listar tenants
POST   /tenants                 # Criar tenant
GET    /tenants/:id             # Buscar tenant por ID
PUT    /tenants/:id             # Atualizar tenant
DELETE /tenants/:id             # Deletar tenant
```

### Lojas (`/lojas`)
```
GET    /lojas                   # Listar lojas
POST   /lojas                   # Criar loja
GET    /lojas/:id               # Buscar loja por ID
PUT    /lojas/:id               # Atualizar loja
DELETE /lojas/:id               # Deletar loja
```

### Sócios (`/socios`)
```
GET    /socios                  # Listar sócios
POST   /socios                  # Criar sócio
GET    /socios/:id              # Buscar sócio por ID
PUT    /socios/:id              # Atualizar sócio
DELETE /socios/:id              # Deletar sócio
```

### Papéis (`/papeis`)
```
GET    /papeis                  # Listar papéis
POST   /papeis                  # Criar papel
GET    /papeis/:id              # Buscar papel por ID
PUT    /papeis/:id              # Atualizar papel
DELETE /papeis/:id              # Deletar papel
```

### Endereços (`/enderecos`)
```
GET    /enderecos               # Listar endereços
POST   /enderecos               # Criar endereço
GET    /enderecos/:id           # Buscar endereço por ID
PUT    /enderecos/:id           # Atualizar endereço
DELETE /enderecos/:id           # Deletar endereço
```

---

## 🔧 Configuração e Instalação

### Pré-requisitos
- **Node.js** 18+ 
- **PostgreSQL** 12+
- **pnpm** (recomendado) ou npm

### 1. Clone e Instalação
```bash
git clone <repository-url>
cd authentication
pnpm install
```

### 2. Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis de ambiente
DATABASE_URL="postgresql://usuario:senha@localhost:5432/authentication"
JWT_SECRET="seu-jwt-secret-super-seguro"
JWT_REFRESH_SECRET="seu-refresh-secret-super-seguro"
PORT=3000
NODE_ENV=development
```

### 3. Configuração do Banco
```bash
# Gere o cliente Prisma
pnpm prisma generate

# Execute as migrations
pnpm prisma migrate dev

# (Opcional) Seed inicial de dados
pnpm prisma db seed
```

### 4. Executar o Projeto
```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

---

## 🧪 Testando a API

### Postman Collections
O projeto inclui collections completas para todos os módulos:

1. **Importe as collections** no Postman
2. **Configure a variável de ambiente** `base_url` para `http://localhost:3000`
3. **Execute os testes** em ordem:
   - Primeiro: auth (login)
   - Depois: demais módulos

### Exemplo de Uso
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "senha": "senha123"}'

# Usar token retornado
curl -X GET http://localhost:3000/usuarios \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

---

## 🔒 Middleware de Autenticação

### JWT Middleware
```typescript
// Verifica token JWT
app.use('/api', jwtMiddleware);

// Verifica permissões específicas
app.use('/api/admin', requireRole(['admin']));
```

### Tenant Middleware
```typescript
// Verifica tenant_id para usuários não-admin
app.use('/api/usuarios', requireTenant);
```

---

## 📊 Monitoramento e Logs

### Logs de Segurança
- **Login attempts** (sucesso/falha)
- **Token refresh** activity
- **Password reset** requests
- **Logout** events
- **IP address** tracking

### Métricas Recomendadas
- **Active sessions** por usuário
- **Failed login attempts** por IP
- **Token refresh** frequency
- **Password reset** requests

---

## 🚀 Deploy em Produção

### Variáveis de Ambiente (Produção)
```bash
NODE_ENV=production
DATABASE_URL="postgresql://..."
JWT_SECRET="secret-super-seguro-e-aleatorio"
JWT_REFRESH_SECRET="refresh-secret-super-seguro"
PORT=3000
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Recomendações de Segurança
1. **Use HTTPS** em produção
2. **Configure rate limiting**
3. **Monitore logs** de segurança
4. **Backup regular** do banco
5. **Atualize dependências** regularmente

---

## 🔄 Migrations e Evolução do Banco

### Criar Nova Migration
```bash
# Após alterar o schema.prisma
pnpm prisma migrate dev --name nome-da-migration
```

### Aplicar Migrations em Produção
```bash
pnpm prisma migrate deploy
```

### Reset do Banco (Desenvolvimento)
```bash
pnpm prisma migrate reset
```

---

## 🤝 Contribuição

### Padrões de Código
- **TypeScript** com tipagem forte
- **ESLint** e **Prettier** para formatação
- **Conventional Commits** para mensagens
- **Testes** para novas funcionalidades

### Estrutura de Módulos
Cada novo módulo deve seguir a estrutura:
```
modules/nome-modulo/
├── controllers/
├── dto/
├── routes/
└── services/
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 🆘 Suporte

Para dúvidas, sugestões ou problemas:
1. **Issues** no GitHub
2. **Documentação** completa nos comentários do código
3. **Exemplos** nas collections do Postman

---

**Desenvolvido com ❤️ usando as melhores práticas de segurança e arquitetura moderna.**