import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react';

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import SolidSvg from './SolidSVG';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function closeNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
        element.style.width = '0px';
    }
  }

  const pathname = usePathname();

  return (
    <div id='navMenu' className={`fixed top-0 right-0 flex justify-start items-center flex-col lg:hidden transition-all duration-200 bg-secondary-black text-secondary-white-97 h-screen w-0 z-50 overflow-hidden`}>
      <div className={`relative flex justify-start items-center flex-col h-full w-full `}>
          <div className={` ${styles.flexBetween} w-full mb-10 sm:px-7 px-7 h-[10vh] activeLink`}>
            <div className=' w-12 h-12 dark:bg-secondary-white-97 bg-secondary-black grid content-center rounded-full overflow-hidden'>
              <LightModeBtn />
            </div>
              
            <button onClick={()=> closeNavMenu()} aria-label="close_na_menu" className=''>
                <SolidSvg width={'24px'} height={'24px'} className={'SVGW2B'} color={'#fff'} path={'/close-x.svg'} />
            </button>
          </div>

          <nav className={` ${styles.flexStart} flex-col w-full gap-6 text-xl p-7 `}>
              <Link href="/" className={`${pathname === '/' ? 'activeLinksm' : ''} w-full transition-all duration-200 hover:bg-primary-grey-28 px-4 py-1`}>Home</Link>
          </nav>

          <div className=' '>
            <p>Developed with &lt;3 </p>
            <p>by <Link className='link_footer' href={'https://twitter.com/EA_Krowl'}>ELATTAR Ayoub</Link></p>
          </div>
      </div>
    </div>
  );
};

export default Header;