import Link from "next/link";

interface MeNavbarProps {
  page: string;
}

const MeNavbar: React.FC<MeNavbarProps> = ({ page }) => {
  const isMePage = page === 'me';


  return (
    <div className="flex justify-around mb-2">
      <Link href="/me">
        <a className={"btn w-2/5 py-2 text-center border-blue-500 " + (isMePage ? "border-b-4" : "border-b-2")}>
          My Threads
        </a>
      </Link>
      <Link href="/me/comments">
        <a className={"btn w-2/5 py-2 text-center border-blue-500 " + (isMePage ? "border-b-2" : "border-b-4")}>
          Replies
        </a>
      </Link>
    </div>
  );
};

export default MeNavbar;