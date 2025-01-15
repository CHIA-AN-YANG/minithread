import { useRouter } from 'next/router';



const UserNavbar: React.FC = () => {
  const router = useRouter();


  return (
    <div className="flex w-full justify-around mb-2">
      <button className={"btn grow mr-1 py-2 text-center bg-blue-200 line-h-1 text-blue-700 border-blue-700 border rounded-lg leading-none uppercase"} >
        Follow
      </button>
    </div>
  );
};

export default UserNavbar;