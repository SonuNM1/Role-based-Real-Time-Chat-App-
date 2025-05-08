import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    to: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    groupId: {
        type: String 
    }, 
    message: {
        type: String, 
        required: true 
    }, 
    type: {
        type: String, 
        enum: ['private', 'group'], 
        required: true 
    }, 
    timestamp: {
        type: Date, 
        default: Date.now 
    }
})

export default mongoose.model('Message', messageSchema)

