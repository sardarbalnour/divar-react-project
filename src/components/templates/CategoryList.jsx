import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteCategory, getCategory } from "../../services/admin";

import Loader from "../modules/Loader";

function CategoryList() {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    },
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => mutate(i._id)} disabled={isDeleting}>
              delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
