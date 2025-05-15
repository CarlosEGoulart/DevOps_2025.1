"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const EnumType_1 = require("../model/EnumType");
class ArtistView {
    constructor(artistController, message) {
        this.artistController = artistController;
        this.message = message;
    }
    start() {
        while (true) {
            console.log("\n--- Gerenciar Artistas ---");
            console.log("1. Listar Artistas");
            console.log("2. Visualizar Detalhes do Artista");
            console.log("3. Criar Novo Artista");
            console.log("4. Atualizar Artista");
            console.log("5. Deletar Artista");
            console.log("0. Voltar ao Menu Principal");
            const choice = readlineSync.questionInt("Escolha uma opção: ");
            switch (choice) {
                case 1:
                    this.listArtists();
                    break;
                case 2:
                    this.viewArtistDetails();
                    break;
                case 3:
                    this.createArtist();
                    break;
                case 4:
                    this.updateArtist();
                    break;
                case 5:
                    this.deleteArtist();
                    break;
                case 0:
                    return;
                default:
                    this.message.showMessage(EnumType_1.MessageType.Error);
            }
        }
    }
    listArtists() {
        const artists = this.artistController.listArtists();
        if (artists.length === 0) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
            return;
        }
        artists.forEach(artist => {
            console.log(`ID: ${artist.getId()}, Nome: ${artist.getName()}`);
        });
    }
    viewArtistDetails() {
        const input = readlineSync.question("Digite o ID ou Nome do artista: ");
        let artist;
        if (!isNaN(Number(input))) {
            artist = this.artistController.getArtist(Number(input));
        }
        else {
            artist = this.artistController.getArtist(input);
        }
        if (artist) {
            console.log(artist.getInfo());
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    createArtist() {
        const name = readlineSync.question("Nome: ");
        const bio = readlineSync.question("Bio: ");
        const birthYear = readlineSync.questionInt("Ano de nascimento: ");
        const instagram = readlineSync.question("Instagram: ");
        const newArtist = this.artistController.createArtist(name, bio, birthYear, instagram);
        if (newArtist) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
    updateArtist() {
        const input = readlineSync.question("Digite o ID ou Nome do artista para atualizar: ");
        let artist;
        if (!isNaN(Number(input))) {
            artist = this.artistController.getArtist(Number(input));
        }
        else {
            artist = this.artistController.getArtist(input);
        }
        if (artist) {
            const namePrompt = `Novo nome (${artist.getName()}): `;
            const bioPrompt = `Nova bio (${artist.getBio()}): `;
            const birthYearPrompt = `Novo ano de nascimento (${artist.getBirthYear()}): `;
            const instagramPrompt = `Novo Instagram (${artist.getInstagram()}): `;
            let newName = readlineSync.question(namePrompt);
            if (!newName.trim())
                newName = artist.getName();
            let newBio = readlineSync.question(bioPrompt);
            if (!newBio.trim())
                newBio = artist.getBio();
            let newBirthYearInput = readlineSync.question(birthYearPrompt);
            let newBirthYear = newBirthYearInput.trim() ? Number(newBirthYearInput) : artist.getBirthYear();
            let newInstagram = readlineSync.question(instagramPrompt);
            if (!newInstagram.trim())
                newInstagram = artist.getInstagram();
            const updated = this.artistController.updateArtist(artist.getId(), newName, newBio, newBirthYear, newInstagram);
            if (updated) {
                this.message.showMessage(EnumType_1.MessageType.Success);
            }
            else {
                this.message.showMessage(EnumType_1.MessageType.Error);
            }
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    deleteArtist() {
        const input = readlineSync.question("Digite o ID ou Nome do artista para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.artistController.deleteArtist(Number(input));
        }
        else {
            deleted = this.artistController.deleteArtist(input);
        }
        if (deleted) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
}
exports.default = ArtistView;
