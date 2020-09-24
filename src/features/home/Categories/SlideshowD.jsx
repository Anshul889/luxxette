import { CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import React from "react";

const SlideshowD = () => (
  <CarouselProvider
  naturalSlideWidth={520}
  naturalSlideHeight={260}
  totalSlides={3}
  hasMasterSpinner
  lockOnWindowScroll={true}
  isPlaying={true}
  interval={2000}
><div style={{position: 'relative'}}>
  <Slider>
    <Slide tag="a" index={0}>
      <Image src={'https://i.imgur.com/wN21Nzu.jpg'} isBgImage={true}/>
      <div>TExt</div>
    </Slide>
    <Slide tag="a" index={1}>
      <Image src={'https://i.imgur.com/n9Np3lA.jpg'} isBgImage={true} />
    </Slide>
    <Slide tag="a" index={2}>
      <Image src={'https://i.imgur.com/jrz9meL.jpg'} isBgImage={true} />
    </Slide>
  </Slider>
  </div>
</CarouselProvider>
);

export default SlideshowD;