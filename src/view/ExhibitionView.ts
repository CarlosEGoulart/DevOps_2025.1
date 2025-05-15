import ExhibitionController from "../controller/ExhibitionController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message";
import { MessageType } from "../model/EnumType";
import Exhibition from "../model/Exhibition";

export default class ExhibitionView {
    private exhibitionController: ExhibitionController;
    private message: Message;

    constructor(exhibitionController: ExhibitionController, message: Message) {
        this.exhibitionController = exhibitionController;
        this.message = message;
    }

    public start(): void {
        while (true) {
            console.log("\n--- Gerenciar Exposições ---");
            console.log("1. Listar Exposições");
            console.log("2. Visualizar Detalhes da Exposição");
            console.log("3. Criar Nova Exposição");
            console.log("4. Atualizar Exposição");
            console.log("5. Adicionar Obras à Exposição");
            console.log("6. Remover Obras da Exposição");
            console.log("7. Listar Obras da Exposição");
            console.log("8. Deletar Exposição");
            console.log("0. Voltar ao Menu Principal");

            const choice = readlineSync.questionInt("Escolha uma opção: ");

            switch (choice) {
                case 1:
                    this.listExhibitions();
                    break;
                case 2:
                    this.viewExhibitionDetails();
                    break;
                case 3:
                    this.createExhibition();
                    break;
                case 4:
                    this.updateExhibition();
                    break;
                case 5:
                    this.assignArtToExhibition();
                    break;
                case 6:
                    this.removeArtFromExhibition();
                    break;
                case 7:
                    this.getExhibitionArts();
                    break;
                case 8:
                    this.deleteExhibition();
                    break;
                case 0:
                    return;
                default:
                    this.message.showMessage(MessageType.Error);
            }
        }
    }

    private listExhibitions(): void {
        const exhibitions = this.exhibitionController.listExhibitions();
        if (exhibitions.length === 0) {
            this.message.showMessage(MessageType.NotFound);
            return;
        }
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getId()}, Título: ${exhibition.getName()}, Obras: ${exhibition.getArtWorks().length}`);
        });
    }

    private viewExhibitionDetails(): void {
        const input = readlineSync.question("Digite o ID ou Título da exposição: ");
        let exhibition: Exhibition | undefined;
        if (!isNaN(Number(input))) {
            exhibition = this.exhibitionController.getExhibition(Number(input));
        } else {
            exhibition = this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            console.log(exhibition.getInfo());
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private createExhibition(): void {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const newExhibition = this.exhibitionController.createExhibition(title, description, []);
        if (newExhibition) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.Error);
        }
    }

    private updateExhibition(): void {
        const input = readlineSync.question("Digite o ID ou Título da exposição para atualizar: ");
        let exhibition: Exhibition | undefined;
        if (!isNaN(Number(input))) {
            exhibition = this.exhibitionController.getExhibition(Number(input));
        } else {
            exhibition = this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            const titleInput = readlineSync.question(`Novo título (${exhibition.getName()}): `);
            const newTitle = titleInput.trim() === "" ? exhibition.getName() : titleInput;
            const descInput = readlineSync.question(`Nova descrição (${exhibition.getDescription()}): `);
            const newDescription = descInput.trim() === "" ? exhibition.getDescription() : descInput;
            
            const updated = this.exhibitionController.updateExhibition(exhibition.getId(), newTitle, newDescription, exhibition.getArtWorks());
            if (updated) {
                this.message.showMessage(MessageType.Success);
            } else {
                this.message.showMessage(MessageType.Error);
            }
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private deleteExhibition(): void {
        const input = readlineSync.question("Digite o ID ou Título da exposição para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.exhibitionController.deleteExhibition(Number(input));
        } else {
            deleted = this.exhibitionController.deleteExhibition(input);
        }
        if (deleted) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.NotFound);
        }
    }

    private assignArtToExhibition(): void {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        const assigned = this.exhibitionController.addArtToExhibition(Number(exhibitionInput), Number(artInput));
        if (assigned) {
            this.message.showMessage(MessageType.Success);
        } else {
            this.message.showMessage(MessageType.Error);
        }
    }

    private removeArtFromExhibition(): void{
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        const removed = this.exhibitionController.removeArtFromExhibition(Number(exhibitionInput), Number(artInput));
        if (removed){
            this.message.showMessage(MessageType.Success);
        }
        else{
            this.message.showMessage(MessageType.Error);
        }
    }

    public getExhibitionArts(): void{
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const arts = this.exhibitionController.getExhibitionArts(Number(exhibitionInput));
        if (arts){
            arts.forEach(art => {
                console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
            });
            this.message.showMessage(MessageType.Success);
        }
        else{
            this.message.showMessage(MessageType.Error);
        }
    }
}
