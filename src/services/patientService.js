import { apiClient } from './apiClient';

export const patientService = {
  getAll() {
    return apiClient.get('/patients');
  },
};
