"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Arquivo de rotas da API
const express_1 = require("express");
const database_1 = __importDefault(require("./config/database"));
const ArtController_1 = __importDefault(require("./controllers/ArtController"));
const ArtistController_1 = __importDefault(require("./controllers/ArtistController"));
const ExhibitionController_1 = __importDefault(require("./controllers/ExhibitionController"));
// Inicialização do router e controladores
exports.router = (0, express_1.Router)();
const db = database_1.default.getInstance();
const artController = new ArtController_1.default(db);
const artistController = new ArtistController_1.default(db);
const exhibitionController = new ExhibitionController_1.default(db);
// Rotas para Obras de Arte (Arts)
exports.router.get('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arts = yield artController.listArts();
        res.json(arts);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar obras de arte' });
    }
}));
exports.router.post('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, year, imageUrl } = req.body;
        const created = yield artController.createArt(title, description, year, imageUrl);
        res.status(201).json(created);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar obra de arte' });
    }
}));
exports.router.get('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const art = yield artController.getArt(id);
        if (art) {
            res.json(art);
        }
        else {
            res.status(404).json({ error: 'Obra de arte não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar obra de arte' });
    }
}));
exports.router.put('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title, description, year, imageUrl } = req.body;
        const result = yield artController.updateArt(id, title, description, year, imageUrl);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar obra de arte' });
    }
}));
exports.router.delete('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield artController.deleteArt(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao excluir obra de arte' });
    }
}));
// Rotas para Artistas (Artists)
exports.router.get('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield artistController.listArtists();
        res.json(artists);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar artistas' });
    }
}));
exports.router.post('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bio, birthYear, instagram } = req.body;
        const created = yield artistController.createArtist(name, bio, birthYear, instagram);
        res.status(201).json(created);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar artista' });
    }
}));
exports.router.get('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const artist = yield artistController.getArtist(id);
        if (artist) {
            res.json(artist);
        }
        else {
            res.status(404).json({ error: 'Artista não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar artista' });
    }
}));
exports.router.put('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, bio, birthYear, instagram } = req.body;
        const result = yield artistController.updateArtist(id, name, bio, birthYear, instagram);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar artista' });
    }
}));
exports.router.delete('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield artistController.deleteArtist(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao excluir artista' });
    }
}));
// Rotas para Exposições (Exhibitions)
exports.router.get('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exhibitions = yield exhibitionController.listExhibitions();
        res.json(exhibitions);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar exposições' });
    }
}));
exports.router.post('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, location, description } = req.body;
        const created = yield exhibitionController.createExhibition(name, date, location, description);
        res.status(201).json(created);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar exposição' });
    }
}));
exports.router.get('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const exhibition = yield exhibitionController.getExhibition(id);
        if (exhibition) {
            res.json(exhibition);
        }
        else {
            res.status(404).json({ error: 'Exposição não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar exposição' });
    }
}));
exports.router.put('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, date, location, description } = req.body;
        const result = yield exhibitionController.updateExhibition(id, name, date, location, description);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar exposição' });
    }
}));
exports.router.delete('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield exhibitionController.deleteExhibition(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao excluir exposição' });
    }
}));
