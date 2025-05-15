import ArtistController from "../controller/ArtistController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message";
import { MessageType } from "../model/EnumType";

export default class ArtistView {
    private artistController: ArtistController;
    private message: Message;

    constructor(artistController: ArtistController, message: Message) {
        this.artistController = artistController;
        this.message = message;
    }

    public start(): void {
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
                    this.message.showMessage(MessageType.Error);
            }
        }
    }

    private listArtists(): void {
        const artists = this.artistController.listArtists();
        if (artists.length === 0) {
            this.message.showMessage(MessageType.NotFound);
            return;
        }
        artists.forEach(artist => {
            console.log(`ID: ${artist.getId()}, Nome: ${artist.getName()}`);
        });
    }

    private viewArtistDetails(): void {
        const input = readlineSync.question("Digite o ID ou Nome do artista: ");
        let artist;
        if (!isNaN(Number(input))) {
            artist = this.artistController.getArtist(Number(input));
        } else {
            artist = this.artistController.getArtist(input);
        }
        if (artist) {
            console.log(artist.getInfo());
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private createArtist(): void {
        const name = readlineSync.question("Nome: ");
        const bio = readlineSync.question("Bio: ");
        const birthYear = readlineSync.questionInt("Ano de nascimento: ");
        const instagram = readlineSync.question("Instagram: ");
        const newArtist = this.artistController.createArtist(name, bio, birthYear, instagram);
        if (newArtist) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.Error);
        }
    }

    private updateArtist(): void {
        const input = readlineSync.question("Digite o ID ou Nome do artista para atualizar: ");
        let artist;
        if (!isNaN(Number(input))) {
            artist = this.artistController.getArtist(Number(input));
        } else {
            artist = this.artistController.getArtist(input);
        }
        if (artist) {
            const namePrompt = `Novo nome (${artist.getName()}): `;
            const bioPrompt = `Nova bio (${artist.getBio()}): `;
            const birthYearPrompt = `Novo ano de nascimento (${artist.getBirthYear()}): `;
            const instagramPrompt = `Novo Instagram (${artist.getInstagram()}): `;

            let newName = readlineSync.question(namePrompt);
            if (!newName.trim()) newName = artist.getName();

            let newBio = readlineSync.question(bioPrompt);
            if (!newBio.trim()) newBio = artist.getBio();

            let newBirthYearInput = readlineSync.question(birthYearPrompt);
            let newBirthYear = newBirthYearInput.trim() ? Number(newBirthYearInput) : artist.getBirthYear();

            let newInstagram = readlineSync.question(instagramPrompt);
            if (!newInstagram.trim()) newInstagram = artist.getInstagram();

            const updated = this.artistController.updateArtist(artist.getId(), newName, newBio, newBirthYear, newInstagram);
            if (updated) {
                this.message.showMessage(MessageType.Success);
            } else {
                this.message.showMessage(MessageType.Error);
            }
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private deleteArtist(): void {
        const input = readlineSync.question("Digite o ID ou Nome do artista para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.artistController.deleteArtist(Number(input));
        } else {
            deleted = this.artistController.deleteArtist(input);
        }
        if (deleted) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }
}