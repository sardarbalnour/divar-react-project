import { useQuery } from "@tanstack/react-query";

import { getCategory } from "../../services/admin";

function Sidebar() {
  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log(data);

  return (
    <div>
      <h4>دسته بندی</h4>
      <ul>
        {data?.data.map((i) => (
          <li key={i._id}>
            <img src={`${i.icon}.svg`} />
            <p>{i.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
