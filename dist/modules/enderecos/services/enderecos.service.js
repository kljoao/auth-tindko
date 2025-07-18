"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecosService = void 0;
const client_1 = __importDefault(require("../../../prisma/client"));
class EnderecosService {
    static async create(data) {
        return client_1.default.enderecos.create({ data });
    }
    static async getById(id) {
        return client_1.default.enderecos.findUnique({ where: { id } });
    }
}
exports.EnderecosService = EnderecosService;
