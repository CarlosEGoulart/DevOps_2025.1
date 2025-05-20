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
const express_1 = require("express");
const Database_1 = __importDefault(require("./db/Database"));
const ArtController_1 = __importDefault(require("./controller/ArtController"));
const ArtistController_1 = __importDefault(require("./controller/ArtistController"));
const ExhibitionController_1 = __importDefault(require("./controller/ExhibitionController"));
exports.router = (0, express_1.Router)();
const db = new Database_1.default();
const artController = new ArtController_1.default(db);
const artistController = new ArtistController_1.default(db);
const exhibitionController = new ExhibitionController_1.default(db);
// Listar todas as artes
exports.router.get('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arts = yield artController.listArts();
    res.json(arts);
}));
// Criar arte
exports.router.post('/arts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, year, imageUrl } = req.body;
    const created = yield artController.createArt(title, description, year, imageUrl);
    res.status(201).json(created);
}));
// Buscar arte por ID
exports.router.get('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const art = yield artController.getArt(id);
    if (art) {
        res.json(art);
    }
    else {
        res.status(404).json({ error: 'Art not found' });
    }
}));
// Atualizar arte
exports.router.put('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description, year } = req.body;
    const result = yield artController.updateArt(id, title, description, year);
    res.json(result);
}));
// Deletar arte
exports.router.delete('/arts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const result = yield artController.deleteArt(id);
    res.json(result);
}));
// ARTIST ROUTES
exports.router.get('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield artistController.listArtists();
    res.json(artists);
}));
exports.router.post('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, birthYear, instagram } = req.body;
    const created = yield artistController.createArtist(name, bio, birthYear, instagram);
    res.status(201).json(created);
}));
exports.router.get('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const artist = yield artistController.getArtist(id);
    if (artist)
        res.json(artist);
    else
        res.status(404).json({ error: 'Artist not found' });
}));
exports.router.put('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, bio, birthYear, instagram } = req.body;
    const result = yield artistController.updateArtist(id, name, bio, birthYear, instagram);
    res.json(result);
}));
exports.router.delete('/artists/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const result = yield artistController.deleteArtist(id);
    res.json(result);
}));
// EXHIBITION ROUTES
exports.router.get('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exhibitions = yield exhibitionController.listExhibitions();
    res.json(exhibitions);
}));
exports.router.post('/exhibitions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, location } = req.body;
    const created = yield exhibitionController.createExhibition(name, date, location);
    res.status(201).json(created);
}));
exports.router.get('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const exhibition = yield exhibitionController.getExhibition(id);
    if (exhibition)
        res.json(exhibition);
    else
        res.status(404).json({ error: 'Exhibition not found' });
}));
exports.router.put('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, date, location } = req.body;
    const result = yield exhibitionController.updateExhibition(id, name, date, location);
    res.json(result);
}));
exports.router.delete('/exhibitions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const result = yield exhibitionController.deleteExhibition(id);
    res.json(result);
}));
