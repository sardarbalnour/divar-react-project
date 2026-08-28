import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../../services/user";

function PostList() {
  const { data, isPending } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });
  console.log(data, isPending);

  return <div>PostList</div>;
}

export default PostList;
