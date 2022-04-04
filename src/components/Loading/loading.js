import styles from './loading.module.css';

export function Loading() {
  return (
    <p className={`text text_type_main-large ${styles.loading}`}>
      Загрузка...
    </p>
  )
}