import Offer from '../models/Offer.js';

// Get all offers
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create offer
export const createOffer = async (req, res) => {
  try {
    const { couponName, discount, minimumPurchase } = req.body;
    const exists = await Offer.findOne({ couponName });
    if (exists) return res.status(400).json({ message: 'Coupon already exists' });
    const offer = await Offer.create({ couponName, discount, minimumPurchase });
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update / toggle offer
export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const fields = ['couponName', 'discount', 'minimumPurchase', 'active'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) offer[f] = req.body[f];
    });

    const updated = await offer.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete offer
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    await offer.deleteOne();
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
