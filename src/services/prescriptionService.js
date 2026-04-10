import { apiClient } from './apiClient';

export const prescriptionService = {
  getAll() {
    return apiClient.get('/api/clinic/prescriptions');
  },

  createPrescription(payload) {
    return apiClient.post('/api/clinic/prescriptions', payload);
  },
};