import { Model } from "mongoose";


class GenericService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: T) {
        const newData = await this.model.create(data);     

        if (!newData) {
            throw new Error("Failed to create data");
        }
        
        return newData;
    }

    async findAll() {
        const data = await this.model.find();

        if (!data) {
            throw new Error("No data found");
        }

        return data;
    }

    async findOne(id: string) {

        if (!id) {
            throw new Error("No id provided");
        }

        const data = await this.model.findById(id);

        if (!data) {
            throw new Error("No data found");
        }

        return data;
    }

    async update(id: string, data: Partial<T>) {

        if (!id) {
            throw new Error("No id provided");
        }

        if (!data) {
            throw new Error("No data provided");
        }

        const updatedData = await this.model.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            throw new Error("Failed to update data");
        }

        return updatedData;
    }

    async delete(id: string) {

        if (!id) {
            throw new Error("No id provided");
        }

        await this.model.findByIdAndDelete(id);

        return { message: "Data deleted successfully" };
    }
}

export default GenericService;