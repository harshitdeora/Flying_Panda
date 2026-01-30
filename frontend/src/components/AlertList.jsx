import { useState, useEffect } from 'react';
import { fetchAlerts, updateAlert, deleteAlert } from '../api';

const AlertList = ({ refreshTrigger }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadAlerts();
  }, [refreshTrigger]);

  const loadAlerts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (alert) => {
    setUpdatingId(alert._id);
    try {
      const statusCycle = {
        Active: 'Booked',
        Booked: 'Expired',
        Expired: 'Active',
      };
      const newStatus = statusCycle[alert.status];
      await updateAlert(alert._id, { status: newStatus });
      loadAlerts();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alert?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteAlert(id);
      loadAlerts();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading alerts...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (alerts.length === 0) {
    return <div className="no-alerts">No alerts found. Create your first alert above!</div>;
  }

  return (
    <div className="alert-list">
      <h2>Alerts ({alerts.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Visa Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert._id}>
              <td>{alert.country}</td>
              <td>{alert.city}</td>
              <td>{alert.visaType}</td>
              <td>
                <span className={`status status-${alert.status.toLowerCase()}`}>
                  {alert.status}
                </span>
              </td>
              <td>{formatDate(alert.createdAt)}</td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => handleStatusUpdate(alert)}
                  disabled={updatingId === alert._id}
                >
                  {updatingId === alert._id ? 'Updating...' : 'Update Status'}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(alert._id)}
                  disabled={deletingId === alert._id}
                >
                  {deletingId === alert._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertList;



