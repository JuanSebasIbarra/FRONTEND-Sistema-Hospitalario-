import { apiClient } from './apiClient';

export const appointmentService = {
  getAll() {
    return apiClient.get('/appointments');
  },

  getDoctorsBySpecialty(specialty) {
    return apiClient.get('/appointments/doctors-by-specialty', {
      params: {
        specialty,
      },
    });
  },

  create(appointmentData) {
    return apiClient.post('/appointments', appointmentData);
  },
};
