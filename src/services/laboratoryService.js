import { apiClient } from './apiClient';

export const laboratoryService = {
  getAll() {
    return apiClient.get('/clinic/lab-tests');
  },

  requestLaboratoryExams(payload) {
    return apiClient.post('/clinic/lab-tests', payload);
  },
};