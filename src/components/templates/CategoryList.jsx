import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteCategory, getCategory } from "../../services/admin";

import Loader from "../modules/Loader";

import styles from "./CategoryList.module.css";

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
          <div className={styles.list} key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => mutate(i._id)} disabled={isDeleting}>
              حذف
            </button>
          </div>
        ))
      )}
      <div className={isDeleting ? styles.deleting : null}>
        {isDeleting && <p>در حال حذف دسته بندی مورد نظر...</p>}
      </div>
    </div>
  );
}

export default CategoryList;
