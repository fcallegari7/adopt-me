import React from "react";
import { Photo } from "@frontendmasters/pet";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

class Carousel extends React.Component<IProps, IState> {
  // this way needs babel to convert it in JS. Otherwise you need to specify the constructor and super(props).
  public state = {
    photos: [],
    active: 0
  };

  public static getDerivedStateFromProps({ media }: IProps) {
    // This method treats data coming from props.
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // Arrow functions don't create context, so you don't need to bind this. Event listeners and functions passed in the children should use arrow function to guaranteee it has the right context.
  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        // + parses the string to int.
        // dataset is for getting the data attribute value from the html element.
        active: +event.target.dataset.index
      });
    }
  };

  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
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
