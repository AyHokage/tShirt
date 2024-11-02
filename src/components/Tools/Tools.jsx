import React from "react";
import styles from './Tools.module.css';
import ColorPicker from "../ColorPicker/ColorPicker";

const Tools = ({ setColor, addImageToCanvas, setLabel }) => {
  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className={styles.column}>
      <input
        type='file'
        id="fileInput"
        onChange={(e) => addImageToCanvas(e)}
        className={styles.fileInput}
      />
      <div className="flex"><button className={styles.btn} onClick={handleFileButtonClick}>
        Add Image
      </button>
      <input placeholder="Add your label" type='text' onChange={(e) => setLabel(e.target.value)} />
      <button className={styles.btn}>Add text</button></div>
      <ColorPicker setColor={setColor} />
    </div>
  );
};

export default Tools;
