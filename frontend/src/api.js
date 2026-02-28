const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const fetchAlerts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.country) queryParams.append('country', filters.country);
  if (filters.status) queryParams.append('status', filters.status);
  if (filters.visaType) queryParams.append('visaType', filters.visaType);

  const url = `${API_BASE_URL}/alerts${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.statusText}`);
  }
  
  return response.json();
};

export const createAlert = async (alertData) => {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alertData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create alert');
  }

  return response.json();
};

export const updateAlert = async (id, updateData) => {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update alert');
  }

  return response.json();
};

export const deleteAlert = async (id) => {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete alert');
  }

  return response.json();
};





