import { useState } from 'react';
import { medicalHistoryService } from '../../../services/medicalHistoryService';
import { ModulePage } from '../../../components/ui/ModulePage';
import { PageHeader } from '../../../components/ui/PageHeader';

export default function MedicalHistoryPage() {
  const [patientId, setPatientId] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const hasData =
    history &&
    (
      history.appointments?.length ||
      history.prescriptions?.length ||
      history.labResults?.length
    );

  async function handleSearch() {
    if (!patientId.trim()) return;

    setLoading(true);
    setError(false);
    setHistory(null);

    try {
      const response =
        await medicalHistoryService.getMedicalHistoryByPatientId(patientId.trim());

      setHistory(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModulePage title="Historia clínica">
      <PageHeader
        title="Historia clínica"
        description="Consulta completa del historial del paciente"
      />

      {/* INPUT */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Ingresar ID del paciente"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
          onClick={handleSearch}
          disabled={loading || !patientId.trim()}
        >
          Consultar historia clínica
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Cargando...</p>}

      {/* ERROR */}
      {error && (
        <div>
          <p>Ocurrió un error al cargar la información</p>
          <button onClick={handleSearch}>Reintentar</button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && history && !hasData && (
        <p>No se encontró información</p>
      )}

      {/* DATA */}
      {!loading && !error && hasData && (
        <div>

          <section>
            <h3>Citas pasadas</h3>
            {history.appointments?.length ? (
              <ul>
                {history.appointments.map((a, i) => (
                  <li key={i}>
                    {a.date} - {a.doctor} - {a.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin citas</p>
            )}
          </section>

          <section>
            <h3>Prescripciones</h3>
            {history.prescriptions?.length ? (
              <ul>
                {history.prescriptions.map((p, i) => (
                  <li key={i}>
                    {p.medication} - {p.dose}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin prescripciones</p>
            )}
          </section>

          <section>
            <h3>Laboratorio</h3>
            {history.labResults?.length ? (
              <ul>
                {history.labResults.map((l, i) => (
                  <li key={i}>
                    {l.examName} - {l.result}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin resultados</p>
            )}
          </section>

        </div>
      )}
    </ModulePage>
  );
}