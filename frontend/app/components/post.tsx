import axios from 'axios';
import React, { useState } from 'react';
import 'lineicons/dist/lineicons.css';

type PostProps = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  parentPost?: string;
  commentList?: PostProps[];
  likeCount?: number;
  // onReply: (id: string) => void;
  // onDelete: (id: string) => void;
};

const Post: React.FC<PostProps> = ({ id, content, author, parentPost, commentList, createdAt, likeCount }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    likes === 0 ? setLikes(1) : setLikes(0);
  };

  const handleReply = () => {
    // onReply(id);
  };

  const handleDelete = () => {
    axios.delete(`/api/posts/${id}`).then(() => {
      //onDelete(id);
    });
  };
  const handleDate = (isoDate: string): string => {
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
    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/post/${id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => console.log('Post link copied to clipboard!'))
      .catch(() => console.log('Failed to copy post link.'));
  };

  return (
    <>
      <article className={`border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 ${parentPost ? 'ml-4 border-l-4 border-gray-400' : ''}`}>
        <header className="mb-3">
          <h3 className="text-sm font-semibold">{author}</h3>
          <p className="text-xs text-gray-500"><time>{handleDate(createdAt)}</time></p>
        </header>
        <p className="text-base mb-3">{content}</p>
        <footer className="flex space-x-2">
          <button
            onClick={handleLike}
            className="flex items-center justify-center px-1 py-1 text-lg mr-2"
            aria-label="like"
          >
            <i className="lni lni-heart lni-lg text-slate-500 hover:text-blue-600 mr-1"
            ></i>{(likeCount || 0) + likes}
          </button>
          <button
            onClick={handleReply}
            className="flex items-center justify-center px-1 py-1 text-lg"
            aria-label="reply"
          >
            <i className="lni lni-share-1  lni-lg text-slate-500 hover:text-blue-600"
            ></i>
          </button>
          <button
            onClick={() => copyPostLink(id)}
            className="flex items-center justify-center px-1 py-1 text-lg"
            aria-label="copy post link"
          >
            <i className="lni lni-link-2-angular-right lni-lg text-slate-500 hover:text-blue-600"></i>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-1 py-1 text-lg"
            aria-label="delete"
          >
            <i className="lni lni-trash-3 lni-lg text-slate-500 hover:text-blue-600"></i>
          </button>
        </footer>
      </article>
      {commentList && commentList.length > 0 && (
        <div>
          {commentList.map((comment) => (
            <Post key={comment.id} {...comment}
            // onReply={onReply} 
            // onDelete={onDelete} 
            />
          ))}
        </div>
      )}

    </>
  );
};

export default Post;