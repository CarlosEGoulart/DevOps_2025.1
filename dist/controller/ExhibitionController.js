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
class ExhibitionController {
    constructor(db) {
        this.db = db;
    }
    createExhibition(name, date, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.createExhibition(name, date, location);
        });
    }
    listExhibitions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.listExhibitions();
        });
    }
    getExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getExhibition(id);
        });
    }
    updateExhibition(id, name, date, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.updateExhibition(id, name, date, location);
        });
    }
    deleteExhibition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.deleteExhibition(id);
        });
    }
}
exports.default = ExhibitionController;
