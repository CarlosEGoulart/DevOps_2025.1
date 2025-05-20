"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.router); // <-- API primeiro!
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'view/interface')));
// Redireciona '/' para 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'view/interface/index.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
