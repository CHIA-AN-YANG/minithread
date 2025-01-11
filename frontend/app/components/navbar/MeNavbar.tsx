import Link from "next/link";
import { useRouter } from 'next/router';



const MeNavbar: React.FC = () => {
  const router = useRouter();


  return (
    <div className="flex w-full justify-around mb-2">
      <Link href="/me/threads" className={"btn grow mr-1 py-2 text-center text-blue-500 line-h-1 border-blue-500 leading-none uppercase " + ((router.pathname.indexOf("threads") > 0) ? "border-b-4 font-bold" : "border-b-2")}>
        My Threads
      </Link>
      <Link href="/me/comments" className={"btn grow ml-1 py-2 text-center text-blue-500 line-h-1 border-blue-500 leading-none uppercase " + ((router.pathname.indexOf("comments") > 0) ? "border-b-4 font-bold" : "border-b-2")}>
        Replies
      </Link>
    </div>
  );
};

export default MeNavbar;