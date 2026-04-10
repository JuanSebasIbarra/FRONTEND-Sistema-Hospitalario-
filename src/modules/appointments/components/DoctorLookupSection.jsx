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

export function DoctorLookupSection({
  doctors,
  errorMessage,
  isLoading,
  onSpecialtyChange,
  selectedSpecialty,
  specialtyOptions,
}) {
  return (
    <section className="lookup-section">
      <div className="lookup-controls">
        <label className="form-field" htmlFor="specialtyLookup">
          <span>Especialidad</span>
          <select
            id="specialtyLookup"
            value={selectedSpecialty}
            onChange={(event) => onSpecialtyChange(event.target.value)}
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
