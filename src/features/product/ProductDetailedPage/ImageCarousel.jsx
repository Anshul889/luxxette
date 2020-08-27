import { CarouselProvider, Image, Slide, Slider, ButtonNext, ButtonBack, DotGroup} from "pure-react-carousel";
import React from "react";

const ImageCarousel = ({photoURL, photoURL2, photoURL3}) => (
  <CarouselProvider
    naturalSlideWidth={972}
    naturalSlideHeight={1297}
    totalSlides={3}
    hasMasterSpinner
    lockOnWindowScroll={true}
  ><div style={{position: 'relative'}}>
    <Slider>
      <Slide tag="a" index={0}>
        <Image src={photoURL} />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src={photoURL2} />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src={photoURL3} />
      </Slide>
    </Slider>
    <br></br>
    <ButtonBack style={{position: 'absolute', top: '45%', left: '-20px', background: 'transparent', border: 'none'}} children='<'/>
    <ButtonNext style={{position: 'absolute',  top: '45%', right: '-20px', background: 'transparent', border: 'none'}} children='>'/>
    </div>
    <DotGroup/>
  </CarouselProvider>
);

export default ImageCarousel;