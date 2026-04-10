import { ModulePage } from '../../../components/ui/ModulePage';
import { PatientRegistrationForm } from '../components/PatientRegistrationForm';

export function PatientsPage() {
  return (
    <ModulePage
      title="Pacientes"
      description="Registre nuevos pacientes en el sistema médico."
    >
      <PatientRegistrationForm />
    </ModulePage>
  );
}
