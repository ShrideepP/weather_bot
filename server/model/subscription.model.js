import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  chatId: {
    type: String, 
    unique: true, 
    required: true 
  },
  name: {
    type: String, 
    required: true 
  },
  location: {
    type: String, 
    required: true 
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
});

export const SubscriptionModel = mongoose.model('subscription', subscriptionSchema);
