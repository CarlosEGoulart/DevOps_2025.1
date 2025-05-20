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
const ConfigMySQL_1 = __importDefault(require("../config/ConfigMySQL"));
class Database {
    // ART CRUD
    createArt(title, description, year, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('INSERT INTO arts (title, description, year, image_url) VALUES (?, ?, ?, ?)', [title, description, year, imageUrl]);
            return result;
        });
    }
    listArts() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM arts');
            return rows;
        });
    }
    getArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM arts WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        });
    }
    updateArt(id, title, description, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('UPDATE arts SET title = ?, description = ?, year = ? WHERE id = ?', [title, description, year, id]);
            return result;
        });
    }
    deleteArt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('DELETE FROM arts WHERE id = ?', [id]);
            return result;
        });
    }
    // ARTIST CRUD
    createArtist(name, bio, birthYear, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('INSERT INTO artists (name, bio, birth_year, instagram) VALUES (?, ?, ?, ?)', [name, bio, birthYear, instagram]);
            return result;
        });
    }
    listArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM artists');
            return rows;
        });
    }
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM artists WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        });
    }
    updateArtist(id, name, bio, birthYear, instagram) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('UPDATE artists SET name = ?, bio = ?, birth_year = ?, instagram = ? WHERE id = ?', [name, bio, birthYear, instagram, id]);
            return result;
        });
    }
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('DELETE FROM artists WHERE id = ?', [id]);
            return result;
        });
    }
    // EXHIBITION CRUD
    createExhibition(name, date, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('INSERT INTO exhibitions (name, date, location) VALUES (?, ?, ?)', [name, date, location]);
            return result;
        });
    }
    listExhibitions() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM exhibitions');
            return rows;
        });
    }
    getExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield ConfigMySQL_1.default.execute('SELECT * FROM exhibitions WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        });
    }
    updateExhibition(id, name, date, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('UPDATE exhibitions SET name = ?, date = ?, location = ? WHERE id = ?', [name, date, location, id]);
            return result;
        });
    }
    deleteExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield ConfigMySQL_1.default.execute('DELETE FROM exhibitions WHERE id = ?', [id]);
            return result;
        });
    }
}
exports.default = Database;
