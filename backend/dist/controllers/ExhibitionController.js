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
            const sql = `SELECT * FROM exhibitions ORDER BY date DESC`;
            return yield this.db.query(sql);
        });
    }
    // Buscar exposição por ID
    getExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM exhibitions WHERE id = ?`;
            return yield this.db.get(sql, [id]);
        });
    }
    // Criar nova exposição
    createExhibition(name, date, location, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO exhibitions (name, date, location, description)
      VALUES (?, ?, ?, ?)
    `;
            const result = yield this.db.run(sql, [name, date, location, description]);
            return {
                id: result.lastID,
                name,
                date,
                location,
                description
            };
        });
    }
    // Atualizar exposição existente
    updateExhibition(id, name, date, location, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      UPDATE exhibitions
      SET name = ?, date = ?, location = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
            const result = yield this.db.run(sql, [name, date, location, description, id]);
            return {
                success: result.changes > 0
            };
        });
    }
    // Excluir exposição
    deleteExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM exhibitions WHERE id = ?`;
            const result = yield this.db.run(sql, [id]);
            return {
                success: result.changes > 0
            };
        });
    }
}
exports.default = ExhibitionController;
