import mongoose, { Schema } from "mongoose";
import { IMessage } from "../entities/message.entity";


const messageSchema = new Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;