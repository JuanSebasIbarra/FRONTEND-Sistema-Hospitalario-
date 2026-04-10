import { useEffect, useState } from 'react';
import { appointmentService } from '../../../services/appointmentService';

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

export function useDoctorsBySpecialty(selectedSpecialty) {
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [doctorLookupError, setDoctorLookupError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDoctors() {
      if (!selectedSpecialty) {
        setDoctors([]);
        setDoctorLookupError('');
        setIsLoadingDoctors(false);
        return;
      }

      try {
        setIsLoadingDoctors(true);
        setDoctorLookupError('');

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
        setDoctorLookupError(getErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoadingDoctors(false);
        }
      }
    }

    loadDoctors();

    return () => {
      isMounted = false;
    };
  }, [selectedSpecialty]);

  return {
    doctors,
    isLoadingDoctors,
    doctorLookupError,
  };
}
