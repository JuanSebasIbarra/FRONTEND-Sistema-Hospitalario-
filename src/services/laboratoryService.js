import { apiClient } from './apiClient';

export const laboratoryService = {
  getAll() {
    return apiClient.get('/laboratory');
  },
};
