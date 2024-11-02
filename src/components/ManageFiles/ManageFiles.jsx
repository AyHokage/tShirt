import styles from './ManageFiles.module.css'
import ColorPicker from '../ColorPicker/ColorPicker'
import { useState } from 'react'

const ManageFiles = ({setColor}) => {

  const [size, setSize] = useState('S');

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className={styles.file}>
      <div className={styles.btns}>
        <button className={styles.btn}>Məhsullar</button>
        <button className={`${styles.btn} ${styles.chosen}`}>Özün yarat</button>
      </div>

      <div className={styles.picker}>
        <h2 className={styles.heading}>Oversize T-shirt</h2>
        <hr className={styles.hr} />
        <h3 className={styles.title}>Məhsul rəngi</h3>  
            <ColorPicker setColor={setColor} />
        
        <h3 className={styles.title}>Ölçü</h3>  
        <div className={styles.btns}>
          {sizes.map((s, i) => <button className={styles.roundBtn} style={{backgroundColor: `${s}`}} key={i} onClick={() => setSize(s)}>{s}</button>)}
        </div>

        <div className={styles.spaceBetween}>
          <h3 className={styles.title}>Ümümi Qiymət</h3>
          <h3 className={styles.title}>25 AZN</h3>
        </div>

        <button className={styles.orderBtn}>Sifariş et</button>
        {/* {image && image.length > 0 && <div className={styles.file}>
          <div className={styles.imgAndTitle}>
              <img className={styles.img} src={image} alt='file image' />
              <p className={styles.title}>Image 1</p>
          </div>
          <button onClick={() => deleteImg()} className={styles.btn}>x</button>
        </div>}

        {
          !image && image.length === 0 && <div className={styles.noItems}>
              <h3 className={styles.noItemsTitle}>No files yet ƪ(˘⌣˘)ʃ</h3>
          </div>
        } */}
      </div>
    </div>
  )
}

export default ManageFiles