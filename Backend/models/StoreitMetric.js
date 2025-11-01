import mongoose from "mongoose";
import { ref } from "process";

const stroreitmetrics =  new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    accountId: {
        type: String,
        unique: true,
        required: true,
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FilesData",
        }
    ],
    extension: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    users: {
        type: Array,
    }
    

},{ timestamps: true });

export default mongoose.model('StoreMetric',stroreitmetrics);