import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

function App() {


  let getCursorPos = (e) => {
    let img = document.getElementById("zoomer");

    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

  let [active , setActive] = useState(false)


  let moveLens = (e) => {

    let lens = document.getElementById("zoom-lens");
    let img = document.getElementById("zoomer");
    let zoomedImg = document.getElementById("zoomed-img");


    

    let imageStartX = img.offsetLeft;
    let imageStartY = img.offsetTop;

    let imageEndX = imageStartX + img.offsetWidth
    let imageEndY = img.imageStartY + img.offsetHeight


  

    /* Calculate the position of the lens: */

 
    let x = e.clientX;
    let y = e.clientY
    /* Prevent the lens from being positioned outside the image: */
  

    //local grid for image
    let lensX = (x - lens.offsetWidth / 2) - imageStartX;

    let lensY = (y - lens.offsetHeight / 2) - imageStartY

    let imgW = imageEndX - imageStartX;
    let imgH = img.offsetHeight

    let lensW = lens.offsetWidth
    let lensH = lens.offsetHeight


    if (lensX <= 0) lensX = 0
    else if (lensX + lensW >= imgW) lensX = imgW - lensW

    if (lensY <= 0) lensY = 0;
    else if (lensY + lensH >= imgH) lensY = imgH - lensH;

    console.log(imgH)



    let globalX = lensX + imageStartX
    let globalY = lensY + imageStartY

    
    lens.style.left = globalX + "px"
    lens.style.top = globalY + "px"


    let cx = zoomedImg.offsetWidth / lens.offsetWidth;
    let cy = zoomedImg.offsetHeight / lens.offsetHeight;


    zoomedImg.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    zoomedImg.style.left = `${imageEndX + 10}px`
    zoomedImg.style.backgroundPosition = "-" + ((lensX) * cx) + "px -" + ((lensY) * cy) + "px"
    
    // console.log(zoomedImg.style)
  }

  let isActive = (x, y) => {

   
    let img = document.getElementById("zoomer");


    let imgWidth = img.offsetLeft + img.offsetWidth
    let imgHeight = img.offsetTop + img.offsetHeight


    let imageStartX = img.offsetLeft;
    let imageStartY = img.offsetTop;

    let xActive = false;
    let yActive = false;


    if (x >= imageStartX && x <= imgWidth) xActive = true;
    if (y >= imageStartY && y <= imgHeight) yActive = true;

    setActive(xActive && yActive);
  }
  useEffect(() => {
    let img = document.getElementById("zoomer");
    let lens = document.getElementById("zoom-lens");

    window.addEventListener("mousemove", e => { isActive(e.clientX, e.clientY) })

    img.addEventListener("mousemove",  moveLens)
    lens.addEventListener("mousemove", moveLens)

    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
  

  }, [])
  return (
    <div className="App">


      <Image id={"zoomer"} src={"https://images-na.ssl-images-amazon.com/images/I/71WwmBp3KFL._AC_SL1500_.jpg"} />
      <ZoomedImage   active={active} id="zoomed-img" bgImg={"url(https://images-na.ssl-images-amazon.com/images/I/71WwmBp3KFL._AC_SL1500_.jpg)"} />
      <ZoomLens active={active} id="zoom-lens"/>
    </div>
  );
}


let ZoomLens = styled.div`

  width: 200px;
  height: 150px;
  border-radius: .2rem;
  position: absolute;
  display: ${({ active }) => active ? "block" : "none"};
background-color: rgba(240,240,240, 0.5);
  
`


let Image = styled.img`
  width: 400px;
  height: 400px !important;
`

let ZoomedImage = styled.div`
  height: 400px;
  background-image: ${({bgImg}) => bgImg};
  width: 30rem;
  display: ${({ active }) => active ? "block" : "none"};
  // background-repeat: no-repeat;
  z-index: 100;
  border-radius: .2rem;
  position: absolute;
  // left: ${({left}) => left}px;
  // transform: translate(${({ imgWidth }) => imgWidth}, 0);
  
`

export default App;
