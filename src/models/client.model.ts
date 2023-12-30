import mongoose from 'mongoose'

export interface IClient extends mongoose.Document {
    _id: string;
    type: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    dataLifeTime?: number;
    createdAt: number;
    deletedAt?: number;
    protectAgainstAutoDisable?: boolean;
    maintenanceAppEnabled?: boolean;
}

const clientSchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    dataLifeTime: Number,
    deletedAt: Date,
    protectAgainstAutoDisable: Boolean,
    maintenanceAppEnabled: Boolean,
}, {
    timestamps: true
})

export const ClientModel = mongoose.model<IClient>('Client', clientSchema)