import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({Category, setCategory}) => {
  return (
    <div className='explore-menu' id = 'explore-menu'> 
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt magnam quos alias saepe nesciunt quas suscipit in, quasi delectus dolorum itaque commodi sit aspernatur numquam doloribus porro quia minus? Quia odio omnis dolores corrupti labore ex, quibusdam atque nihil blanditiis nemo, recusandae, neque dolor optio pariatur cumque id ducimus debitis.</p>
      <div className="explore-menu-list">
        {menu_list.map((items, index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===items.menu_name?"All":items.menu_name)} className="explore-menu-list-items">
                    <img className={Category === items.menu_name?'active':""} key={index} src={items.menu_image} alt="" />
                    <p>{items.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
