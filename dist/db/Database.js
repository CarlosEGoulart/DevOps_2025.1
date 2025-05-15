"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("../model/Art"));
const Artist_1 = __importDefault(require("../model/Artist"));
const Exhibition_1 = __importDefault(require("../model/Exhibition"));
class Database {
    constructor() {
        this.ArtDb = [];
        this.ArtistDb = [];
        this.ExhibitionDb = [];
        this.nextArtId = 1;
        this.nextArtistId = 1;
        this.nextExhibitionId = 1;
    }
    // ART CRUD
    createArt(title, description, year) {
        const newArt = new Art_1.default(this.nextArtId++, title, description, year);
        this.ArtDb.push(newArt);
        return newArt;
    }
    readArt(idArt) {
        return this.ArtDb.find(art => art.getId() === idArt);
    }
    readArtByTitle(name) {
        return this.ArtDb.find(art => art.getName().toLowerCase() === name.toLowerCase());
    }
    readAllArts() {
        return this.ArtDb;
    }
    updateArt(idArt, title, description, year) {
        const art = this.readArt(idArt);
        if (art) {
            art.setName(title);
            art.setDescription(description);
            art.setYear(year);
            return true;
        }
        return false;
    }
    deleteArt(idArt) {
        const index = this.ArtDb.findIndex(art => art.getId() === idArt);
        if (index !== -1) {
            this.ArtDb.splice(index, 1);
            return this.ArtDb;
        }
        return undefined;
    }
    assignArtistToArt(idArt, artist) {
        const art = this.readArt(idArt);
        if (art && artist) {
            art.setArtist(artist);
            return true;
        }
        return false;
    }
    // ARTIST CRUD
    createArtist(name, bio, birthYear, instagram) {
        const newArtist = new Artist_1.default(this.nextArtistId++, name, bio, birthYear, instagram);
        this.ArtistDb.push(newArtist);
        return newArtist;
    }
    readArtist(idArtist) {
        return this.ArtistDb.find(artist => artist.getId() === idArtist);
    }
    readArtistByName(name) {
        return this.ArtistDb.find(artist => artist.getName().toLowerCase() === name.toLowerCase());
    }
    readAllArtists() {
        return this.ArtistDb;
    }
    updateArtist(idArtist, name, bio, birthYear, instagram) {
        const artist = this.readArtist(idArtist);
        if (artist) {
            artist.setName(name);
            artist.setBio(bio);
            artist.setBirthYear(birthYear);
            artist.setInstagram(instagram);
            return true;
        }
        return false;
    }
    deleteArtist(idArtist) {
        const index = this.ArtistDb.findIndex(artist => artist.getId() === idArtist);
        if (index !== -1) {
            this.ArtistDb.splice(index, 1);
            return this.ArtistDb;
        }
        return undefined;
    }
    // EXHIBITION CRUD
    createExhibition(name, description, artWorks = []) {
        const newExhibition = new Exhibition_1.default(this.nextExhibitionId++, name, description, artWorks);
        this.ExhibitionDb.push(newExhibition);
        return newExhibition;
    }
    readExhibition(idExhibition) {
        return this.ExhibitionDb.find(exh => exh.getId() === idExhibition);
    }
    readExhibitionByName(name) {
        return this.ExhibitionDb.find(exh => exh.getName().toLowerCase() === name.toLowerCase());
    }
    readAllExhibitions() {
        return this.ExhibitionDb;
    }
    updateExhibition(idExhibition, name, description, artWorks) {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            exhibition.setName(name);
            exhibition.setDescription(description);
            exhibition.setArtWorks(artWorks);
            return true;
        }
        return false;
    }
    deleteExhibition(idExhibition) {
        const index = this.ExhibitionDb.findIndex(exh => exh.getId() === idExhibition);
        if (index !== -1) {
            this.ExhibitionDb.splice(index, 1);
            return true;
        }
        return false;
    }
    addArtToExhibition(idExhibition, idArt) {
        const exhibition = this.readExhibition(idExhibition);
        const art = this.readArt(idArt);
        if (exhibition && art) {
            const currentArtWorks = exhibition.getArtWorks();
            if (!currentArtWorks.includes(idArt)) {
                exhibition.setArtWorks([...currentArtWorks, idArt]);
                return true;
            }
        }
        return false;
    }
    removeArtFromExhibition(idExhibition, idArt) {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== idArt);
            exhibition.setArtWorks(updatedArtWorks);
            return true;
        }
        return false;
    }
    getExhibitionArts(idExhibition) {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            const artIds = exhibition.getArtWorks();
            return artIds.map(id => this.readArt(id)).filter(art => art !== undefined);
        }
        return undefined;
    }
}
exports.default = Database;
