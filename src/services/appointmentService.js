import { apiClient } from './apiClient';

export const appointmentService = {
  getAll() {
    return apiClient.get('/appointments');
  },
};
