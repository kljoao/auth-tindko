"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enderecos_controller_1 = require("../controllers/enderecos.controller");
const router = (0, express_1.Router)();
router.post('/', enderecos_controller_1.createEndereco);
router.get('/:id', enderecos_controller_1.getEndereco);
exports.default = router;
