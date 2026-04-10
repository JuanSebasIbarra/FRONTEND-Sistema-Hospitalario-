import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/ui/Navigation';

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Portal del Paciente</p>
          <h1>Sistema de Gestión Médica</h1>
        </div>
        <p className="app-description">
          Base compartida para la gestión médica del paciente.
        </p>
      </header>

      <div className="app-body">
        <Navigation />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
