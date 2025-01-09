"use client";
import { getThread } from '@/app/api/threadAdaptor';
import InputForm from '@/app/components/form/InputForm';
import BottomNavbar from '@/app/components/navbar/BottomNavbar';
import Thread from '@/app/components/Thread';
import { ThreadData } from '@/app/model/model';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function ThreadPage() {
  const [thread, setThread] = useState<ThreadData | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    id && fetchThread(id);
  }, [id]);

  const fetchThread = (id: string) => {
    getThread(id).then((response) => {
      if (response instanceof AxiosError) {
        return;
      }
      const thread = (response as AxiosResponse<ThreadData>).data;
      setThread(thread);
    }
    ).catch((error) => {
      console.error("Error fetching thread:", error);
    });
  };

  return (
    <div className="page">
      <main className="main-single-thread">
        <header>
          {thread?.author && <h1 className="text-md text-center">By {thread.author}</h1>}
          {thread?.createdAt && <p className="text-sm text-gray-500 text-center"><time>Posted on {thread.createdAt}</time></p>}
        </header>
        <div>
          {thread && <Thread
            id={id}
            author={thread.author}
            content={thread.content}
            createdAt={thread.createdAt || ""}
            likesCount={thread.likesCount}
            parentThread={thread.parentThread}
            commentList={thread.comments}
          />}
        </div>
        <BottomNavbar />
        <InputForm />
        <div><Toaster /></div>
      </main>
    </div>
  );
}

