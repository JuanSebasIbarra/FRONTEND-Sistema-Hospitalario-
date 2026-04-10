import { apiClient } from './apiClient';

export const patientService = {
  getAll() {
    return apiClient.get('/patients');
  },

  create(patientData) {
    return apiClient.post('/patients', patientData);
  },
};
