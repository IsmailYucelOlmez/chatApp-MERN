import mongoose, { Schema } from "mongoose";
import { IMessage } from "../entities/message.entity";


const messageSchema = new Schema<IMessage>({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isEdited: {
        type: Boolean,
        default: false,
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