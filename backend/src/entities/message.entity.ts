import mongoose from "mongoose";

export interface IMessage {
    _id: string;
    text: string;
    image: string;
    senderId: mongoose.Schema.Types.ObjectId;
    receiverId: mongoose.Schema.Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}