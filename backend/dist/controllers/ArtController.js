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
Object.defineProperty(exports, "__esModule", { value: true });
// Classe para manipulação de obras de arte
class ArtController {
    constructor(database) {
        this.db = database;
    }
    // Listar todas as obras de arte
    listArts() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT a.*, artist.name as artist_name 
      FROM art a
      LEFT JOIN artist ON a.artist_id = artist.artist_id
      ORDER BY a.art_id DESC
    `;
            return yield this.db.query(sql);
        });
    }
    // Buscar obra de arte por ID
    getArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT a.*, artist.name as artist_name 
      FROM art a
      LEFT JOIN artist ON a.artist_id = artist.artist_id
      WHERE a.art_id = ?
    `;
            const results = yield this.db.query(sql, [id]);
            return results.length > 0 ? results[0] : null;
        });
    }
    // Criar nova obra de arte
    createArt(title, description, year, urlImage, artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO art (title, description, year, url_image, artist_id)
      VALUES (?, ?, ?, ?, ?)
    `;
            const result = yield this.db.query(sql, [title, description, year, urlImage, artistId || null]);
            return {
                art_id: result.insertId,
                title,
                description,
                year,
                url_image: urlImage,
                artist_id: artistId
            };
        });
    }
    // Atualizar obra de arte existente
    updateArt(id, title, description, year, urlImage, artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE art
      SET title = ?, description = ?, year = ?, url_image = ?, artist_id = ?
      WHERE art_id = ?
    `;
            const result = yield this.db.query(sql, [title, description, year, urlImage, artistId || null, id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
    // Excluir obra de arte
    deleteArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM art WHERE art_id = ?`;
            const result = yield this.db.query(sql, [id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
    // Listar obras de arte por artista
    listArtsByArtist(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT * FROM art 
      WHERE artist_id = ?
      ORDER BY year DESC
    `;
            return yield this.db.query(sql, [artistId]);
        });
    }
}
exports.default = ArtController;
