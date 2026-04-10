import { apiClient } from './apiClient';

export const medicalHistoryService = {
  getAll() {
    return apiClient.get('/api/clinic/medical-history');
  },

  getMedicalHistoryByPatientId(patientId) {
    return apiClient.get(`/api/clinic/medical-history/${patientId}`);
  },
};