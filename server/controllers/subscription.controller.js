import { SubscriptionModel } from "../model/subscription.model.js";

export async function getSubscribers(req, res) {
  try {
    const subscribers = await SubscriptionModel.find({});
    return res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error while getting subscribers", error);
  };
};

export async function subscribe(req, res) {
  try {
    const { chatId, name, location } = req.body;
    if(!chatId || !name || !location) {
      return res.status(400).send("Please fill all the details.");
    };

    const isAlreadySubscribed = await SubscriptionModel.findOne({ chatId });
    if(isAlreadySubscribed) {
      return res.status(409).send('Already subscribed.');
    };
    
    const newSubscriber = new SubscriptionModel({
      chatId,
      name,
      location,
    });

    await newSubscriber.save();
    return res.status(201).send('Subscribed successfully.')
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error in subscribe route", error);
  };
};

export async function update(req, res) {
  try {
    const subscriberId = req.params.id;
    const { chatId, name, location, isBlocked } = req.body;

    const subscriber = await SubscriptionModel.findById(subscriberId);
    if(!subscriber) {
      return res.status(404).send(`Subscriber with Id ${subscriberId} not found.`);
    };

    const updatedSubscriber = await SubscriptionModel.findByIdAndUpdate(subscriberId, {
      chatId,
      name,
      location,
      isBlocked,
    });

    await updatedSubscriber.save();
    res.status(200).send('Subscriber updated successfully.')
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error in update route", error);
  };
};

export async function deleteSubscriber(req, res) {
  try {
    const subscriberId = req.params.id;
    
    const subscriber = await SubscriptionModel.findById(subscriberId);
    if(!subscriber) {
      return res.status(404).send(`Subscriber with Id ${subscriberId} not found.`);
    };

    await SubscriptionModel.findByIdAndDelete(subscriberId);
    res.status(200).send('Subscriber removed successfully.');
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error while deleting a subscriber", error);
  };
};
