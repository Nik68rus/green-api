import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.fixedContainer}>
      <div className={styles.spinner} />
    </div>
  );
};
