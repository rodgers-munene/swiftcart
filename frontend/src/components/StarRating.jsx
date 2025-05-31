import React from 'react'
import { Star, StarHalf, Star as StarEmpty } from 'lucide-react';


const StarRating = ({ rating, max = 5 }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5
    const emptyStars = max - fullStars - (hasHalfStar? 1 : 0)

  return (
    <div className="flex items-center text-yellow-400 gap-1 ">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" stroke="none" className='w-4 h-4'/>
      ))}
      {hasHalfStar && (<div className='relative'><StarHalf fill="currentColor" stroke="none" className='absolute w-4 h-4' /> <StarEmpty className='text-gray-300 w-4 h-4' stroke='none' fill='lightGray'/></div>)}
      {[...Array(emptyStars)].map((_, i) => (
        <StarEmpty key={`empty-${i}`} fill='lightGray' className="text-gray-300 w-4 h-4" stroke='none'/>
      ))}
    </div>
  )
}

export default StarRating