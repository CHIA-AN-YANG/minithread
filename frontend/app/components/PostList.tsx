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


interface PostListProps {
  isMePage: boolean;
}

const PostList: React.FC<PostListProps> = ({ isMePage }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const status = useSelector(selectStatus);
  const user = useSelector(selectUser);



  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      return;
    }
    getAuthorPostList(user.username, page).then((response) => {
      if (response instanceof AxiosError) {
        setIsLoading(false);
      }

      const newPosts = (response as AxiosResponse<Pagination<PostData>>).data;
      if (newPosts.content && newPosts.content.length) {
        setPosts(newPosts.content);
        (newPosts.content.length < 5) ? setHasMore(false) : setHasMore(true);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [user]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  if (posts.length) {
    return (
      <div className={`h-full overflow-y-scroll ${isMePage ? 'author-posts' : ''}`}>
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
  } else {
    return (
      <div className="loader">
        <p>{(status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "waiting..."}</p>
      </div>
    );
  }
};

export default PostList;