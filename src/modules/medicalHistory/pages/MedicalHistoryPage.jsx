import { useState } from 'react';
import { medicalHistoryService } from '../../../services/medicalHistoryService';
import ModulePage from '../../../components/ui/ModulePage';
import PageHeader from '../../../components/ui/PageHeader';

export default function MedicalHistoryPage() {
  const [patientId, setPatientId] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
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

  function handleRetry() {
    handleSearch();
  }

  return (
    <ModulePage>
      <PageHeader title="Historia clínica" />

      {/* Search */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          className="border p-2 rounded w-64"
          placeholder="Ingresar ID del paciente"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSearch}
          disabled={loading || !patientId.trim()}
        >
          Consultar historia clínica
        </button>
      </div>

      {/* States */}
      {loading && <p>Cargando...</p>}

      {error && !loading && (
        <div className="p-3 border border-red-300 bg-red-50">
          <p>Ocurrió un error al cargar la información.</p>
          <button onClick={handleRetry} className="text-red-600 underline">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && history && !hasData && (
        <p>No se encontró información para este paciente.</p>
      )}

      {/* Results */}
      {!loading && !error && hasData && (
        <div className="space-y-4">

          <section className="border p-3 rounded">
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
              <p>Sin citas registradas</p>
            )}
          </section>

          <section className="border p-3 rounded">
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
              <p>Sin prescripciones registradas</p>
            )}
          </section>

          <section className="border p-3 rounded">
            <h3>Resultados de laboratorio</h3>
            {history.labResults?.length ? (
              <ul>
                {history.labResults.map((l, i) => (
                  <li key={i}>
                    {l.examName} - {l.result}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin resultados de laboratorio</p>
            )}
          </section>

        </div>
      )}
    </ModulePage>
  );
}