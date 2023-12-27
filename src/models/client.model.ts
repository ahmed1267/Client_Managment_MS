import mongoose, { Document, Schema} from 'mongoose'

export interface IClient extends Document {
    _id?: string;
    type?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    dataLifeTime?: number;
    createdAt?: number;
    deletedAt?: number;
    protectAgainstAutoDisable?: boolean;
    maintenanceAppEnabled?: boolean;
}

const clientSchema = new Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    dataLifeTime: Number,
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date,
    protectAgainstAutoDisable: Boolean,
    maintenanceAppEnabled: Boolean,
})

export const ClientModel = mongoose.model<IClient>('Client', clientSchema)