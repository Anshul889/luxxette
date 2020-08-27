import { CarouselProvider, Image, Slide, Slider} from "pure-react-carousel";
import React from "react";

const Slideshow = () => (
  <CarouselProvider
  naturalSlideWidth={375}
  naturalSlideHeight={519}
  totalSlides={3}
  hasMasterSpinner
  lockOnWindowScroll={true}
  isPlaying={true}
  interval={2000}
><div style={{position: 'relative'}}>
  <Slider>
    <Slide tag="a" index={0}>
      <Image src={'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80'} />
    </Slide>
    <Slide tag="a" index={1}>
      <Image src={'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'} />
    </Slide>
    <Slide tag="a" index={2}>
      <Image src={'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'} />
    </Slide>
  </Slider>
  </div>
</CarouselProvider>
);

export default Slideshow;