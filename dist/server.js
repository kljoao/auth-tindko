"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth.routes"));
const enderecos_routes_1 = __importDefault(require("./modules/enderecos/routes/enderecos.routes"));
// import tenantRoutes from './modules/tenant/routes/tenant.routes'; // quando criar
// import outras rotas conforme necessário
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/enderecos', enderecos_routes_1.default);
// app.use('/tenant', tenantRoutes); // quando criar
// app.use('/tenants', tenantsRoutes);
// app.use('/usuarios', usuariosRoutes);
// app.use('/lojas', lojasRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
