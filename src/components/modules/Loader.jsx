import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.parent}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <span>دیــــوار </span>
          <span>دیــــوار </span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
