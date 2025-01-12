// components/Navbar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthNavbarProps {
  page?: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ page }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-around space-x-4 p-4 bg-sky-500/75 text-white">
      <Link href="/register" className={`btn flex leading-none uppercase ${page === 'registration' ? 'font-bold' : ''}`}>
        Register
      </Link>
      <Link href="/login" className={`btn flex leading-none uppercase ${page === 'login' ? 'font-bold' : ''}`}>
        Login
      </Link>
    </nav>
  );
};

export default AuthNavbar;