import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const filesData = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    datatransfered: {
        type: String,
        enum: ["document","image","video","audio","other"],
        required: true,
    },
    bucketField:{
        type: String,
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    storeit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoreMetric"
        }
    ]
}, { timestamps: true } )

export default mongoose.model.Schema("FilesData",filesData);