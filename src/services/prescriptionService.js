import { apiClient } from './apiClient';

export const prescriptionService = {
  getAll() {
    return apiClient.get('/prescriptions');
  },
};
