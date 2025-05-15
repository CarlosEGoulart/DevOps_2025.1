"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Art extends BaseEntity_1.default {
    constructor(id, name, description, year, imageUrl = "", artist) {
        super(id, name);
        this.description = description;
        this.year = year;
        this.artist = artist;
        this.imageUrl = imageUrl;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getYear() {
        return this.year;
    }
    setYear(year) {
        this.year = year;
    }
    getArtist() {
        return this.artist;
    }
    setArtist(artist) {
        this.artist = artist;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }
    getInfo() {
        return `Obra: ${this.name}, Descrição: ${this.description}, Ano: ${this.year}, URL da Imagem: ${this.imageUrl}, Artista: ${this.artist ? this.artist.getName() : "Desconhecido"}`;
    }
}
exports.default = Art;
