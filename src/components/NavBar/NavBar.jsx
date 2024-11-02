import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.flex}>
        
        <a className={styles.link} href='#'>x</a>
        <div className={styles.links}>
        </div>
    </div>
  )
}

export default NavBar