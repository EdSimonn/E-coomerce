import React from 'react'
import HeroCarousel from '../components/HeroCarousel'
import Items from '../components/Items'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div className='home'>
      <HeroCarousel/>
      <Items/>
      <Subscribe/>
    </div>
  )
}

export default Home