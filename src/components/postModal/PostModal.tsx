import React from "react";
import { Post } from "../../hooks/hook";
import assets from "../../assets/close_.png";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // Остановить клик внутри попапа
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <img width="20" src={assets} alt="ll" />
        </button>

        <img
          className="w-full h-48 object-cover rounded-lg"
          srcSet={`${post.img_2x} 2x, ${post.img} 1x`}
          src={post.img}
          alt={post.title}
        />
        <h2 className="text-xl font-bold mt-4">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.text}</p>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Автор: <span className="font-semibold">{post.autor}</span>
          </p>
          <p>
            {post.date} • {post.views} Views
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
