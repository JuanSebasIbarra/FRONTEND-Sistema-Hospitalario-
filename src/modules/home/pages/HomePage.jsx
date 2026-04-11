import { Link } from 'react-router-dom';
import { ModulePage } from '../../../components/ui/ModulePage';

const quickAccessItems = [
  {
    title: 'Pacientes',
    description: 'Registre nuevos pacientes y gestione su información básica.',
    to: '/patients',
  },
  {
    title: 'Citas',
    description: 'Consulte médicos por especialidad y programe nuevas citas.',
    to: '/appointments',
  },
  {
    title: 'Historia Clínica',
    description: 'Revise el acceso al historial médico disponible del paciente.',
    to: '/medical-history',
  },
];

export function HomePage() {
  return (
    <ModulePage
      title="Bienvenido al portal del paciente"
      description="Desde este sistema puede agendar citas, consultar historia clínica y gestionar información médica de forma centralizada."
    >
      <div className="home-content">
        <section className="home-section home-section-highlight">
          <p className="section-kicker">Inicio</p>
          <h3>Acceso rápido al sistema</h3>
          <p>
            Utiliza el menú lateral o los accesos rápidos para navegar por el
            sistema.
          </p>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <p className="section-kicker">Accesos rápidos</p>
            <h3>Seleccione una opción</h3>
            <p>Ingrese directamente a los módulos principales del portal.</p>
          </div>

          <div className="quick-access-grid">
            {quickAccessItems.map((item) => (
              <Link key={item.to} className="quick-access-card" to={item.to}>
                <p className="quick-access-title">{item.title}</p>
                <p className="quick-access-description">{item.description}</p>
                <span className="quick-access-link">Ir al módulo</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ModulePage>
  );
}
