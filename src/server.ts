import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import authRoutes from './modules/auth/routes/auth.routes';
import enderecosRoutes from './modules/enderecos/routes/enderecos.routes';
import tenantRoutes from './modules/tenant/routes/tenant.routes';
import lojasRoutes from './modules/lojas/routes/lojas.routes';
import usuariosRoutes from './modules/usuarios/routes/usuarios.routes';
import papeisRoutes from './modules/papeis/routes/papeis.routes';
import sociosRoutes from './modules/socios/routes/socios.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3001', // ou ['http://localhost:3001'] para múltiplas origens
  credentials: true // necessário se você usa cookies ou Authorization header
}));

app.use('/auth', authRoutes);
app.use('/enderecos', enderecosRoutes);
app.use('/tenants', tenantRoutes);
app.use('/lojas', lojasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/papeis', papeisRoutes);
app.use('/socios', sociosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 