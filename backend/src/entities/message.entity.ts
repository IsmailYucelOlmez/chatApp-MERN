import { IUser } from "./user.entity";


export interface IMessage {
    id: string;
    content: string;
    sender: IUser;
    receiver: IUser;
    isRead: boolean;
    isDeleted: boolean;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}