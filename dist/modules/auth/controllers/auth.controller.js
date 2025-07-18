"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const auth_service_1 = require("../services/auth.service");
async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const result = await auth_service_1.AuthService.login(email, senha);
        return res.json(result);
    }
    catch (err) {
        return res.status(401).json({ error: err.message });
    }
}
