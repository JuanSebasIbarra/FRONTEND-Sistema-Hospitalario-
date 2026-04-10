import { PageHeader } from './PageHeader';

export function ModulePage({ title, description, children }) {
  return (
    <section className="page-card">
      <PageHeader title={title} description={description} />
      {children ? <div className="page-actions">{children}</div> : null}
    </section>
  );
}
