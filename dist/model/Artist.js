"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Artist extends BaseEntity_1.default {
    constructor(id, name, bio, birthYear, instagram) {
        super(id, name);
        this.bio = bio;
        this.birthYear = birthYear;
        this.instagram = instagram;
    }
    getBio() {
        return this.bio;
    }
    setBio(bio) {
        this.bio = bio;
    }
    getBirthYear() {
        return this.birthYear;
    }
    setBirthYear(birthYear) {
        this.birthYear = birthYear;
    }
    getInstagram() {
        return this.instagram;
    }
    setInstagram(instagram) {
        this.instagram = instagram;
    }
    getInfo() {
        return `Artista: ${this.name}, Bio: ${this.bio}, Ano de Nascimento: ${this.birthYear}, Instagram: ${this.instagram}`;
    }
}
exports.default = Artist;
