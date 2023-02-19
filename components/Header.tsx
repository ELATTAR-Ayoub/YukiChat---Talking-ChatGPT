import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import Logo from './Logo';
import SolidSvg from './SolidSVG';

const Header = () => {
  const router = useRouter();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function openNavMenu() {
    const element = document.getElementById("navMenu");
    if (element) {
      element.style.width = '66.666667%';
    }
  }

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop < lastScrollTop) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollTop(currentScrollTop);
    }

    if (typeof window !== 'undefined') 
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (typeof window !== 'undefined') 
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const pathname = usePathname();

  

  return (
    <section
      className={` ${styles.flexBetween} fixed top-0 w-full 2xl:max-w-[1440px] px-5 sm:px-7 z-20 bg-primary-grey dark:bg-secondary-white-97 transition-all duration-300 overflow-hidden ${
        isScrollingUp ? " h-0" : "h-[10vh]"
      }`}
    >
      <Link href="/"><Logo /></Link>

      <div className='lg:flex flex-row-reverse gap-8 items-center hidden content-center cursor-pointer'>
        <ul className='flex items-center gap-4 list-none'>
          <li>
            <Link href="/" className={`${pathname === '/' ? 'activeLink' : ''} transition-all duration-200 text-secondary-white dark:text-primary-grey hover:bg-primary-grey dark:hover:bg-secondary-white-97 p-3 px-8 rounded`}>Home</Link>
          </li>
        </ul>

        <LightModeBtn />

      </div>

      <div className='flex items-center lg:hidden grid-cols-2 gap-8 content-center cursor-pointer'>
        <LightModeBtn />
        <button onClick={() => openNavMenu()} className='grid content-center' aria-label="open_nav_menu">
          <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W'} color={'#FFF'} path={'/menu.svg'} />
        </button>
      </div>
    </section>
  );
};

export default Header;


