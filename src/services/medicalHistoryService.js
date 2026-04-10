import { apiClient } from './apiClient';

export const medicalHistoryService = {
  getAll() {
    return apiClient.get('/medical-history');
  },
};
