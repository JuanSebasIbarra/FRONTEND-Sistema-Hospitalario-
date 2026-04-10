import { Link } from 'react-router-dom';
import { ModulePage } from '../../../components/ui/ModulePage';

export function NotFoundPage() {
  return (
    <ModulePage
      title="Página no encontrada"
      description="La ruta solicitada no existe en el portal actual."
    >
      <Link className="inline-link" to="/">
        Volver al inicio
      </Link>
    </ModulePage>
  );
}
