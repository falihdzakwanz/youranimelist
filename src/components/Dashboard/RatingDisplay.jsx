"use client";

import React from 'react';
import StarRatings from 'react-star-ratings';

const RatingDisplay = ({ rating }) => {
  return (     
        <div className="flex flex-row">
            <StarRatings 
                rating={rating} 
                isSelectible={false}
                starDimension={"32"}
                starRatedColor="#ffd700" 
                starHoverColor="#ffd700" 
                starEmptyColor="#808080"                
            />
        </div>
  )
}

export default RatingDisplay
