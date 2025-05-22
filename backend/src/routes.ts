// Arquivo de rotas da API
import { Router } from 'express';
import Database from './config/database';
import ArtController from './controllers/ArtController';
import ArtistController from './controllers/ArtistController';
import ExhibitionController from './controllers/ExhibitionController';

// Inicialização do router e controladores
export const router = Router();
const db = Database.getInstance();
const artController = new ArtController(db);
const artistController = new ArtistController(db);
const exhibitionController = new ExhibitionController(db);

// Rotas para Obras de Arte (Arts)
router.get('/arts', async (req, res) => {
    try {
        const arts = await artController.listArts();
        res.json(arts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar obras de arte' });
    }
});

router.post('/arts', async (req, res) => {
    try {
        const { title, description, year, imageUrl } = req.body;
        const created = await artController.createArt(title, description, year, imageUrl);
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar obra de arte' });
    }
});

router.get('/arts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const art = await artController.getArt(id);
        if (art) {
            res.json(art);
        } else {
            res.status(404).json({ error: 'Obra de arte não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar obra de arte' });
    }
});

router.put('/arts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, year, imageUrl } = req.body;
        const result = await artController.updateArt(id, title, description, year, imageUrl);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar obra de arte' });
    }
});

router.delete('/arts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await artController.deleteArt(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir obra de arte' });
    }
});

// Rotas para Artistas (Artists)
router.get('/artists', async (req, res) => {
    try {
        const artists = await artistController.listArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar artistas' });
    }
});

router.post('/artists', async (req, res) => {
    try {
        const { name, bio, birthYear, instagram } = req.body;
        const created = await artistController.createArtist(name, bio, birthYear, instagram);
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar artista' });
    }
});

router.get('/artists/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const artist = await artistController.getArtist(id);
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).json({ error: 'Artista não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar artista' });
    }
});

router.put('/artists/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, bio, birthYear, instagram } = req.body;
        const result = await artistController.updateArtist(id, name, bio, birthYear, instagram);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar artista' });
    }
});

router.delete('/artists/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await artistController.deleteArtist(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir artista' });
    }
});

// Rotas para Exposições (Exhibitions)
router.get('/exhibitions', async (req, res) => {
    try {
        const exhibitions = await exhibitionController.listExhibitions();
        res.json(exhibitions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar exposições' });
    }
});

router.post('/exhibitions', async (req, res) => {
    try {
        const { name, date, location, description } = req.body;
        const created = await exhibitionController.createExhibition(name, date, location, description);
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar exposição' });
    }
});

router.get('/exhibitions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const exhibition = await exhibitionController.getExhibition(id);
        if (exhibition) {
            res.json(exhibition);
        } else {
            res.status(404).json({ error: 'Exposição não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar exposição' });
    }
});

router.put('/exhibitions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, date, location, description } = req.body;
        const result = await exhibitionController.updateExhibition(id, name, date, location, description);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar exposição' });
    }
});

router.delete('/exhibitions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await exhibitionController.deleteExhibition(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir exposição' });
    }
});
