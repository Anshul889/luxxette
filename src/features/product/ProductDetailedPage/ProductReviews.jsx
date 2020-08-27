import React from 'react'
import styles from './ProductReviews.module.css'
import { Rating } from 'semantic-ui-react'
import format from 'date-fns/format'

const ProductReviews = ({reviews, removeReview, isReviewer, product, auth}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {reviews && reviews.map(review => 

          <div className={styles.review} key={review.id}>
            <div className={styles.image}>
              <img src={review.photoURL} alt=''/>
            </div>
            <div>
              <div>{review.displayName}</div>
            <Rating size='tiny' disabled icon='star' rating={review.rating} maxRating={5} style={{ transform: 'translateY(1px) translateX(-2px)' }}/>
              {review.addDate && <span style={{fontSize: '10px', paddingLeft: '5px'}}>{format(review.addDate.toDate(), 'do LLL yyyy')}</span>}
            {isReviewer && review.id === auth.uid && 
              <span style={{ fontSize: '10px', color: 'red', textTransform: 'underline', paddingLeft: '5px', cursor: 'pointer'}} onClick={() =>removeReview(product)}>delete</span>
            }
            <div className={styles.comment}>{review.comment}</div>
            </div>
          </div>     
          )}
      </div>
    </div>
  )
}

export default ProductReviews
