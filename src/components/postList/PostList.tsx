import React, { useState, useEffect } from "react";
import PostModal from "../postModal/PostModal";
import assets from "../../assets/Logotype.png";
import { Post } from "../../hooks/hook";
import MobileMenu from "../mobileMenu/mobileMenu";
import { SearchBar } from "../searchBar/searchBar"; // Импортируем поиск

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts); // Состояние для фильтрованных постов

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
 <div className="relative z-100 flex items-center">  
  
  <div className="absolute right-40 flex items-center pr-4"> {/* Container for SearchBar */}  
    <SearchBar post={posts} onSearch={setFilteredPosts} />  
  </div>  

  <img src={assets} alt="logotype" className="mx-auto" /> {/* Center the logotype */}  

</div>    

      <div
        className={` bg-white fixed top-12 left-0 right-0 w-full  transition-transform duration-300 z-50 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } lg:block hidden`}
      >
        <div className="container mx-auto flex justify-center p-4">
          <MobileMenu />
        </div>
      </div>

      {/* Список постов */}
      <div className="flex flex-wrap justify-between gap-4 px-4 md:px-8 mt-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[48%] lg:w-[32%] bg-white text-left shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(item)}
            >
              <img
                className="w-full h-58 object-cover"
                srcSet={`${item.img_2x} 2x, ${item.img} 1x`}
                src={item.img}
                alt={item.title}
              />
              <div className="p-4">
                <p className="text-[0.75rem] uppercase text-red-500 font-semibold">
                  {item.tags}
                </p>
                <h3 className="font-bold text-[1.125rem] text-gray-900">
                  {item.title}
                </h3>

                <div className="px-4 pb-4 flex items-center text-[0.75rem] text-gray-500">
                  <p className="text-black font-bold">{item.autor}</p>
                  <p>
                    {item.date} • {item.views} Views
                  </p>
                </div>
                <p className="text-grey-600 text-[0.875rem] mt-2">
                  {item.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-500 mt-4">
            Ничего не найдено
          </p>
        )}
      </div>

      {/* Модалка */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};

export default PostList;
