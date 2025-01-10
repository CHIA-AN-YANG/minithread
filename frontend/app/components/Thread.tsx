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
import { displayDateWithDiff } from '../util/date';
import FilledHeartIcon from './icon/FilledHeartIcon';
import { authedDelete, authedPost } from '../api/baseAdaptor';

type ThreadProps = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  parentThread?: string;
  commentList?: ThreadData[];
  likedByCount?: number;
  likedByMe?: boolean;
};

const Thread: React.FC<ThreadProps> = ({ id, content, author, parentThread, commentList, createdAt, likedByCount, likedByMe }) => {
  const [liked, setLiked] = useState(likedByMe ? 1 : 0);
  const username = store.getState().auth.user?.username;
  const auth = author === username;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLiked = () => {
    if (!username) {
      router.push('/login');
      return;
    }
    if (liked === 0) {
      setLiked(1);
      authedPost(`/threads/${id}/like`, {})
    } else if (liked === 1) {
      setLiked(0);
      authedDelete(`/threads/${id}/like`, {})
    }
  };

  const handleReply = () => {
    if (!username) {
      router.push('/login');
    }
    dispatch(startInput(id));
  };

  const handleDelete = () => {
    axios.delete(`/api/threads/${id}`).then(() => {
      toast.success('Post deleted successfully!');
    });
  };
  const handleDate = (isoDate: string): string => {
    return displayDateWithDiff(isoDate);
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
      <article className={`border border-primary rounded-lg p-4 mb-4 bg-panelBg ${parentThread ? 'ml-4 border-l-4 border-secondary' : ''}`}>
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
            onClick={handleLiked}
            className="flex items-center justify-center px-1 py-1 text-lg mr-2"
            aria-label="like"
          >
            {liked > 0 ? <FilledHeartIcon className="w-6 h-6 text-red-500" /> : <i className="lni lni-heart lni-lg text-slate-500"></i>}
            {(likedByCount || 0) + liked}
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
              likedByCount={comment.likedByCount}
              likedByMe={comment.likedByMe}
              parentThread={id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Thread;