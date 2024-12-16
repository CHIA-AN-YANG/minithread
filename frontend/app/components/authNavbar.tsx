// components/Navbar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthNavbarProps {
  page: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ page }) => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-4 p-4 bg-gray-800">
      <Link href="/register" className={`text-blue ${page === 'registration' ? 'font-bold' : ''}`}>
        Registration
      </Link>
      <span> | </span>
      <Link href="/login" className={`text-blue ${page === 'login' ? 'font-bold' : ''}`}>
        Login
      </Link>
    </nav>
  );
};

export default AuthNavbar;