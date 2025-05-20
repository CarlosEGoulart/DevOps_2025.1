import { Router } from 'express';
import Database from './db/Database';
import ArtController from './controller/ArtController';
import ArtistController from './controller/ArtistController';
import ExhibitionController from './controller/ExhibitionController';

export const router = Router();
const db = new Database();
const artController = new ArtController(db);
const artistController = new ArtistController(db);
const exhibitionController = new ExhibitionController(db);


// Listar todas as artes
router.get('/arts', async (req, res) => {
    const arts = await artController.listArts();
    res.json(arts);
});

// Criar arte
router.post('/arts', async (req, res) => {
    const { title, description, year, imageUrl } = req.body;
    const created = await artController.createArt(title, description, year, imageUrl);
    res.status(201).json(created);
});

// Buscar arte por ID
router.get('/arts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const art = await artController.getArt(id);
    if (art) {
        res.json(art);
    } else {
        res.status(404).json({ error: 'Art not found' });
    }
});

// Atualizar arte
router.put('/arts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, year } = req.body;
    const result = await artController.updateArt(id, title, description, year);
    res.json(result);
});

// Deletar arte
router.delete('/arts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await artController.deleteArt(id);
    res.json(result);
});

// ARTIST ROUTES
router.get('/artists', async (req, res) => {
    const artists = await artistController.listArtists();
    res.json(artists);
});

router.post('/artists', async (req, res) => {
    const { name, bio, birthYear, instagram } = req.body;
    const created = await artistController.createArtist(name, bio, birthYear, instagram);
    res.status(201).json(created);
});

router.get('/artists/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const artist = await artistController.getArtist(id);
    if (artist) res.json(artist);
    else res.status(404).json({ error: 'Artist not found' });
});

router.put('/artists/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, bio, birthYear, instagram } = req.body;
    const result = await artistController.updateArtist(id, name, bio, birthYear, instagram);
    res.json(result);
});

router.delete('/artists/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await artistController.deleteArtist(id);
    res.json(result);
});

// EXHIBITION ROUTES
router.get('/exhibitions', async (req, res) => {
    const exhibitions = await exhibitionController.listExhibitions();
    res.json(exhibitions);
});

router.post('/exhibitions', async (req, res) => {
    const { name, date, location } = req.body;
    const created = await exhibitionController.createExhibition(name, date, location);
    res.status(201).json(created);
});

router.get('/exhibitions/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const exhibition = await exhibitionController.getExhibition(id);
    if (exhibition) res.json(exhibition);
    else res.status(404).json({ error: 'Exhibition not found' });
});

router.put('/exhibitions/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, date, location } = req.body;
    const result = await exhibitionController.updateExhibition(id, name, date, location);
    res.json(result);
});

router.delete('/exhibitions/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await exhibitionController.deleteExhibition(id);
    res.json(result);
});