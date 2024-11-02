import styles from './FrontOrBackBtns.module.css';

const FrontOrBackBtns = ({}) => {
  return (
    <div className={StyleSheet.btns}>
        <img className={styles.btn} src='/crew_front.png' />
        <img className={styles.btn} src='/crew_back.png' />
    </div>
  )
}

export default FrontOrBackBtns