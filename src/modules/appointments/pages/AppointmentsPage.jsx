import { useState } from 'react';
import { ModulePage } from '../../../components/ui/ModulePage';
import { appointmentService } from '../../../services/appointmentService';
import { AppointmentSchedulingForm } from '../components/AppointmentSchedulingForm';
import { DoctorLookupSection } from '../components/DoctorLookupSection';
import { specialtyOptions } from '../constants/specialties';
import { useDoctorsBySpecialty } from '../hooks/useDoctorsBySpecialty';

const initialFormData = {
  patientIdentifier: '',
  specialty: '',
  appointmentDate: '',
  doctorId: '',
};

function validateForm(formData) {
  const errors = {};

  if (!formData.patientIdentifier.trim()) {
    errors.patientIdentifier = 'El identificador del paciente es obligatorio.';
  }

  if (!formData.specialty) {
    errors.specialty = 'La especialidad es obligatoria.';
  }

  if (!formData.appointmentDate) {
    errors.appointmentDate = 'La fecha de la cita es obligatoria.';
  }

  return errors;
}

function buildPayload(formData) {
  const payload = {
    patientIdentifier: formData.patientIdentifier.trim(),
    specialty: formData.specialty,
    appointmentDate: formData.appointmentDate,
  };

  if (formData.doctorId) {
    payload.doctorId = formData.doctorId;
  }

  return payload;
}

function getErrorMessage(error) {
  const responseData = error?.response?.data;

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (typeof responseData?.message === 'string' && responseData.message.trim()) {
    return responseData.message;
  }

  if (Array.isArray(responseData?.message) && responseData.message.length > 0) {
    return responseData.message.join(' ');
  }

  return 'No se pudo programar la cita. Intente nuevamente.';
}

export function AppointmentsPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [statusError, setStatusError] = useState('');
  const [statusSuccess, setStatusSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { doctors, doctorLookupError, isLoadingDoctors } = useDoctorsBySpecialty(
    formData.specialty,
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => {
      if (name === 'specialty') {
        return {
          ...currentFormData,
          specialty: value,
          doctorId: '',
        };
      }

      return {
        ...currentFormData,
        [name]: value,
      };
    });

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });

    setStatusError('');
    setStatusSuccess('');
  }

  function handleSpecialtyChange(specialty) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      specialty,
      doctorId: '',
    }));

    setErrors((currentErrors) => {
      if (!currentErrors.specialty) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors.specialty;
      return nextErrors;
    });

    setStatusError('');
    setStatusSuccess('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusSuccess('');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      setStatusError('');
      setStatusSuccess('');

      await appointmentService.create(buildPayload(formData));

      setFormData(initialFormData);
      setStatusSuccess('La cita fue programada correctamente.');
    } catch (error) {
      setStatusError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ModulePage
      title="Citas"
      description="Consulte médicos por especialidad y programe nuevas citas."
    >
      <div className="appointment-layout">
        <section className="appointment-section">
          <div className="section-heading">
            <p className="section-kicker">Programación</p>
            <h3>Nueva cita</h3>
            <p>
              Complete los datos requeridos para solicitar una cita médica.
            </p>
          </div>

          <AppointmentSchedulingForm
            doctors={doctors}
            errors={errors}
            formData={formData}
            isLoadingDoctors={isLoadingDoctors}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
            specialtyOptions={specialtyOptions}
            statusError={statusError}
            statusSuccess={statusSuccess}
          />
        </section>

        <section className="appointment-section">
          <div className="section-heading">
            <p className="section-kicker">Consulta</p>
            <h3>Médicos por especialidad</h3>
            <p>
              Los resultados se actualizan según la especialidad elegida en el
              formulario.
            </p>
          </div>

          <DoctorLookupSection
            doctors={doctors}
            errorMessage={doctorLookupError}
            isLoading={isLoadingDoctors}
            onSpecialtyChange={handleSpecialtyChange}
            selectedSpecialty={formData.specialty}
            specialtyOptions={specialtyOptions}
          />
        </section>
      </div>
    </ModulePage>
  );
}
