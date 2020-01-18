import React from "react";

class Carousel extends React.Component {
  //this way needs babel to convert it in JS. Otherwise you need to specify the constructor and super(props).
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    //This method treats data coming from props.
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // Arrow functions don't create context, so you don't need to bind this. Event listeners and functions passed in the children should use arrow function to guaranteee it has the right context.
  handleIndexClick = event => {
    this.setState({
      //+ parses the string to int.
      //dataset is for getting the data attribute value from the html element.
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
