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
            const sql = `SELECT * FROM artists ORDER BY name`;
            return yield this.db.query(sql);
        });
    }
    // Buscar artista por ID
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM artists WHERE id = ?`;
            return yield this.db.get(sql, [id]);
        });
    }
    // Criar novo artista
    createArtist(name, bio, birthYear, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO artists (name, bio, birth_year, instagram)
      VALUES (?, ?, ?, ?)
    `;
            const result = yield this.db.run(sql, [name, bio, birthYear, instagram]);
            return {
                id: result.lastID,
                name,
                bio,
                birth_year: birthYear,
                instagram
            };
        });
    }
    // Atualizar artista existente
    updateArtist(id, name, bio, birthYear, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE artists
      SET name = ?, bio = ?, birth_year = ?, instagram = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
            const result = yield this.db.run(sql, [name, bio, birthYear, instagram, id]);
            return {
                success: result.changes > 0
            };
        });
    }
    // Excluir artista
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM artists WHERE id = ?`;
            const result = yield this.db.run(sql, [id]);
            return {
                success: result.changes > 0
            };
        });
    }
}
exports.default = ArtistController;
