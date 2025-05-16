import ArtController from '../../controller/ArtController';
import Database from '../../db/Database';
import ArtView from '../../view/ArtView';
import Message from '../../model/Message';



const db = new Database();
const artController = new ArtController(db);
const message = new Message();
const artView = new ArtView(artController, message);

// Exibir a galeria ao iniciar
artView.start();
