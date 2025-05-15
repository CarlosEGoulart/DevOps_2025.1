"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtController {
    constructor(db) {
        this.db = db;
    }
    createArt(title, description, year) {
        return this.db.createArt(title, description, year);
    }
    getArt(param, extra) {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readArt(param);
            }
            return this.db.readArt(param);
        }
        else if (typeof param === "string") {
            return this.db.readArtByTitle(param);
        }
    }
    listArts() {
        return this.db.readAllArts();
    }
    updateArt(param, title, description, year) {
        if (typeof param === "number") {
            return this.db.updateArt(param, title, description, year);
        }
        else if (typeof param === "string") {
            const art = this.db.readArtByTitle(param);
            if (art) {
                return this.db.updateArt(art.getId(), title, description, year);
            }
        }
        return false;
    }
    deleteArt(param) {
        if (typeof param === "number") {
            return !!this.db.deleteArt(param);
        }
        else if (typeof param === "string") {
            const art = this.db.readArtByTitle(param);
            if (art) {
                return !!this.db.deleteArt(art.getId());
            }
        }
        return false;
    }
    assignArtistToArt(idArt, idArtist) {
        const artist = this.db.readArtist(idArtist);
        if (!artist) {
            return false;
        }
        return this.db.assignArtistToArt(idArt, artist);
    }
}
exports.default = ArtController;
