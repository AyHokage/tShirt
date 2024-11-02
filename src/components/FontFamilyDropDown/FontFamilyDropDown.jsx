import React, { useState } from 'react';
import styles from './FontFamilyDropDown.module.css';

const FontFamilyDropDown = ({ fontFamily, setFontFamily }) => {

  const fontFamilies = [
    'Impact',
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Helvetica',
    'Cursive'
  ];

  return (
    <div>
      <select
        className={styles.input}
        id="font-family-select"
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        {fontFamilies.map((fontFamily) => (
          <option key={fontFamily} value={fontFamily}>
            {fontFamily}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontFamilyDropDown;
