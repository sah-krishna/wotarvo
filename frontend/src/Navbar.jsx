import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';

const menu = [
  { label: 'Home', path: '/', icon: null, exact: true },
  { label: 'About', path: '/about', icon: null },
  { label: 'Dashboard', path: '/dashboard', icon: <MdDashboard />, glassy: true },
];

export default function Navbar() {
  return (
    <header className="flex justify-between items-center pt-10 px-8 md:px-20">
      <div className="flex items-center gap-2">
        <img src="src/assets/logo.png" alt="Logo" className="h-25 drop-shadow" width = "130px" />
        <span className="font-bold text-xl text-sky-700 tracking-tight hidden sm:inline" width = "100px" ></span>
      </div>
      <nav className="bg-white/80 backdrop-blur rounded-full px-8 py-2 flex gap-6 shadow-md border border-gray-100">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact || false}
            className={({ isActive }) =>
              isActive && item.glassy
                ? 'flex items-center gap-1 text-white bg-white/30 backdrop-blur-md border border-white/40 shadow-lg text-base px-4 py-2 rounded-full font-medium transition'
                : isActive
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