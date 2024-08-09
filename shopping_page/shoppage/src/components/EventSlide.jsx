import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap';
import '../css/homepage_carousel.css'

class EventSlide extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.carousel = null;
  }

  componentDidMount() {
    if (this.carouselRef.current) {
      this.carousel = new Carousel(this.carouselRef.current, {
        interval: 3000,
        pause: 'hover'
      });
    }
  }

  componentWillUnmount() {
    if (this.carousel) {
      this.carousel.dispose();
    }
  }

  handleMouseEnter = () => {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  handleMouseLeave = () => {
    if (this.carousel) {
      this.carousel.cycle();
    }
  }

  render() {
    return (
      <div
        id="eventSlide"
        className="carousel slide"
        ref={this.carouselRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/fc0bdf62-e954-43ec-9851-250bc0bac401.jpg" alt="" />
          </div>
          <div className="carousel-item">
            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/401832d2-c93a-43b1-ae06-129eb124d2cf.jpg" alt="" />
          </div>
          <div className="carousel-item">
            <img className="" src="https://cdn-v4.petpetgo.com/1800/public/32267885-ccd8-422a-a671-748ea1447f13.jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default EventSlide;