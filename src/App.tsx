import  { useState } from "react";
import { usePost } from "./hooks/hook";
import PostList from "./components/postList/PostList";
import "./App.css";

function App() {
  const [url] = useState(
    "https://cloud.codesupply.co/endpoint/react/data.json"
  );
  const { data, isPending, error } = usePost(url);

  return (
    <div className="container mx-auto py-6">
      {isPending && <p className="text-center">Загрузка...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && <PostList posts={data} />}
      
    </div>
  );
}

export default App;
