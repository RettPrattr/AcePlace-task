
import styles from '../app/styles/404/404.module.scss';


export default function Custom404() {
    return (
      <div className={styles.container}>
          <img src="404.svg" alt="Страница не найдена" />
      </div>
    );
  }