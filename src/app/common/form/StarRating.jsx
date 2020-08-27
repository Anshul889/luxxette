import React from 'react';
import { Rating } from 'semantic-ui-react';

const StarRating = ({ input, meta: {touched,error} }) => (
  <Rating
    icon='star'
    value={input.value}
    onRate={(e, data) => input.onChange(data.rating)}
    defaultRating={0}
    maxRating={5}
  />
);

export default StarRating;
