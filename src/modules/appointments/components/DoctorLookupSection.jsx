import { useEffect, useState } from 'react';
import { appointmentService } from '../../../services/appointmentService';
import { specialtyOptions } from '../constants/specialties';

function extractDoctors(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.doctors)) {
    return responseData.doctors;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
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

  return 'No se pudieron consultar los médicos. Intente nuevamente.';
}

function getDoctorName(doctor) {
  return doctor.fullName || doctor.name || doctor.doctorName || 'Médico sin nombre';
}

function getDoctorSpecialty(doctor) {
  return doctor.specialtyName || doctor.specialty || 'Especialidad no disponible';
}

function getDoctorSubtitle(doctor) {
  return (
    doctor.email ||
    doctor.phoneNumber ||
    doctor.phone ||
    doctor.licenseNumber ||
    'Información adicional no disponible'
  );
}

export function DoctorLookupSection() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDoctors() {
      if (!selectedSpecialty) {
        setDoctors([]);
        setErrorMessage('');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await appointmentService.getDoctorsBySpecialty(
          selectedSpecialty,
        );

        if (!isMounted) {
          return;
        }

        setDoctors(extractDoctors(response.data));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setDoctors([]);
        setErrorMessage(getErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDoctors();

    return () => {
      isMounted = false;
    };
  }, [selectedSpecialty]);

  function handleSpecialtyChange(event) {
    setSelectedSpecialty(event.target.value);
  }

  return (
    <section className="lookup-section">
      <div className="lookup-controls">
        <label className="form-field" htmlFor="specialty">
          <span>Especialidad</span>
          <select
            id="specialty"
            name="specialty"
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
            disabled={isLoading}
          >
            {specialtyOptions.map((specialty) => (
              <option key={specialty.value || 'empty'} value={specialty.value}>
                {specialty.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!selectedSpecialty ? (
        <p className="status-message status-message-neutral">
          Seleccione una especialidad para consultar los médicos disponibles.
        </p>
      ) : null}

      {isLoading ? (
        <p className="status-message status-message-neutral">Consultando médicos...</p>
      ) : null}

      {!isLoading && errorMessage ? (
        <p className="status-message status-message-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {!isLoading && !errorMessage && selectedSpecialty && doctors.length === 0 ? (
        <p className="status-message status-message-neutral">
          No se encontraron médicos para la especialidad seleccionada.
        </p>
      ) : null}

      {!isLoading && !errorMessage && doctors.length > 0 ? (
        <div className="doctor-grid">
          {doctors.map((doctor, index) => (
            <article
              key={doctor.id || doctor.documentNumber || doctor.licenseNumber || index}
              className="doctor-card"
            >
              <p className="doctor-card-kicker">Médico disponible</p>
              <h3>{getDoctorName(doctor)}</h3>
              <p className="doctor-card-specialty">{getDoctorSpecialty(doctor)}</p>
              <p className="doctor-card-detail">{getDoctorSubtitle(doctor)}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
