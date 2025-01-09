"use client";
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthorCommentsList, getAuthorThreadList, getLatestThreadList } from '../api/threadAdaptor';
import { ThreadData, Pagination } from '../model/model';
import { selectUser } from '../store/features/user/selectors/authSelectors';
import Thread from './Thread';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';


interface ThreadListProps {
  isMePage: boolean;
}

const ThreadList: React.FC<ThreadListProps> = ({ isMePage }) => {
  const [threads, setThreads] = useState<ThreadData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    getThreadsFunction();
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    getThreadsFunction();
  }, [page]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      if (user?.username) {
        setIsLoading(true);
        const newPage = page + 1;
        setPage(newPage);
      };
    }
  };

  const getAuthorThreads = (username: string) => {
    const p = page;
    getAuthorThreadList(username, p).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
        return;
      }

      const newThreads = (response as AxiosResponse<Pagination<ThreadData>>).data;
      if (newThreads.content && newThreads.content.length) {
        console.log("newThreads:", newThreads);
        const oldThreads = [...threads];
        const updatedThreads = [...oldThreads, ...newThreads.content];
        setThreads(updatedThreads);
        (newThreads.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const getAuthorComments = () => {
    const p = page;
    getAuthorCommentsList(p).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
        return;
      }

      const newThreads = (response as AxiosResponse<Pagination<ThreadData>>).data;
      if (newThreads.content && newThreads.content.length) {
        console.log("newThreads:", newThreads);
        const oldThreads = [...threads];
        const updatedThreads = [...oldThreads, ...newThreads.content];
        setThreads(updatedThreads);
        (newThreads.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const getLatestThreads = () => {
    const p = page;
    getLatestThreadList(p).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
        return;
      }

      const newThreads = (response as AxiosResponse<Pagination<ThreadData>>).data;
      if (newThreads.content && newThreads.content.length) {
        console.log("newThreads:", newThreads);
        const oldThreads = [...threads];
        const updatedThreads = [...oldThreads, ...newThreads.content];
        setThreads(updatedThreads);
        (newThreads.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };
  const getThreadsFunction = () => {
    console.log("router.pathname:", router.pathname);
    switch (router.pathname) {
      case '/me/threads':
        user?.username && getAuthorThreads(user.username);
        break;
      case '/me/comments':
        getAuthorComments();
        break;
      case '/':
        getLatestThreads();
        break;
      default:
        if (router.pathname.includes('/user') && id?.length) {
          getAuthorThreads(id as string);
        }
        break;
    }
  }



  return (

    <div className={`h-full overflow-y-scroll ${isMePage ? 'author-threads' : ''}`}>
      {isLoading && <div className="m-4 mx-auto"><div className="loader"></div></div>}
      {threads.length ? threads.map((thread) => (
        <Thread key={thread.id}
          id={thread.id}
          author={thread.author}
          content={thread.content}
          createdAt={thread.createdAt || ""}
          likesCount={thread.likesCount}
          parentThread={thread.parentThread}
          commentList={thread.comments}
        />
      )) : <p className="text-center my-4 w-full px-4">No post yet. Say something?</p>}
      {hasMore && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
      <div><Toaster /></div>
    </div>
  );

};

export default ThreadList;