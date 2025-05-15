import { MessageType } from "./EnumType";

export default class Message {
    showMessage(type: MessageType) {
        console.log(type);
    }
}

