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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtistView_1 = __importDefault(require("./ArtistView"));
const ArtView_1 = __importDefault(require("./ArtView"));
const ExhibitionView_1 = __importDefault(require("./ExhibitionView"));
const readlineSync = __importStar(require("readline-sync"));
const Message_1 = __importDefault(require("../model/Message"));
class MainScreen {
    constructor(mainController) {
        this.message = new Message_1.default();
        this.mainController = mainController;
        this.artistView = new ArtistView_1.default(this.mainController.artistController, this.message);
        this.artView = new ArtView_1.default(this.mainController.artController, this.message);
        this.exhibitionView = new ExhibitionView_1.default(this.mainController.exhibitionController, this.message);
    }
    start() {
        while (true) {
            console.log("\n--- Menu Principal ---");
            console.log("1. Gerenciar Artistas");
            console.log("2. Gerenciar Obras de Arte");
            console.log("3. Gerenciar Exposições");
            console.log("0. Sair");
            const choice = readlineSync.questionInt("Escolha uma opção: ");
            switch (choice) {
                case 1:
                    this.artistView.start();
                    break;
                case 2:
                    this.artView.start();
                    break;
                case 3:
                    this.exhibitionView.start();
                    break;
                case 0:
                    console.log("Saindo do sistema...");
                    return;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}
exports.default = MainScreen;
