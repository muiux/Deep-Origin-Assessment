import mongoose from "mongoose";

export interface UrlDocument extends mongoose.Document {
    originalUrl: string;
    slug: string;
    visits: number;
    createdAt: Date;
}

const UrlSchema = new mongoose.Schema<UrlDocument>({
  originalUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  visits: {type: Number, required: true, default: 0},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Url", UrlSchema);
