import Link from "next/link";

interface MeNavbarProps {
  page: string;
}

const MeNavbar: React.FC<MeNavbarProps> = ({ page }) => {
  const isMePage = page === 'me';


  return (
    <div className="flex w-full justify-around mb-2">
      <Link href="/me" className={"btn grow mr-1 py-2 text-center border-blue-500 " + (isMePage ? "border-b-4" : "border-b-2")}>
        My Threads
      </Link>
      <Link href="/me/comments" className={"btn grow ml-1 py-2 text-center border-blue-500 " + (isMePage ? "border-b-2" : "border-b-4")}>
        Replies
      </Link>
    </div>
  );
};

export default MeNavbar;