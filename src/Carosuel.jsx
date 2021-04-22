import React from 'react'
import { Carousel } from 'react-bootstrap';
const Carosuel = (props) => {
    const listImgs=props.img;
    return (
        <div>
        <Carousel>
        {listImgs.map((image)=>{
          return(
            <Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt="First slide"
          />
        </Carousel.Item>
          );
        })}
      </Carousel>
        </div>
    )
}

export default Carosuel
