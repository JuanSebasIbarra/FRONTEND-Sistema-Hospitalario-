import { homeRoutes } from '../modules/home/routes';
import { patientRoutes } from '../modules/patients/routes';
import { appointmentRoutes } from '../modules/appointments/routes';
import { medicalHistoryRoutes } from '../modules/medicalHistory/routes';
import { prescriptionRoutes } from '../modules/prescriptions/routes';
import { laboratoryRoutes } from '../modules/laboratory/routes';
import { notFoundRoutes } from '../modules/notFound/routes';

export const appRoutes = [
  ...homeRoutes,
  ...patientRoutes,
  ...appointmentRoutes,
  ...medicalHistoryRoutes,
  ...prescriptionRoutes,
  ...laboratoryRoutes,
  ...notFoundRoutes,
];
