import PropTypes from "prop-types";

import classes from "./Rating.module.scss";

const Rating = ({ rating, text, color }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className='rating'>
      {fullStars
        ? [...Array(fullStars)].map((s, index) => (
            <span key={index}>
              <i className={`fas fa-star ${classes.Gold}`}></i>
            </span>
          ))
        : null}
      {halfStar ? (
        <span>
          <i className={`fas fa-star-half-alt ${classes.Gold}`}></i>
        </span>
      ) : null}
      {emptyStars
        ? [...Array(emptyStars)].map((s, index) => (
            <span key={index}>
              <i className={`far fa-star ${classes.Gold}`}></i>
            </span>
          ))
        : null}
      <span> {text ?? null}</span>
    </div>
  );
};

Rating.prototype = {
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Rating;
