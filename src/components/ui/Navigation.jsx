import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../router/navigation';

function getNavigationClassName(isActive) {
  return `nav-link${isActive ? ' nav-link-active' : ''}`;
}

export function Navigation() {
  return (
    <nav className="sidebar" aria-label="Navegación principal">
      <ul className="nav-list">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              className={({ isActive }) => getNavigationClassName(isActive)}
              end={item.path === '/'}
              to={item.path}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
