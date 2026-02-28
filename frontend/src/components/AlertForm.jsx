import { useState } from 'react';
import { createAlert } from '../api';

const AlertForm = ({ onAlertCreated }) => {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    visaType: 'Tourist',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createAlert(formData);
      setFormData({
        country: '',
        city: '',
        visaType: 'Tourist',
      });
      onAlertCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alert-form">
      <h2>Create New Alert</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder="e.g., India"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="e.g., Mumbai"
          />
        </div>

        <div className="form-group">
          <label htmlFor="visaType">Visa Type:</label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
          >
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Alert'}
        </button>
      </form>
    </div>
  );
};

export default AlertForm;





