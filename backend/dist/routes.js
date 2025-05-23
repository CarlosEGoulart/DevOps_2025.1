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
// Arquivo de rotas da API com suporte a vínculos
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
// Rotas para Artistas (Artists)
exports.router.get('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield artistController.listArtists();
        res.json(artists);
    }
    catch (error) {
        console.error('Erro ao listar artistas:', error);
        res.status(500).json({ error: 'Erro ao listar artistas' });
    }
}));
exports.router.post('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bio, year, instagram } = req.body;
        const created = yield artistController.createArtist(name, bio, year, instagram);
        res.status(201).json(created);
    }
    catch (error) {
        console.error('Erro ao criar artista:', error);
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
        console.error('Erro ao buscar artista:', error);
        res.status(500).json({ error: 'Erro ao buscar artista' });
    }
}));
exports.router.put('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, bio, year, instagram } = req.body;
        const result = yield artistController.updateArtist(id, name, bio, year, instagram);
        res.json(result);
    }
    catch (error) {
        console.error('Erro ao atualizar artista:', error);
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
        console.error('Erro ao excluir artista:', error);
        res.status(500).json({ error: 'Erro ao excluir artista' });
    }
}));
// Rotas para Obras de Arte (Arts)
exports.router.get('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arts = yield artController.listArts();
        res.json(arts);
    }
    catch (error) {
        console.error('Erro ao listar obras de arte:', error);
        res.status(500).json({ error: 'Erro ao listar obras de arte' });
    }
}));
exports.router.post('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, year, urlImage, artistId } = req.body;
        const created = yield artController.createArt(title, description, year, urlImage, artistId);
        res.status(201).json(created);
    }
    catch (error) {
        console.error('Erro ao criar obra de arte:', error);
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
        console.error('Erro ao buscar obra de arte:', error);
        res.status(500).json({ error: 'Erro ao buscar obra de arte' });
    }
}));
exports.router.put('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title, description, year, urlImage, artistId } = req.body;
        const result = yield artController.updateArt(id, title, description, year, urlImage, artistId);
        res.json(result);
    }
    catch (error) {
        console.error('Erro ao atualizar obra de arte:', error);
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
        console.error('Erro ao excluir obra de arte:', error);
        res.status(500).json({ error: 'Erro ao excluir obra de arte' });
    }
}));
exports.router.get('/artists/:id/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistId = parseInt(req.params.id);
        const arts = yield artController.listArtsByArtist(artistId);
        res.json(arts);
    }
    catch (error) {
        console.error('Erro ao listar obras do artista:', error);
        res.status(500).json({ error: 'Erro ao listar obras do artista' });
    }
}));
// Rotas para Exposições (Exhibitions)
exports.router.get('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exhibitions = yield exhibitionController.listExhibitions();
        res.json(exhibitions);
    }
    catch (error) {
        console.error('Erro ao listar exposições:', error);
        res.status(500).json({ error: 'Erro ao listar exposições' });
    }
}));
// Rota atualizada para criar exposição com obras vinculadas
exports.router.post('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, artworks } = req.body;
        // Criar a exposição
        const exhibition = yield exhibitionController.createExhibition(name, description);
        // Se houver obras para vincular
        if (artworks && artworks.length > 0) {
            if (typeof exhibition.exhibition_id !== 'number') {
                throw new Error('ID da exposição não definido');
            }
            // Vincular cada obra à exposição
            for (const artId of artworks) {
                yield exhibitionController.addArtToExhibition(exhibition.exhibition_id, artId);
            }
        }
        // Retornar a exposição criada
        res.status(201).json(exhibition);
    }
    catch (error) {
        console.error('Erro ao criar exposição:', error);
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
        console.error('Erro ao buscar exposição:', error);
        res.status(500).json({ error: 'Erro ao buscar exposição' });
    }
}));
exports.router.put('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;
        const result = yield exhibitionController.updateExhibition(id, name, description);
        res.json(result);
    }
    catch (error) {
        console.error('Erro ao atualizar exposição:', error);
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
        console.error('Erro ao excluir exposição:', error);
        res.status(500).json({ error: 'Erro ao excluir exposição' });
    }
}));
// Rotas para relacionamento entre Exposições e Obras de Arte
exports.router.get('/exhibitions/:id/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exhibitionId = parseInt(req.params.id);
        const arts = yield exhibitionController.listArtsByExhibition(exhibitionId);
        res.json(arts);
    }
    catch (error) {
        console.error('Erro ao listar obras da exposição:', error);
        res.status(500).json({ error: 'Erro ao listar obras da exposição' });
    }
}));
exports.router.post('/exhibitions/:exhibitionId/arts/:artId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exhibitionId = parseInt(req.params.exhibitionId);
        const artId = parseInt(req.params.artId);
        const result = yield exhibitionController.addArtToExhibition(exhibitionId, artId);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Erro ao adicionar obra à exposição:', error);
        res.status(400).json({ error: 'Erro ao adicionar obra à exposição' });
    }
}));
exports.router.delete('/exhibitions/:exhibitionId/arts/:artId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exhibitionId = parseInt(req.params.exhibitionId);
        const artId = parseInt(req.params.artId);
        const result = yield exhibitionController.removeArtFromExhibition(exhibitionId, artId);
        res.json(result);
    }
    catch (error) {
        console.error('Erro ao remover obra da exposição:', error);
        res.status(500).json({ error: 'Erro ao remover obra da exposição' });
    }
}));
