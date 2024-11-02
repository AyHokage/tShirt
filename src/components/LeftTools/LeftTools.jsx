import { useState, useRef } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import styles from './LeftTools.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextHeight, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import SparclesIco from '../../icos/SparclesIco';
import FontFamilyDropDown from '../FontFamilyDropDown/FontFamilyDropDown';

const LeftTools = ({ setImageWidth, setImageHeight, setImageRotation, setTextRotation, setFontFamily, fontFamily, setFontSize, setFontColor, image, deleteImg, label, setTshirtLabel, setColor, addImageToCanvas, setLabel }) => {

    const [chosen, setChosen] = useState('Yüklə');
    const fileInputRef = useRef(null); // Create a ref for the file input

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    }; 

    const deleteImgAndFile = () => {
        deleteImg();
        fileInputRef.current.value = null; // Clear the file input
    }

    return (
        <div className={styles.column}>
            <div className={styles.btns}>
                <button onClick={() => setChosen('Yazı')} className={chosen!=='Yazı' ? styles.chosen : styles.btn}><FontAwesomeIcon icon={faTextHeight} /> Yazı</button>
                <button onClick={() => setChosen('Yüklə')} className={chosen!=='Yüklə' ? styles.chosen : styles.btn}><FontAwesomeIcon icon={faArrowUpFromBracket} /> Yüklə</button>
                <button onClick={() => setChosen('AI ilə yarat')} className={chosen!=='AI ilə yarat' ? styles.chosen : styles.btn}><SparclesIco color={chosen!=='AI ilə yarat' ? 'grey' : 'white'} /> AI ilə yarat</button>
            </div>
            <div className={styles.container}>
                <div className={chosen==='Yüklə' ? styles.choiceImg : styles.none}>
                    <h3 className={styles.title}>Choose image</h3>
                    <input ref={fileInputRef} id="fileInput" onChange={(e) => addImageToCanvas(e)} className={styles.none} type='file' />
                    <button onClick={handleFileButtonClick} className={styles.btn}>Add image</button>

                    {image && image.length > 0 && <div className={styles.file}>
                        <div className={styles.imgAndTitle}>
                            <img className={styles.img} src={image} alt='file image' />
                               
                            <div className={styles.text}>
                                <p className={styles.title}>Image 1</p>
                                <div className={styles.flex}>  
                                    <div className={styles.col}>
                                        <h3 className={styles.title}>Width</h3>  
                                        <input onChange={(e) => setImageWidth(e.target.value)} min={10} max={100} className={styles.input} type='number' placeholder='10' />                            
                                    </div>
                                    <div className={styles.col}>
                                        <h3 className={styles.title}>Height</h3>  
                                        <input onChange={(e) => setImageHeight(e.target.value)} min={10} max={100} className={styles.input} type='number' placeholder='10' />
                                    </div>
                                    <div className={styles.col}>
                                        <h3 className={styles.title}>Rotation</h3>  
                                        <input onChange={(e) => setImageRotation(e.target.value)} min={10} max={100} className={styles.input} type='number' placeholder='10' />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <button onClick={deleteImgAndFile} className={styles.deleteBtn}>x</button>
                    </div>}

                    {
                        !image && image.length === 0 && <div className={styles.noItems}>
                            <h3 className={styles.noItemsTitle}>No files yet ƪ(˘⌣˘)ʃ</h3>
                        </div>
                    }
                </div>

          <div className={chosen==='Yazı' ? styles.choiceText : styles.none}>
            <h3 className={styles.title}>Write something</h3>
            <input onChange={(e) => setLabel(e.target.value)} className={styles.input} type='text' placeholder='Something' />

            <h3 className={styles.title}>Choose color</h3>
            <ColorPicker setColor={setFontColor} />
            
            <h3 className={styles.title}>Choose font size</h3>
            <input onChange={(e) => setFontSize(e.target.value)} min={10} max={100} className={styles.input} type='number' placeholder='10' />
            
            <h3 className={styles.title}>{`Choose text's rotation (in degrees)`}</h3>
            <input onChange={(e) => setTextRotation(e.target.value)} min={10} max={360} className={styles.input} type='number' placeholder='0' />

            <h3 className={styles.title}>Choose font family</h3>
            <FontFamilyDropDown fontFamily={fontFamily} setFontFamily={setFontFamily} />
            
            <button onClick={() => setTshirtLabel(label)} className={styles.btn}>Add text</button>
          </div>

        </div>
      </div>
    )
}

export default LeftTools;