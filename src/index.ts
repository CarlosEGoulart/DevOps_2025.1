import MainController from "./controller/MainController";
import MainScreen from "./view/MainScreen";

const mainController = new MainController();
const mainScreen = new MainScreen(mainController);
mainScreen.start();