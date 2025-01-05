"use client";
import React, { useState, useEffect } from 'react';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { getAuth } from '../store/features/user/actions/authActions';
import { getAuthorPostList } from '../api/postAdaptor';
import Post from './post';
import { EntityStatus, Pagination, PostData, UserData } from '../model/model';
import { error } from 'console';
import { useSelector } from 'react-redux';
import { selectStatus, selectUser } from '../store/features/user/selectors/authSelectors';
import { store } from '../store/store';
import { get } from 'http';


interface PostListProps {
  isMePage: boolean;
}

const PostList: React.FC<PostListProps> = ({ isMePage }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
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
    getAuthorPostList(username, p).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
        return;
      }

      const newPosts = (response as AxiosResponse<Pagination<PostData>>).data;
      if (newPosts.content && newPosts.content.length) {
        console.log("newPosts:", newPosts);
        const oldPosts = [...posts];
        const updatedPosts = [...oldPosts, ...newPosts.content];
        setPosts(updatedPosts);
        (newPosts.totalPages > (page + 1)) ? setHasMore(true) : setHasMore(false);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };



  return (
    <div className={`h-full overflow-y-scroll ${isMePage ? 'author-posts' : ''}`}>
      {isLoading && <div className="m-4 mx-auto"><div className="loader"></div></div>}
      {posts.length && posts.map((post) => (
        <Post key={post.id}
          id={post.id}
          author={post.author}
          content={post.content}
          createdAt={post.createdAt || ""}
          likesCount={post.likesCount}
          parentPost={post.parentPost}
          commentList={post.comments}
        />
      ))}
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

export default PostList;