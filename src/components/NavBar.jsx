import React from 'react';
import bunny from '../images/nav_bunny.png'
import web_title from '../images/web_title.png'
import { FiShoppingCart } from 'react-icons/fi';
import { GiSheep } from 'react-icons/gi';

const NavBar = () => {
  return (
    <div className='main-bg flex justify-between items-center just-another-hand px-4 text-3xl font-medium'>
      <nav className=''>
        <ul className='flex list-none pt-32 ml-20'>
          <li className='mr-4'>
            <a href='/'>
              home
            </a>
          </li>
          <li className='mr-4'>
            <a href='/about'>
              about
            </a>
          </li>
          <li className='mr-4'>
            <a href='/shop'>
              shop
            </a>
          </li>
          <li className='mr-4'>
            <a href='/commissions'>
              commissions
            </a>
          </li>
          <li>
            <a href='/contact'>
              contact
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <img src={ web_title } alt='' />
        <img src={ bunny } alt='' className='ml-20 pb-10'/>
      </div>
      <div className='flex pt-32 mr-20'>
        <GiSheep size={25} className='mr-4' />
        <FiShoppingCart size={25} />
      </div>
    </div>
  );
}

export default NavBar;