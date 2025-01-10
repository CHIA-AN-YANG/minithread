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


  const getThreadsFunction = () => {
    console.log("router.pathname:", router.pathname);
    switch (router.pathname) {
      case '/me/threads':
        user?.username && fetchData(
          () => getAuthorThreadList(user.username, page),
          "Error fetching author threads:"
        );
        break;
      case '/me/comments':
        fetchData(
          (() => getAuthorCommentsList(page)),
          "Error fetching author comments:"
        );
        break;
      case '/':
        fetchData(
          (() => getLatestThreadList(page)),
          "Error fetching latest threads:"
        );
        break;
      default:
        if (router.pathname.includes('/user') && id?.length) {
          fetchData(
            () => getAuthorThreadList(id as string, page),
            "Error fetching author threads:"
          );
        }
        break;
    }
  }

  const fetchData = (
    fetchFunction: (page: number) => Promise<any>,
    errorMessage: string
  ) => {
    const p = page;
    fetchFunction(p)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error(errorMessage, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  return (

    <div className={`h-full overflow-y-scroll ${isMePage ? 'author-threads' : ''}`}>
      {isLoading && <div className='absolute top-0 bottom-0 w-full h-full flex flex-col justify-center items-center'>
        <div className='loader'></div>
      </div>}
      {threads.length ? threads.map((thread) => (
        <Thread key={thread.id}
          id={thread.id}
          author={thread.author}
          content={thread.content}
          createdAt={thread.createdAt || ""}
          likedByCount={thread.likedByCount}
          likedByMe={thread.likedByMe}
          parentThread={thread.parentThread}
          commentList={thread.comments}
        />
      )) : <p className="text-center my-4 w-full px-4">No post yet. Say something?</p>}
      {hasMore && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-primary"
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