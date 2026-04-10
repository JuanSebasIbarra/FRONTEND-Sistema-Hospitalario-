import { useState } from 'react';
import { patientService } from '../../../services/patientService';

const initialFormData = {
  fullName: '',
  documentNumber: '',
  birthDate: '',
  phoneNumber: '',
  email: '',
};

function validateForm(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'El nombre completo es obligatorio.';
  }

  if (!formData.documentNumber.trim()) {
    errors.documentNumber = 'El número de documento es obligatorio.';
  }

  if (!formData.birthDate) {
    errors.birthDate = 'La fecha de nacimiento es obligatoria.';
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'El teléfono es obligatorio.';
  }

  if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Ingrese un correo electrónico válido.';
  }

  return errors;
}

function buildPayload(formData) {
  return {
    fullName: formData.fullName.trim(),
    documentNumber: formData.documentNumber.trim(),
    birthDate: formData.birthDate,
    phoneNumber: formData.phoneNumber.trim(),
    email: formData.email.trim(),
  };
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

  return 'No se pudo registrar el paciente. Intente nuevamente.';
}

export function PatientRegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });

    setRequestError('');
    setSuccessMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    try {
      setIsSubmitting(true);
      setFieldErrors({});
      setRequestError('');
      setSuccessMessage('');

      await patientService.create(buildPayload(formData));

      setFormData(initialFormData);
      setSuccessMessage('Paciente registrado correctamente.');
    } catch (error) {
      setRequestError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="form-field" htmlFor="fullName">
          <span>Nombre completo</span>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ingrese el nombre completo"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
          />
          {fieldErrors.fullName ? (
            <small id="fullName-error" className="field-error">
              {fieldErrors.fullName}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="documentNumber">
          <span>Número de documento</span>
          <input
            id="documentNumber"
            name="documentNumber"
            type="text"
            value={formData.documentNumber}
            onChange={handleChange}
            placeholder="Ingrese el documento"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.documentNumber)}
            aria-describedby={
              fieldErrors.documentNumber ? 'documentNumber-error' : undefined
            }
          />
          {fieldErrors.documentNumber ? (
            <small id="documentNumber-error" className="field-error">
              {fieldErrors.documentNumber}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="birthDate">
          <span>Fecha de nacimiento</span>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.birthDate)}
            aria-describedby={fieldErrors.birthDate ? 'birthDate-error' : undefined}
          />
          {fieldErrors.birthDate ? (
            <small id="birthDate-error" className="field-error">
              {fieldErrors.birthDate}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="phoneNumber">
          <span>Teléfono</span>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Ingrese el teléfono"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.phoneNumber)}
            aria-describedby={
              fieldErrors.phoneNumber ? 'phoneNumber-error' : undefined
            }
          />
          {fieldErrors.phoneNumber ? (
            <small id="phoneNumber-error" className="field-error">
              {fieldErrors.phoneNumber}
            </small>
          ) : null}
        </label>

        <label className="form-field form-field-full" htmlFor="email">
          <span>Correo electrónico</span>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese el correo electrónico"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email ? (
            <small id="email-error" className="field-error">
              {fieldErrors.email}
            </small>
          ) : null}
        </label>
      </div>

      {requestError ? (
        <p className="status-message status-message-error" role="alert">
          {requestError}
        </p>
      ) : null}

      {successMessage ? (
        <p className="status-message status-message-success" role="status">
          {successMessage}
        </p>
      ) : null}

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar paciente'}
        </button>
      </div>
    </form>
  );
}
