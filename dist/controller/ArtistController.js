"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistController {
    constructor(db) {
        this.db = db;
    }
    createArtist(name, bio, birthYear, instagram) {
        return this.db.createArtist(name, bio, birthYear, instagram);
    }
    getArtist(param, extra) {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readArtist(param);
            }
            return this.db.readArtist(param);
        }
        else if (typeof param === "string") {
            return this.db.readArtistByName(param);
        }
    }
    listArtists() {
        return this.db.readAllArtists();
    }
    updateArtist(param, name, bio, birthYear, instagram, extra) {
        if (typeof param === "number") {
            return this.db.updateArtist(param, name, bio, birthYear, instagram);
        }
        else if (typeof param === "string") {
            const artist = this.db.readArtistByName(param);
            if (artist) {
                return this.db.updateArtist(artist.getId(), name, bio, birthYear, instagram);
            }
        }
        return false;
    }
    deleteArtist(param, extra) {
        if (typeof param === "number") {
            return !!this.db.deleteArtist(param);
        }
        else if (typeof param === "string") {
            const artist = this.db.readArtistByName(param);
            if (artist) {
                return !!this.db.deleteArtist(artist.getId());
            }
        }
        return false;
    }
}
exports.default = ArtistController;
