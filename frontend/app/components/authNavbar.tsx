// components/Navbar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthNavbarProps {
  page: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ page }) => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around space-x-4 p-4 bg-sky-100">
      <Link href="/register" className={`flex ${page === 'registration' ? 'font-bold' : 'hover:underline'}`}>
        Register
      </Link>
      <Link href="/login" className={`flex ${page === 'login' ? 'font-bold' : 'hover:underline'}`}>
        Login
      </Link>
    </nav>
  );
};

export default AuthNavbar;