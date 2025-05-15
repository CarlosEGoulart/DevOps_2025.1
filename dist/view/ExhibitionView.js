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
class ExhibitionView {
    constructor(exhibitionController, message) {
        this.exhibitionController = exhibitionController;
        this.message = message;
    }
    start() {
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
                    this.message.showMessage(EnumType_1.MessageType.Error);
            }
        }
    }
    listExhibitions() {
        const exhibitions = this.exhibitionController.listExhibitions();
        if (exhibitions.length === 0) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
            return;
        }
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getId()}, Título: ${exhibition.getName()}, Obras: ${exhibition.getArtWorks().length}`);
        });
    }
    viewExhibitionDetails() {
        const input = readlineSync.question("Digite o ID ou Título da exposição: ");
        let exhibition;
        if (!isNaN(Number(input))) {
            exhibition = this.exhibitionController.getExhibition(Number(input));
        }
        else {
            exhibition = this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            console.log(exhibition.getInfo());
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    createExhibition() {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const newExhibition = this.exhibitionController.createExhibition(title, description, []);
        if (newExhibition) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
    updateExhibition() {
        const input = readlineSync.question("Digite o ID ou Título da exposição para atualizar: ");
        let exhibition;
        if (!isNaN(Number(input))) {
            exhibition = this.exhibitionController.getExhibition(Number(input));
        }
        else {
            exhibition = this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            const titleInput = readlineSync.question(`Novo título (${exhibition.getName()}): `);
            const newTitle = titleInput.trim() === "" ? exhibition.getName() : titleInput;
            const descInput = readlineSync.question(`Nova descrição (${exhibition.getDescription()}): `);
            const newDescription = descInput.trim() === "" ? exhibition.getDescription() : descInput;
            const updated = this.exhibitionController.updateExhibition(exhibition.getId(), newTitle, newDescription, exhibition.getArtWorks());
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
    deleteExhibition() {
        const input = readlineSync.question("Digite o ID ou Título da exposição para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.exhibitionController.deleteExhibition(Number(input));
        }
        else {
            deleted = this.exhibitionController.deleteExhibition(input);
        }
        if (deleted) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    assignArtToExhibition() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        const assigned = this.exhibitionController.addArtToExhibition(Number(exhibitionInput), Number(artInput));
        if (assigned) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
    removeArtFromExhibition() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        const removed = this.exhibitionController.removeArtFromExhibition(Number(exhibitionInput), Number(artInput));
        if (removed) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
    getExhibitionArts() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const arts = this.exhibitionController.getExhibitionArts(Number(exhibitionInput));
        if (arts) {
            arts.forEach(art => {
                console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
            });
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
}
exports.default = ExhibitionView;
