import { ModulePage } from '../../../components/ui/ModulePage';
import { DoctorLookupSection } from '../components/DoctorLookupSection';

export function AppointmentsPage() {
  return (
    <ModulePage
      title="Citas"
      description="Consulte médicos por especialidad para preparar la futura programación de citas."
    >
      <DoctorLookupSection />
    </ModulePage>
  );
}
