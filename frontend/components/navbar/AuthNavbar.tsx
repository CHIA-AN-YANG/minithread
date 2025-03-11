"use client";
import Link from 'next/link';

interface AuthNavbarProps {
  page?: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ page }) => {

  return (
    <nav className={`w-full flex justify-around space-x-4 p-4 text-white ${page === 'registration' ? 'bg-primary/75' : 'bg-secondary/75'}`}>
      <Link href="/register" className={`btn flex tracking-wide leading-none uppercase ${page === 'registration' ? 'font-bold' : ''}`}>
        Register
      </Link>
      <Link href="/login" className={`btn flex tracking-wide leading-none uppercase ${page === 'login' ? 'font-bold' : ''}`}>
        Login
      </Link>
    </nav>
  );
};

export { AuthNavbar };
