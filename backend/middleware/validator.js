const validator = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { country, city, visaType, status } = req.body;

    // Validate country
    if (!country || typeof country !== 'string' || country.trim().length === 0) {
      return res.status(400).json({ error: 'Country is required and cannot be empty' });
    }

    // Validate city
    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return res.status(400).json({ error: 'City is required and cannot be empty' });
    }

    // Validate visaType
    const validVisaTypes = ['Tourist', 'Business', 'Student'];
    if (visaType && !validVisaTypes.includes(visaType)) {
      return res.status(400).json({ 
        error: `Invalid visaType. Must be one of: ${validVisaTypes.join(', ')}` 
      });
    }

    // Validate status
    const validStatuses = ['Active', 'Booked', 'Expired'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      });
    }
  }

  next();
};

module.exports = validator;



