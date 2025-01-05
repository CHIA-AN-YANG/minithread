"use client";
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthorThreadList } from '../api/threadAdaptor';
import { ThreadData, Pagination } from '../model/model';
import { selectUser } from '../store/features/user/selectors/authSelectors';
import Thread from './Thread';


interface ThreadListProps {
  isMePage: boolean;
}

const ThreadList: React.FC<ThreadListProps> = ({ isMePage }) => {
  const [threads, setThreads] = useState<ThreadData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const user = useSelector(selectUser);



  useEffect(() => {
    setIsLoading(true);
    user?.username && getNewPosts(user.username);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    user?.username && getNewPosts(user.username);
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

  const getNewPosts = (username: string) => {
    const p = page;
    getAuthorThreadList(username, p).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
        return;
      }

      const newPosts = (response as AxiosResponse<Pagination<ThreadData>>).data;
      if (newPosts.content && newPosts.content.length) {
        console.log("newPosts:", newPosts);
        const oldPosts = [...threads];
        const updatedPosts = [...oldPosts, ...newPosts.content];
        setThreads(updatedPosts);
        (newPosts.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };



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
    </div>
  );

};

export default ThreadList;