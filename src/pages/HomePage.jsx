import { useQuery } from "@tanstack/react-query";

import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import Loader from "../components/modules/Loader";

import { getAllPosts } from "../services/user";
import { getCategory } from "../services/admin";

function HomePage() {
  const { data: posts, isPending: postsPending } = useQuery({
    queryKey: ["posts-list"],
    queryFn: getAllPosts,
  });

  const { data: categories, isPending: categoriesPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  return (
    <>
      {postsPending || categoriesPending ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
