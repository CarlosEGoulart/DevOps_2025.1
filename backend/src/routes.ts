// Arquivo de rotas da API com suporte a vínculos
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

// Rotas para Artistas (Artists)
router.get('/artists', async (req, res) => {
    try {
        const artists = await artistController.listArtists();
        res.json(artists);
    } catch (error) {
        console.error('Erro ao listar artistas:', error);
        res.status(500).json({ error: 'Erro ao listar artistas' });
    }
});

router.post('/artists', async (req, res) => {
    try {
        const { name, bio, year, instagram } = req.body;
        const created = await artistController.createArtist(name, bio, year, instagram);
        res.status(201).json(created);
    } catch (error) {
        console.error('Erro ao criar artista:', error);
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
        console.error('Erro ao buscar artista:', error);
        res.status(500).json({ error: 'Erro ao buscar artista' });
    }
});

router.put('/artists/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, bio, year, instagram } = req.body;
        const result = await artistController.updateArtist(id, name, bio, year, instagram);
        res.json(result);
    } catch (error) {
        console.error('Erro ao atualizar artista:', error);
        res.status(400).json({ error: 'Erro ao atualizar artista' });
    }
});

router.delete('/artists/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await artistController.deleteArtist(id);
        res.json(result);
    } catch (error) {
        console.error('Erro ao excluir artista:', error);
        res.status(500).json({ error: 'Erro ao excluir artista' });
    }
});

// Rotas para Obras de Arte (Arts)
router.get('/arts', async (req, res) => {
    try {
        const arts = await artController.listArts();
        res.json(arts);
    } catch (error) {
        console.error('Erro ao listar obras de arte:', error);
        res.status(500).json({ error: 'Erro ao listar obras de arte' });
    }
});

router.post('/arts', async (req, res) => {
    try {
        const { title, description, year, urlImage, artistId } = req.body;
        const created = await artController.createArt(title, description, year, urlImage, artistId);
        res.status(201).json(created);
    } catch (error) {
        console.error('Erro ao criar obra de arte:', error);
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
        console.error('Erro ao buscar obra de arte:', error);
        res.status(500).json({ error: 'Erro ao buscar obra de arte' });
    }
});

router.put('/arts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, year, urlImage, artistId } = req.body;
        const result = await artController.updateArt(id, title, description, year, urlImage, artistId);
        res.json(result);
    } catch (error) {
        console.error('Erro ao atualizar obra de arte:', error);
        res.status(400).json({ error: 'Erro ao atualizar obra de arte' });
    }
});

router.delete('/arts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await artController.deleteArt(id);
        res.json(result);
    } catch (error) {
        console.error('Erro ao excluir obra de arte:', error);
        res.status(500).json({ error: 'Erro ao excluir obra de arte' });
    }
});

router.get('/artists/:id/arts', async (req, res) => {
    try {
        const artistId = parseInt(req.params.id);
        const arts = await artController.listArtsByArtist(artistId);
        res.json(arts);
    } catch (error) {
        console.error('Erro ao listar obras do artista:', error);
        res.status(500).json({ error: 'Erro ao listar obras do artista' });
    }
});

// Rotas para Exposições (Exhibitions)
router.get('/exhibitions', async (req, res) => {
    try {
        // Buscar todas as exposições básicas
        const exhibitions = await exhibitionController.listExhibitions();
        
        // Para cada exposição, buscar as obras de arte vinculadas
        const exhibitionsWithArts = await Promise.all(exhibitions.map(async (exhibition) => {
            if (typeof exhibition.exhibition_id !== 'number') {
                // Se o ID não for um número, retorne a exposição sem obras
                return { ...exhibition, artworks: [] };
            }
            const artworks = await exhibitionController.listArtsByExhibition(exhibition.exhibition_id);
            return { ...exhibition, artworks }; // Adiciona a lista de obras ao objeto da exposição
        }));
        
        res.json(exhibitionsWithArts);
    } catch (error) {
        console.error('Erro ao listar exposições com obras:', error);
        res.status(500).json({ error: 'Erro ao listar exposições com obras' });
    }
});

// Rota atualizada para criar exposição com obras vinculadas
router.post('/exhibitions', async (req, res) => {
    try {
        const { name, description, artworks } = req.body;
        
        // Criar a exposição
        const exhibition = await exhibitionController.createExhibition(name, description);
        
        // Se houver obras para vincular
        if (artworks && artworks.length > 0) {
            if (typeof exhibition.exhibition_id !== 'number') {
                throw new Error('ID da exposição não definido');
            }
            // Vincular cada obra à exposição
            for (const artId of artworks) {
                await exhibitionController.addArtToExhibition(exhibition.exhibition_id, artId);
            }
        }
        
        // Retornar a exposição criada
        res.status(201).json(exhibition);
    } catch (error) {
        console.error('Erro ao criar exposição:', error);
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
        console.error('Erro ao buscar exposição:', error);
        res.status(500).json({ error: 'Erro ao buscar exposição' });
    }
});

router.put('/exhibitions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;
        const result = await exhibitionController.updateExhibition(id, name, description);
        res.json(result);
    } catch (error) {
        console.error('Erro ao atualizar exposição:', error);
        res.status(400).json({ error: 'Erro ao atualizar exposição' });
    }
});

router.delete('/exhibitions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await exhibitionController.deleteExhibition(id);
        res.json(result);
    } catch (error) {
        console.error('Erro ao excluir exposição:', error);
        res.status(500).json({ error: 'Erro ao excluir exposição' });
    }
});

// Rotas para relacionamento entre Exposições e Obras de Arte
router.get('/exhibitions/:id/arts', async (req, res) => {
    try {
        const exhibitionId = parseInt(req.params.id);
        const arts = await exhibitionController.listArtsByExhibition(exhibitionId);
        res.json(arts);
    } catch (error) {
        console.error('Erro ao listar obras da exposição:', error);
        res.status(500).json({ error: 'Erro ao listar obras da exposição' });
    }
});

router.post('/exhibitions/:exhibitionId/arts/:artId', async (req, res) => {
    try {
        const exhibitionId = parseInt(req.params.exhibitionId);
        const artId = parseInt(req.params.artId);
        const result = await exhibitionController.addArtToExhibition(exhibitionId, artId);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao adicionar obra à exposição:', error);
        res.status(400).json({ error: 'Erro ao adicionar obra à exposição' });
    }
});

router.delete('/exhibitions/:exhibitionId/arts/:artId', async (req, res) => {
    try {
        const exhibitionId = parseInt(req.params.exhibitionId);
        const artId = parseInt(req.params.artId);
        const result = await exhibitionController.removeArtFromExhibition(exhibitionId, artId);
        res.json(result);
    } catch (error) {
        console.error('Erro ao remover obra da exposição:', error);
        res.status(500).json({ error: 'Erro ao remover obra da exposição' });
    }
});
