import axios from 'axios';
import React, { useState } from 'react';
import 'lineicons/dist/lineicons.css';
import { AppDispatch, store } from '../store/store';
import { startInput } from '../store/features/user/actions/threadActions';
import { useDispatch } from 'react-redux';
import { ThreadData } from '../model/model';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

type ThreadProps = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  parentThread?: string;
  commentList?: ThreadData[];
  likesCount?: number;
};

const Thread: React.FC<ThreadProps> = ({ id, content, author, parentThread, commentList, createdAt, likesCount }) => {
  const [likes, setLikes] = useState(0);
  const username = store.getState().auth.user?.username;
  const auth = author === username;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLike = () => {
    likes === 0 ? setLikes(1) : setLikes(0);
  };

  const handleReply = () => {
    if (!username) {
      router.push('/login');
    }
    dispatch(startInput(id));
  };

  const handleDelete = () => {
    axios.delete(`/api/posts/${id}`).then(() => {
      //onDelete(id);
    });
  };
  const handleDate = (isoDate: string): string => {
    const now = new Date();
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyPostLink = (id: string): void => {
    console.log('copying post link');
    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/thread/${id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => toast.success('Post link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy post link.'));
  };

  return (
    <>
      <article className={`border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 ${parentThread ? 'ml-4 border-l-4 border-gray-400' : ''}`}>
        <header className="mb-3">
          <Link href={`/user/${author}`}>
            <h3 className="text-sm font-semibold">{author}</h3>
          </Link>
          <p className="text-xs text-gray-500"><time>{handleDate(createdAt)}</time></p>
        </header>
        <Link href={`/thread/${parentThread ? parentThread : id}`}>
          <p className="text-base mb-3">{content}</p>
        </Link>
        <footer className="flex space-x-2">
          <button
            onClick={handleLike}
            className="flex items-center justify-center px-1 py-1 text-lg mr-2"
            aria-label="like"
          >
            <i className="lni lni-heart lni-lg text-slate-500 hover:text-blue-600 mr-1"
            ></i>{(likesCount || 0) + likes}
          </button>
          <button
            onClick={handleReply}
            className="flex items-center justify-center px-1 py-1 text-lg"
            aria-label="reply"
          >
            <i className="lni lni-message-2  lni-lg text-slate-500 hover:text-blue-600"
            ></i>{(commentList || []).length}
          </button>
          <button
            onClick={() => copyPostLink(id)}
            className="flex items-center justify-center px-1 py-1 text-lg"
            aria-label="copy post link"
          >
            <i className="lni lni-link-2-angular-right lni-lg text-slate-500 hover:text-blue-600"></i>
          </button>
          {auth && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center px-1 py-1 text-lg"
              aria-label="delete"
            >
              <i className="lni lni-trash-3 lni-lg text-slate-500 hover:text-blue-600"></i>
            </button>
          )}
        </footer>
      </article>
      {commentList && commentList.length > 0 && (
        <div>
          {commentList.map((comment) => (
            <Thread
              key={comment.id} {...comment}
              id={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt || ""}
              likesCount={comment.likesCount}
              parentThread={id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Thread;