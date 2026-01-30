const Alert = require('../models/Alert');

// Get all alerts with optional filters
const getAllAlerts = async (req, res, next) => {
  try {
    const { country, status, visaType } = req.query;
    const filter = {};

    if (country) {
      filter.country = country;
    }
    if (status) {
      filter.status = status;
    }
    if (visaType) {
      filter.visaType = visaType;
    }

    const alerts = await Alert.find(filter).sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    next(error);
  }
};

// Create a new alert
const createAlert = async (req, res, next) => {
  try {
    const { country, city, visaType, status } = req.body;
    
    const alert = new Alert({
      country: country.trim(),
      city: city.trim(),
      visaType,
      status: status || 'Active'
    });

    const savedAlert = await alert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    next(error);
  }
};

// Update alert status
const updateAlert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, country, city, visaType } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (country) updateData.country = country.trim();
    if (city) updateData.city = city.trim();
    if (visaType) updateData.visaType = visaType;

    const alert = await Alert.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.status(200).json(alert);
  } catch (error) {
    next(error);
  }
};

// Delete an alert
const deleteAlert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const alert = await Alert.findByIdAndDelete(id);

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.status(200).json({ message: 'Alert deleted successfully', alert });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlerts,
  createAlert,
  updateAlert,
  deleteAlert
};


