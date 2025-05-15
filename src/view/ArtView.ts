import ArtController from "../controller/ArtController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message";
import { MessageType } from "../model/EnumType";
import Art from "../model/Art";

export default class ArtView {
    private artController: ArtController;
    private message: Message;

    constructor(artController: ArtController, message: Message) {
        this.artController = artController;
        this.message = message;
    }

    public start(): void {
        while (true) {
            console.log("\n--- Gerenciar Obras de Arte ---");
            console.log("1. Listar Obras de Arte");
            console.log("2. Visualizar Detalhes da Obra");
            console.log("3. Criar Nova Obra de Arte");
            console.log("4. Atualizar Obra de Arte");
            console.log("5. Deletar Obra de Arte");
            console.log("6. Atribuir Artista à Obra");
            console.log("0. Voltar ao Menu Principal");

            const choice = readlineSync.questionInt("Escolha uma opção: ");

            switch (choice) {
                case 1:
                    this.listArts();
                    break;
                case 2:
                    this.viewArtDetails();
                    break;
                case 3:
                    this.createArt();
                    break;
                case 4:
                    this.updateArt();
                    break;
                case 5:
                    this.deleteArt();
                    break;
                case 6:
                    this.assignArtistToArt();
                    break;
                case 0:
                    return;
                default:
                    this.message.showMessage(MessageType.Error);
            }
        }
    }

    private listArts(): void {
        const arts = this.artController.listArts();
        if (arts.length === 0) {
            this.message.showMessage(MessageType.NotFound);
            return;
        }
        arts.forEach(art => {
            console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
        });
    }

    private viewArtDetails(): void {
        const input = readlineSync.question("Digite o ID ou Título da obra: ");
        let art: Art | undefined;
        if (!isNaN(Number(input))) {
            art = this.artController.getArt(Number(input));
        } else {
            art = this.artController.getArt(input);
        }
        if (art) {
            console.log(art.getInfo());
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private createArt(): void {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const year = readlineSync.questionInt("Ano: ");
        const newArt = this.artController.createArt(title, description, year);
        if (newArt) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.Error);
        }
    }

    private updateArt(): void {
        const input = readlineSync.question("Digite o ID ou Título da obra para atualizar: ");
        let art: Art | undefined;
        if (!isNaN(Number(input))) {
            art = this.artController.getArt(Number(input));
        } else {
            art = this.artController.getArt(input);
        }
        if (art) {
            const newTitleInput = readlineSync.question(`Novo título (${art.getName()}): `);
            const newTitle = newTitleInput.trim() === "" ? art.getName() : newTitleInput;

            const newDescriptionInput = readlineSync.question(`Nova descrição (${art.getDescription()}): `);
            const newDescription = newDescriptionInput.trim() === "" ? art.getDescription() : newDescriptionInput;

            const newYearInput = readlineSync.question(`Novo ano (${art.getYear()}): `);
            const newYear = newYearInput.trim() === "" ? art.getYear() : Number(newYearInput);

            const updated = this.artController.updateArt(art.getId(), newTitle, newDescription, newYear);
            if (updated) {
                this.message.showMessage(MessageType.Success);
            } else {
                this.message.showMessage(MessageType.Error);
            }
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private deleteArt(): void {
        const input = readlineSync.question("Digite o ID ou Título da obra para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.artController.deleteArt(Number(input));
        } else {
            deleted = this.artController.deleteArt(input);
        }
        if (deleted) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private assignArtistToArt(): void {
        const artInput = readlineSync.question("Digite o ID da obra: ");
        const artistInput = readlineSync.question("Digite o ID do artista: ");
        const assigned = this.artController.assignArtistToArt(Number(artInput), Number(artistInput));
        if (assigned) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.Error);
        }
    }
}