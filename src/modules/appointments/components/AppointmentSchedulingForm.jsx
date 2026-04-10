function getDoctorOptionLabel(doctor) {
  const name = doctor.fullName || doctor.name || doctor.doctorName || 'Médico';
  const specialty = doctor.specialtyName || doctor.specialty;

  return specialty ? `${name} - ${specialty}` : name;
}

export function AppointmentSchedulingForm({
  doctors,
  errors,
  formData,
  isLoadingDoctors,
  isSubmitting,
  onChange,
  onSubmit,
  specialtyOptions,
  statusError,
  statusSuccess,
}) {
  return (
    <form className="appointment-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <label className="form-field" htmlFor="patientIdentifier">
          <span>Identificador del paciente</span>
          <input
            id="patientIdentifier"
            name="patientIdentifier"
            type="text"
            value={formData.patientIdentifier}
            onChange={onChange}
            placeholder="Ingrese el documento o identificador"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.patientIdentifier)}
            aria-describedby={
              errors.patientIdentifier ? 'patientIdentifier-error' : undefined
            }
          />
          {errors.patientIdentifier ? (
            <small id="patientIdentifier-error" className="field-error">
              {errors.patientIdentifier}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="specialty">
          <span>Especialidad</span>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={onChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.specialty)}
            aria-describedby={errors.specialty ? 'specialty-error' : undefined}
          >
            {specialtyOptions.map((specialty) => (
              <option key={specialty.value || 'empty'} value={specialty.value}>
                {specialty.label}
              </option>
            ))}
          </select>
          {errors.specialty ? (
            <small id="specialty-error" className="field-error">
              {errors.specialty}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="appointmentDate">
          <span>Fecha de la cita</span>
          <input
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            value={formData.appointmentDate}
            onChange={onChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.appointmentDate)}
            aria-describedby={
              errors.appointmentDate ? 'appointmentDate-error' : undefined
            }
          />
          {errors.appointmentDate ? (
            <small id="appointmentDate-error" className="field-error">
              {errors.appointmentDate}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="doctorId">
          <span>Médico</span>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={onChange}
            disabled={isSubmitting || isLoadingDoctors || !formData.specialty}
          >
            <option value="">
              {isLoadingDoctors
                ? 'Cargando médicos...'
                : 'Seleccione un médico (opcional)'}
            </option>
            {doctors.map((doctor, index) => (
              <option
                key={doctor.id || doctor.documentNumber || doctor.licenseNumber || index}
                value={doctor.id || doctor.documentNumber || doctor.licenseNumber || ''}
              >
                {getDoctorOptionLabel(doctor)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {statusError ? (
        <p className="status-message status-message-error" role="alert">
          {statusError}
        </p>
      ) : null}

      {statusSuccess ? (
        <p className="status-message status-message-success" role="status">
          {statusSuccess}
        </p>
      ) : null}

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Programando...' : 'Programar cita'}
        </button>
      </div>
    </form>
  );
}
