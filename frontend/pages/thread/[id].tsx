"use client";
import { getThread } from '@/app/api/threadAdaptor';
import Thread from '@/app/components/Thread';
import { ThreadData } from '@/app/model/model';
import { store } from '@/app/store/store';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

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
      <main className="main">
        {thread && <Thread
          id={id}
          author={thread.author}
          content={thread.content}
          createdAt={thread.createdAt || ""}
          likesCount={thread.likesCount}
          parentThread={thread.parentThread}
          commentList={thread.comments}
        />}
      </main>
    </div>
  );
}

