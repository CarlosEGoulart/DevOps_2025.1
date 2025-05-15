import MainController from "../controller/MainController";
import ArtistView from "./ArtistView";
import ArtView from "./ArtView";
import ExhibitionView from "./ExhibitionView";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message";

export default class MainScreen {
    private mainController: MainController;
    private artistView: ArtistView;
    private artView: ArtView;
    private exhibitionView: ExhibitionView;
    private message: Message = new Message();

    constructor(mainController: MainController) {
        this.mainController = mainController;
        this.artistView = new ArtistView(this.mainController.artistController, this.message);
        this.artView = new ArtView(this.mainController.artController, this.message);
        this.exhibitionView = new ExhibitionView(this.mainController.exhibitionController, this.message);
    }

    public start(): void {
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
