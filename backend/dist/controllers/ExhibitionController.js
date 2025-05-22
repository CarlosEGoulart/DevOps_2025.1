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
// Classe para manipulação de exposições
class ExhibitionController {
    constructor(database) {
        this.db = database;
    }
    // Listar todas as exposições
    listExhibitions() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM exhibition ORDER BY name`;
            return yield this.db.query(sql);
        });
    }
    // Buscar exposição por ID
    getExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM exhibition WHERE exhibition_id = ?`;
            const results = yield this.db.query(sql, [id]);
            return results.length > 0 ? results[0] : null;
        });
    }
    // Criar nova exposição
    createExhibition(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO exhibition (name, description)
      VALUES (?, ?)
    `;
            const result = yield this.db.query(sql, [name, description]);
            return {
                exhibition_id: result.insertId,
                name,
                description
            };
        });
    }
    // Atualizar exposição existente
    updateExhibition(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE exhibition
      SET name = ?, description = ?
      WHERE exhibition_id = ?
    `;
            const result = yield this.db.query(sql, [name, description, id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
    // Excluir exposição
    deleteExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM exhibition WHERE exhibition_id = ?`;
            const result = yield this.db.query(sql, [id]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
    // Listar obras de arte em uma exposição
    listArtsByExhibition(exhibitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      SELECT a.*, ea.exhibition_art_id
      FROM art a
      JOIN exhibition_art ea ON a.art_id = ea.art_id
      WHERE ea.exhibition_id = ?
    `;
            return yield this.db.query(sql, [exhibitionId]);
        });
    }
    // Adicionar obra de arte a uma exposição
    addArtToExhibition(exhibitionId, artId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO exhibition_art (exhibition_id, art_id)
      VALUES (?, ?)
    `;
            const result = yield this.db.query(sql, [exhibitionId, artId]);
            return {
                exhibition_art_id: result.insertId,
                exhibition_id: exhibitionId,
                art_id: artId
            };
        });
    }
    // Remover obra de arte de uma exposição
    removeArtFromExhibition(exhibitionId, artId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      DELETE FROM exhibition_art 
      WHERE exhibition_id = ? AND art_id = ?
    `;
            const result = yield this.db.query(sql, [exhibitionId, artId]);
            return {
                success: result.affectedRows > 0
            };
        });
    }
}
exports.default = ExhibitionController;
