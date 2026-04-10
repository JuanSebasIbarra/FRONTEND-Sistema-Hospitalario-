export function PageHeader({ title, description }) {
  return (
    <header className="page-header">
      <p className="page-kicker">Módulo</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
