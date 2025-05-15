"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExhibitionController {
    constructor(db) {
        this.db = db;
    }
    createExhibition(name, description, artWorks = []) {
        return this.db.createExhibition(name, description, artWorks);
    }
    getExhibition(param, extra) {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readExhibition(param);
            }
            return this.db.readExhibition(param);
        }
        else if (typeof param === "string") {
            return this.db.readExhibitionByName(param);
        }
    }
    listExhibitions() {
        return this.db.readAllExhibitions();
    }
    updateExhibition(param, name, description, artWorks) {
        if (typeof param === "number") {
            return this.db.updateExhibition(param, name, description, artWorks);
        }
        else if (typeof param === "string") {
            const exhibition = this.db.readExhibitionByName(param);
            if (exhibition) {
                return this.db.updateExhibition(exhibition.getId(), name, description, artWorks);
            }
        }
        return false;
    }
    deleteExhibition(param) {
        if (typeof param === "number") {
            return this.db.deleteExhibition(param);
        }
        else if (typeof param === "string") {
            const exhibition = this.db.readExhibitionByName(param);
            if (exhibition) {
                return this.db.deleteExhibition(exhibition.getId());
            }
        }
        return false;
    }
    addArtToExhibition(idExhibition, idArt) {
        return this.db.addArtToExhibition(idExhibition, idArt);
    }
    removeArtFromExhibition(idExhibition, idArt) {
        return this.db.removeArtFromExhibition(idExhibition, idArt);
    }
    getExhibitionArts(idExhibition) {
        return this.db.getExhibitionArts(idExhibition);
    }
}
exports.default = ExhibitionController;
