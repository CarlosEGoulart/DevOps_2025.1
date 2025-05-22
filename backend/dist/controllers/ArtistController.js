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
// Classe para manipulação de artistas
class ArtistController {
    constructor(database) {
        this.db = database;
    }
    // Listar todos os artistas
    listArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM artist ORDER BY name`;
            return yield this.db.query(sql);
        });
    }
    // Buscar artista por ID
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM artist WHERE artist_id = ?`;
            const results = yield this.db.query(sql, [id]);
            return results.length > 0 ? results[0] : null;
        });
    }
    // Criar novo artista
    createArtist(name, bio, year, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO artist (name, bio, year, instagram)
      VALUES (?, ?, ?, ?)
    `;
            const result = yield this.db.query(sql, [name, bio, year, instagram]);
            return {
                artist_id: result.insertId,
                name,
                bio,
                year,
                instagram
            };
        });
    }
    // Atualizar artista existente
    updateArtist(id, name, bio, year, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE artist
      SET name = ?, bio = ?, year = ?, instagram = ?
      WHERE artist_id = ?
    `;
            const result = yield this.db.query(sql, [name, bio, year, instagram, id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
    // Excluir artista
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM artist WHERE artist_id = ?`;
            const result = yield this.db.query(sql, [id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
}
exports.default = ArtistController;
