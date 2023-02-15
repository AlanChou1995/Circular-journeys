import React, { useEffect, useState } from 'react'
import './TourCard.scss'


const TourCard = (props) => {
  const { card } = props
  const { id, name, adress, img, tags } = card
    return (
    <>
    <div className='TourCard'>
    <img src={require(`images/Tour/${img}.jpg`)}
    className='TourCardImg' alt='TourCardImg'/>
      <span className='TourCardText'>
      <h4>{ name }</h4>
      <h6>{ adress }</h6>
      </span>
    </div>
    </>
    )
  }


export default TourCard
