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
            const sql = `SELECT * FROM arts ORDER BY id DESC`;
            return yield this.db.query(sql);
        });
    }
    // Buscar obra de arte por ID
    getArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM arts WHERE id = ?`;
            return yield this.db.get(sql, [id]);
        });
    }
    // Criar nova obra de arte
    createArt(title, description, year, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO arts (title, description, year, image_url)
      VALUES (?, ?, ?, ?)
    `;
            const result = yield this.db.run(sql, [title, description, year, imageUrl]);
            return {
                id: result.lastID,
                title,
                description,
                year,
                image_url: imageUrl
            };
        });
    }
    // Atualizar obra de arte existente
    updateArt(id, title, description, year, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE arts
      SET title = ?, description = ?, year = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
            const result = yield this.db.run(sql, [title, description, year, imageUrl, id]);
            return {
                success: result.changes > 0
            };
        });
    }
    // Excluir obra de arte
    deleteArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM arts WHERE id = ?`;
            const result = yield this.db.run(sql, [id]);
            return {
                success: result.changes > 0
            };
        });
    }
}
exports.default = ArtController;
