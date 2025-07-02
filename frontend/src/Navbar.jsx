import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Home', path: '/', icon: null, exact: true },
  { label: 'About', path: '/about', icon: null },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
];

export default function Navbar() {
  return (
    <header className="flex justify-between items-center pt-10 px-8 md:px-20">
      <div className="flex items-center gap-2">
        <img src="https://via.placeholder.com/60x40?text=Logo" alt="Logo" className="h-12 drop-shadow" />
        <span className="font-bold text-xl text-sky-700 tracking-tight hidden sm:inline">WETAIRY</span>
      </div>
      <nav className="bg-white/80 backdrop-blur rounded-full px-8 py-2 flex gap-6 shadow-md border border-gray-100">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact || false}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-1 text-white bg-black text-base px-4 py-2 rounded-full font-medium transition'
                : 'flex items-center gap-1 text-black text-base px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition'
            }
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
} 