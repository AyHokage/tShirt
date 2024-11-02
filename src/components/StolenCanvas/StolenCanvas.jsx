import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from './StolenCanvas.module.css'

const StolenCanvas = ({ draw, height, width }) => {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  });

  return <canvas className={styles.cvs} ref={canvas} />;
};

StolenCanvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default StolenCanvas;
