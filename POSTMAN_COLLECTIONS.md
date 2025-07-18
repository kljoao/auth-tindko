# Collections do Postman

Este documento descreve as collections do Postman disponíveis para testar a API de autenticação.

## Collections Disponíveis

### 1. Auth API (`auth-api.postman_collection.json`)
**Endpoints de autenticação e autorização**

- **Login** - Realiza login e retorna JWT + refresh token
- **Refresh Token** - Renova o JWT usando refresh token
- **Logout** - Revoga um refresh token específico
- **Logout All Devices** - Revoga todos os refresh tokens do usuário
- **Forgot Password** - Solicita reset de senha
- **Reset Password** - Define nova senha usando token de reset

### 2. Usuários API (`usuarios-api.postman_collection.json`)
**Gerenciamento de usuários com controle de acesso**

- **Criar Usuário** - Requer permissão: admin_global, admin_tenant, gerente_regional ou gerente
- **Buscar Usuário** - Busca por ID
- **Listar Usuários** - Lista todos os usuários
- **Atualizar Usuário** - Permissão: próprio usuário OU admin_global, admin_tenant, gerente_regional, gerente
- **Deletar Usuário** - Remove usuário do sistema

### 3. Tenant API (`tenant-api.postman_collection.json`)
**Gerenciamento de tenants (franquias)**

- **Criar Tenant** - Requer permissão: admin_global
- **Buscar Tenant** - Busca por ID
- **Listar Tenants** - Lista todos os tenants
- **Atualizar Tenant** - Requer permissão: admin_global ou admin_tenant
- **Deletar Tenant** - Requer permissão: admin_global ou admin_tenant

### 4. Endereços API (`enderecos-api.postman_collection.json`)
**Gerenciamento de endereços**

- **Criar Endereço** - Cria novo endereço
- **Buscar Endereço** - Busca por ID
- **Listar Endereços** - Lista todos os endereços
- **Atualizar Endereço** - Requer permissão: admin_global, admin_tenant ou gerente_regional
- **Deletar Endereço** - Remove endereço do sistema

### 5. Lojas API (`lojas-api.postman_collection.json`)
**Gerenciamento de lojas**

- **Criar Loja** - Regra: endereço deve ser único
- **Buscar Loja** - Busca por ID
- **Listar Lojas** - Lista todas as lojas
- **Atualizar Loja** - Regra: novo endereço deve ser único
- **Deletar Loja** - Remove loja do sistema

### 6. Papéis API (`papeis-api.postman_collection.json`)
**Gerenciamento de papéis (perfis)**

- **Criar Papel** - Requer permissão: admin_global
- **Buscar Papel** - Busca por ID
- **Listar Papéis** - Lista todos os papéis
- **Atualizar Papel** - Atualiza papel existente
- **Deletar Papel** - Remove papel do sistema

### 7. Sócios API (`socios-api.postman_collection.json`)
**Gerenciamento de sócios**

- **Criar Sócio** - Cria novo sócio
- **Buscar Sócio** - Busca por ID
- **Listar Sócios** - Lista todos os sócios
- **Atualizar Sócio** - Atualiza sócio existente
- **Deletar Sócio** - Remove sócio do sistema

### 8. Testes de Integração (`testes-integracao.postman_collection.json`)
**Fluxos completos de teste**

- **Fluxo Completo - Admin Global** - Testa criação de tenant e usuário
- **Fluxo - Refresh Token** - Testa renovação de JWT
- **Fluxo - Forgot Password** - Testa reset de senha
- **Teste - Validação de Permissões** - Testa controle de acesso

## Configuração

### Variáveis de Ambiente

Configure as seguintes variáveis no Postman:

```json
{
  "base_url": "http://localhost:3000",
  "jwt_token": "seu_jwt_token_aqui",
  "tenant_id": "uuid_do_tenant",
  "usuario_id": "uuid_do_usuario",
  "endereco_id": "uuid_do_endereco",
  "loja_id": "uuid_da_loja",
  "papel_id": "uuid_do_papel",
  "socio_id": "uuid_do_socio"
}
```

### Como Usar

1. **Importe as collections** no Postman
2. **Configure as variáveis** de ambiente
3. **Execute o login** para obter o JWT token
4. **Copie o token** para a variável `jwt_token`
5. **Teste os endpoints** conforme necessário

### Fluxo de Teste Recomendado

1. **Auth API** → Login para obter tokens
2. **Papéis API** → Criar papéis necessários (admin_global)
3. **Tenant API** → Criar tenant (admin_global)
4. **Endereços API** → Criar endereços
5. **Usuários API** → Criar usuários
6. **Lojas API** → Criar lojas
7. **Sócios API** → Criar sócios
8. **Testes de Integração** → Validar fluxos completos

## Regras de Negócio Implementadas

### Controle de Acesso por Papéis

- **admin_global**: Acesso total ao sistema
- **admin_tenant**: Acesso limitado ao próprio tenant
- **gerente_regional**: Acesso regional
- **gerente**: Acesso à loja específica
- **vendedor**: Acesso limitado

### Validações Específicas

- **Usuários**: `tenant_id` opcional para admin_global
- **Lojas**: Endereço único por loja
- **Endereços**: Validação de CEP e UF
- **Refresh Tokens**: IP criptografado com bcrypt
- **Password Reset**: Tokens com expiração

### Segurança

- **JWT**: Tokens com expiração
- **Refresh Tokens**: Armazenados com hash bcrypt
- **Senhas**: Criptografadas com bcrypt
- **IPs**: Criptografados nos refresh tokens
- **Validação**: Zod para todos os inputs

## Troubleshooting

### Erro 401 Unauthorized
- Verifique se o JWT token está válido
- Execute o login novamente
- Use o refresh token se disponível

### Erro 403 Forbidden
- Verifique as permissões do usuário
- Confirme se o papel tem acesso ao recurso
- Use um usuário com permissões adequadas

### Erro 422 Validation Error
- Verifique o formato dos dados enviados
- Confirme se todos os campos obrigatórios estão preenchidos
- Valide regras de negócio (ex: endereço único para lojas)

### Erro 500 Internal Server Error
- Verifique se o banco de dados está rodando
- Confirme se as migrações foram aplicadas
- Verifique os logs do servidor

## Próximos Passos

1. **Configure um ambiente** no Postman com as variáveis
2. **Execute os testes** de integração
3. **Valide as permissões** com diferentes usuários
4. **Teste os fluxos** de refresh token e reset de senha
5. **Implemente testes automatizados** se necessário 