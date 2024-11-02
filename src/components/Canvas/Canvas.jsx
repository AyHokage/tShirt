// import React, { useRef, useEffect, useState } from "react";
// import styles from './Canvas.module.css';
// import LeftTools from "../LeftTools/LeftTools";
// import ManageFiles from "../ManageFiles/ManageFiles";

// const Canvas = ({props}) => {
//     const [image, setImage] = useState('');
//     const [imageObj, setImageObj] = useState(null);
//     const [color, setColor] = useState('white');
//     const [fontColor, setFontColor] = useState('black');
//     const [label, setLabel] = useState('');
//     const [tshirtLabel, setTshirtLabel] = useState('');
//     const canvasRef = useRef(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setImage(event.target.result);
//                 let img = new Image();
//                 img.src = image;
//                 setImageObj(img)
//                 console.log(imageObj)
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     useEffect(() => {
//         if (typeof window !== 'undefined'){
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
    
//             const front = new Image();
//             front.src = '/crew_front.png';
    
//             const drawImageCentered = () => {
//                 if (image) {
//                     const img = new Image();
//                     img.src = image;
//                     img.onload = function() {
//                         const x = (canvas.width / 2) - 35;
//                         const y = (canvas.height / 2) - 30;
//                         context.drawImage(img, x, y, 70, 40);
//                     };
//                 }
//             };
    
//             const writeLabel = () => {
//                 context.font = '20px Arial';
//                 context.fillStyle = fontColor;
//                 const textWidth = context.measureText(label).width;
//                 const x = (canvas.width / 2) - (textWidth / 2); // Calculate center position based on text width
//                 const y = (canvas.height / 2) + 30; // Position the label below the front image
//                 context.fillText(tshirtLabel, x, y);
//             }
    
//             front.onload = function() {
//                 const x = (canvas.width / 2) - 100;
//                 const y = (canvas.height / 2) - 50;
    
//                 const frontImageWidth = 200;
//                 const frontImageHeight = 100;
    
//                 context.fillStyle = color;
//                 context.fillRect(x, y, frontImageWidth, frontImageHeight);
                
//                 drawImageCentered(); // Draw the user-uploaded image first
    
//                 context.drawImage(front, x, y, frontImageWidth, frontImageHeight);
    
//                 writeLabel(); // Draw the label on top of the front image
//             };
            
//             context.clearRect(0, 0, canvas.width, canvas.height);
//         }
//     }, [image, tshirtLabel, color, fontColor]);

//     return (
//         <div className={styles.flex}>
//             <LeftTools setFontColor={setFontColor} image={image} deleteImg={() => setImage('')} label={label} setTshirtLabel={setTshirtLabel} setLabel={setLabel} addImageToCanvas={handleImageChange} />
//             <canvas
//                 className={styles.canvas}
//                 ref={canvasRef}
//                 {...props} 
//             />
//             <ManageFiles setColor={setColor} image={image} deleteImg={() => setImage('')} />
//         </div>
//     ); 
// }

// export default Canvas;





import { useState, useEffect } from 'react';
import styles from './Canvas.module.css';
import LeftTools from "../LeftTools/LeftTools";
import ManageFiles from "../ManageFiles/ManageFiles";
import { Stage, Layer, Image as KonvaImage, Text, Rect } from 'react-konva';

const Canvas = () => {
  const [showFront, setShowFront] = useState(true);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(200);
  const [textRotation, setTextRotation] = useState(0);
  const [tShirt, setTshirt] = useState(null);
  const [backTshirt, setBackTshirt] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [color, setColor] = useState('white');
  const [fontColor, setFontColor] = useState('black');
  const [fontSize, setFontSize] = useState(10);
  const [fontFamily, setFontFamily] = useState('Impact');
  const [label, setLabel] = useState('');
  const [tshirtLabel, setTshirtLabel] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [imagePosition, setImagePosition] = useState({
    x: (window.innerWidth / 2) / 2 - 100, 
    y: (window.innerHeight / 10 * 8) / 2 - 100, 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        const img = new Image();
        img.src = event.target.result;
        setImageObj(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragMove = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();
  
    const areaWidth = 250;
    const areaHeight = 400;
    const centerX = (window.innerWidth / 2) / 2 - 5; 
    const centerY = (window.innerHeight / 10 * 8) / 2 - 20;

    const constrainedX = Math.min(
      Math.max(newX, centerX - areaWidth / 2), 
      centerX + areaWidth / 2 - imageWidth 
    );
    const constrainedY = Math.min(
      Math.max(newY, centerY - areaHeight / 2), 
      centerY + areaHeight / 2 - imageHeight 
    );
  
    setImagePosition({ x: constrainedX, y: constrainedY });
    e.target.x(constrainedX); 
    e.target.y(constrainedY); 
    e.target.getStage().batchDraw();
  };
  
  const handleDragEnd = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();
  
    const areaWidth = 250;
    const areaHeight = 400;
    const centerX = (window.innerWidth / 2) / 2 - 5; 
    const centerY = (window.innerHeight / 10 * 8) / 2 - 20;
  
    setImagePosition({ 
      x: Math.min(
        Math.max(newX, centerX - areaWidth / 2), 
        centerX + areaWidth / 2 - imageWidth
      ), 
      y: Math.min(
        Math.max(newY, centerY - areaHeight / 2), 
        centerY + areaHeight / 2 - imageHeight 
      ) 
    });
  };
  

  useEffect(() => {
    const img = new window.Image();
    img.src = '/crew_front.png'; 
    img.onload = () => {
      setTshirt(img);
    };

    const backImg = new window.Image();
    backImg.src = '/crew_back.png';
    backImg.onload = () => {
      setBackTshirt(backImg)
    }
  }, []); 

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      setImageObj(img);
    }
  }, [imageSrc]);


  return (
    <div className={styles.flex}>
      <LeftTools 
        setImageRotation={setImageRotation}
        setImageWidth={setImageWidth}
        setImageHeight={setImageHeight}
        setTextRotation={setTextRotation}
        setFontFamily={setFontFamily}
        fontFamily={fontFamily}
        setFontSize={setFontSize}
        setFontColor={setFontColor} 
        image={imageObj ? imageObj.src : ''} 
        deleteImg={() => {setImageSrc(''); setImageObj('');}} 
        label={label} 
        setTshirtLabel={setTshirtLabel} 
        setLabel={setLabel} 
        addImageToCanvas={handleImageChange} 
      />
      <div className={styles.canvas}>
      <Stage width={window.innerWidth / 2} height={(window.innerHeight / 10) * 8}>
        <Layer>
            {tShirt && (
            <>
              <Rect
                width={598} 
                height={650} 
                x={(window.innerWidth / 2) / 2 - 300} 
                y={(window.innerHeight / 10 * 8) / 2 - 325} 
                fill={color} 
                listening={false} 
              />

              <KonvaImage
                image={tShirt}
                width={100}
                height={130}
                x={10}
                y={10} 
                stroke="lightGrey"
                strokeWidth={2} 
                onClick={() => setShowFront(true)}
              />

              <KonvaImage
                image={backTshirt}
                width={100}
                height={130}
                x={10}
                y={150} 
                stroke="lightGrey"
                strokeWidth={2} 
                onClick={() => setShowFront(false)}
              />
              
              <KonvaImage
                image={showFront ? tShirt : backTshirt}
                width={600}
                height={650}
                x={(window.innerWidth / 2) / 2 - 300}
                y={(window.innerHeight / 10 * 8) / 2 - 325} 
              />

              {imageObj && (
                <KonvaImage
                  image={imageObj}
                  width={imageWidth} 
                  height={imageHeight}
                  x={imagePosition.x}
                  y={imagePosition.y}
                  draggable
                  rotation={imageRotation}
                  onDragMove={handleDragMove} 
                  onDragEnd={handleDragEnd}
                />
              )}

              {tshirtLabel && (
                <Text
                  draggable
                  text={tshirtLabel}
                  fontSize={fontSize}
                  fill={fontColor}
                  fontFamily={fontFamily}
                  x={(window.innerWidth / 2) / 2 - (label.length * 10) / 2} 
                  y={(window.innerHeight / 10 * 8) / 2 + 30} 
                  rotation={textRotation}
                />
              )}

              <Rect
                width={250} 
                height={400}
                x={(window.innerWidth / 2) / 2 - 130} 
                y={(window.innerHeight / 10 * 8) / 2 - 220}
                fill="transparent"
                stroke="lightGrey"
                strokeWidth={2} 
                listening={false} 
              />

            </>
          )}
        </Layer>
      </Stage>
      </div>
      <ManageFiles setColor={setColor} image={imageObj ? imageObj.src : ''} />
    </div>
  );
};

export default Canvas;

