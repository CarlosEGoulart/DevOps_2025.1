"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtController_1 = __importDefault(require("../../controller/ArtController"));
const Database_1 = __importDefault(require("../../db/Database"));
const ArtView_1 = __importDefault(require("../../view/ArtView"));
const Message_1 = __importDefault(require("../../model/Message"));
const db = new Database_1.default();
const artController = new ArtController_1.default(db);
const message = new Message_1.default();
const artView = new ArtView_1.default(artController, message);
// Exibir a galeria ao iniciar
artView.start();
