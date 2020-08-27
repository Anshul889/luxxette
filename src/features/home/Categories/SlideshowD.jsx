import { CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import React from "react";

const SlideshowD = () => (
  <CarouselProvider
  naturalSlideWidth={519}
  naturalSlideHeight={340}
  totalSlides={3}
  hasMasterSpinner
  lockOnWindowScroll={true}
  isPlaying={true}
  interval={2000}
><div style={{position: 'relative'}}>
  <Slider>
    <Slide tag="a" index={0}>
      <Image src={'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'} />
    </Slide>
    <Slide tag="a" index={1}>
      <Image src={'https://images.unsplash.com/photo-1491956142110-8a4226a12077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'} />
    </Slide>
    <Slide tag="a" index={2}>
      <Image src={'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80'} />
    </Slide>
  </Slider>
  </div>
</CarouselProvider>
);

export default SlideshowD;