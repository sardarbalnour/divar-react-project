import styles from "./Sidebar.module.css";

function Sidebar({ categories }) {
  // console.log(categories);

  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی</h4>
      <ul>
        {categories.data.map((i) => (
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
