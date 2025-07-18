"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    static async login(email, senha) {
        const user = await prisma.users.findUnique({ where: { email }, include: { user_roles: { include: { role: true } } } });
        if (!user)
            throw new Error('Usuário ou senha inválidos');
        const senhaOk = await bcrypt_1.default.compare(senha, user.password_hash);
        if (!senhaOk)
            throw new Error('Usuário ou senha inválidos');
        const roles = user.user_roles.map((ur) => ur.role.code);
        const token = jsonwebtoken_1.default.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return { token, user: { id: user.id, email: user.email, roles } };
    }
}
exports.AuthService = AuthService;
