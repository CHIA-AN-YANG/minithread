"use client";
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorCommentsList, getAuthorThreadList, getLatestThreadList, getUserThreadList } from '../api/threadAdaptor';
import { ThreadData, Pagination, ContentStatus } from '../model/model';
import { selectUser } from '../store/features/user/selectors/authSelectors';
import Thread from './Thread';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { selectUiStatus } from '../store/features/user/selectors/uiSelectors';
import { AppDispatch } from '../store/store';
import { setUiStatusIdle } from '../store/features/user/reducers/slices/uiSliceReducer';


interface ThreadListProps {
  isMePage: boolean;
}

enum UpdateType {
  REPLACE = 'replace',
  APPEND = 'append'
}

const ThreadList: React.FC<ThreadListProps> = ({ isMePage }) => {
  const [threads, setThreads] = useState<ThreadData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const contentStatus = useSelector(selectUiStatus);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    getThreadsFunction();
  }, []);

  useEffect(() => {
    console.log("contentStatus:", contentStatus);
    if (contentStatus === ContentStatus.SENT || contentStatus === ContentStatus.DELETED) {
      setIsLoading(true);
      setPage(0);
      getThreadsFunction(0, UpdateType.REPLACE);
      dispatch(setUiStatusIdle());
    }
  }, [contentStatus]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      const newPage = page + 1;
      setPage(newPage);
      getThreadsFunction(newPage);
    }
  };


  const getThreadsFunction = (newPage?: number, type?: UpdateType) => {

    const p = newPage ?? page;
    console.log("getThreadsFunction:", { route: router.pathname, page: p });
    switch (router.pathname) {
      case '/me/threads':
        fetchData(
          () => getAuthorThreadList(p),
          "Error fetching your threads",
          type
        );
        break;
      case '/me/comments':
        fetchData(
          (() => getAuthorCommentsList(p)),
          "Error fetching your comments",
          type
        );
        break;
      case '/':
        fetchData(
          (() => getLatestThreadList(p)),
          "Error fetching latest threads",
          type
        );
        break;
      default:
        if (router.pathname.includes('/user') && id?.length) {
          fetchData(
            () => getUserThreadList(id as string, p),
            `Error fetching threads from ${id}`,
            type
          );
        }
        break;
    }
  }

  const fetchData = (
    fetchFunction: () => Promise<AxiosResponse<Pagination<ThreadData>> | AxiosError>,
    errorMessage: string,
    type?: UpdateType
  ) => {
    fetchFunction()
      .then((response) => {
        if (response instanceof AxiosError) {
          setIsLoading(false);
          return;
        }
        const newThreads = (response as AxiosResponse<Pagination<ThreadData>>).data;
        if (newThreads.content && newThreads.content.length) {
          console.log("newThreads:", newThreads);
          if (type === UpdateType.REPLACE) {
            setThreads(newThreads.content);
          } else if (!type || type === UpdateType.APPEND) {
            const oldThreads = [...threads];
            const updatedThreads = [...oldThreads, ...newThreads.content];
            setThreads(updatedThreads);
          }
          (newThreads.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
        }
      })
      .catch((error) => {
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  return (

    <div className={`h-full overflow-y-scroll ${isMePage ? 'author-threads' : ''}`}>
      {isLoading && <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
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
          className="mt-4 my-2 uppercase underline rounded-md text-blue hover:bg-gray-300 disabled:text-gray-500"
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