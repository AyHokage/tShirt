import React from 'react'
import styles from './ColorPicker.module.css'

const ColorPicker = ({setColor}) => {

  const colors = ['red', 'yellow', 'magenta', 'teal', 'grey']

  return (
    <div className={styles.colors}>
        {colors.map((c, i) => <button className={styles.roundBtn} style={{backgroundColor: `${c}`}} key={i} onClick={() => setColor(c)}></button>)}
        {/* <button onClick={() => setColor('red')}>red</button>
        <button onClick={() => setColor('yellow')}>yellow</button>
        <button onClick={() => setColor('magenta')}>magenta</button>
        <button onClick={() => setColor('teal')}>teal</button> 
        <button onClick={() => setColor('grey')}>grey</button> */}
      </div>
  )
}

export default ColorPicker