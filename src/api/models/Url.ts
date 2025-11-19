import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    campaignId: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
}, {
    timestamps: true,
});

export const UrlModel = mongoose.model('Url', UrlSchema);
