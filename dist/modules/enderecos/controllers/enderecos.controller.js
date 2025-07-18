"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEndereco = createEndereco;
exports.getEndereco = getEndereco;
const enderecos_service_1 = require("../services/enderecos.service");
async function createEndereco(req, res) {
    try {
        const endereco = await enderecos_service_1.EnderecosService.create(req.body);
        res.status(201).json(endereco);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
async function getEndereco(req, res) {
    try {
        const endereco = await enderecos_service_1.EnderecosService.getById(req.params.id);
        if (!endereco)
            return res.status(404).json({ error: 'Endereço não encontrado' });
        res.json(endereco);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
