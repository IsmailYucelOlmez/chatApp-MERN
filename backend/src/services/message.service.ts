import { IMessage } from "../entities/message.entity";
import GenericService from "./generic.service";
import Message from "../models/message.model";


class MessageService extends GenericService<IMessage> {
    constructor() {
        super(Message);
    }

}

export default new MessageService();