import React, { useState, useEffect, useRef } from "react";
import { Post } from "../../hooks/hook";
import { BsSearch } from "react-icons/bs";
import assets from "../../assets/W.png";
import { motion, AnimatePresence } from "framer-motion"; 

interface PostSearchProps {
  post: Post[];
  onSearch: (results: Post[]) => void;
}

export const SearchBar: React.FC<PostSearchProps> = ({ post, onSearch }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchVal.trim()) {
      onSearch(post);
      return;
    }

    const filteredPosts = post.filter(
      (item) =>
        item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.text.toLowerCase().includes(searchVal.toLowerCase())
    );

    onSearch(filteredPosts);
  }, [searchVal, post, onSearch]);

  return (
    <div className="flex justify-center mt-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="image"
            className="w-5  h-5  rounded-lg bg-no-repeat bg-center bg-cover cursor-pointer"
            style={{ backgroundImage: `url(${assets})` }}
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            key="search"
            className="relative w-[20rem]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BsSearch className="absolute top-3 right-3 text-gray-500 cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
