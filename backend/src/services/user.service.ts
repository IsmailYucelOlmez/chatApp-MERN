import GenericService from "./generic.service";
import User from "../models/user.model";
import { IUser } from "../entities/user.entity";

class UserService extends GenericService<IUser> {
    
    constructor() {
        super(User);
    }

    async findByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }
    
}

export default new UserService();