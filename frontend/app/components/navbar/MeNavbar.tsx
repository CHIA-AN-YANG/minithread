import Link from "next/link";
import { useRouter } from 'next/router';



const MeNavbar: React.FC = () => {
  const router = useRouter();


  return (
    <div className="flex w-full justify-around mb-2">
      <Link href="/me/threads" className={"btn grow mr-1 py-2 text-center border-blue-500 " + ((router.pathname.indexOf("threads") > 0) ? "border-b-4" : "border-b-2")}>
        My Threads
      </Link>
      <Link href="/me/comments" className={"btn grow ml-1 py-2 text-center border-blue-500 " + ((router.pathname.indexOf("comments") > 0) ? "border-b-4" : "border-b-2")}>
        Replies
      </Link>
    </div>
  );
};

export default MeNavbar;