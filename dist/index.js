"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./controller/MainController"));
const MainScreen_1 = __importDefault(require("./view/MainScreen"));
const mainController = new MainController_1.default();
const mainScreen = new MainScreen_1.default(mainController);
mainScreen.start();
