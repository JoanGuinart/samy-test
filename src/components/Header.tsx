import styles from '@styles/Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <img src="/samy-logo.svg" alt="SAMY Enterprise Logo" />
      <input type="text" placeholder='input aqui' />
    </div>
  )
}

export default Header