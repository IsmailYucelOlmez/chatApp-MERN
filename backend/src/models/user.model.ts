import mongoose, { Schema } from "mongoose";
import { IUser } from "../entities/user.entity";
import bcrypt from "bcrypt";
import CustomError from "../lib/Error";
import { HTTP_CODES, PASS_LENGTH } from "../config/enum";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },   
    
}, {
    versionKey: false,
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

class User extends mongoose.Model<IUser> {

    validPassword(password:string):boolean {
        return bcrypt.compareSync(password, this.password);
    }

    static validateFieldsBeforeAuth(password:string): typeof CustomError | null {
        if (typeof password !== "string" || password.length < PASS_LENGTH)
            throw new CustomError({code:HTTP_CODES.UNAUTHORIZED, message: "Validation Error", description:"email or password wrong"});

        return null;
    }
}

userSchema.loadClass(User);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;