import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles/index';
import stylescss from '../styles/page.module.css';

// components
import LightModeBtn from './LightModeBtn.jsx';
import Logo from './Logo';
import SolidSvg from './SolidSVG';

// constants
import {Footer_links} from '../constants/index'

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer, textVariant } from '../utils/motion';


const Header = () => {
  const router = useRouter();

  return (
    <section className={` ${styles.flexCenter} flex-col w-full bg-secondary-black text-secondary-white-97 py-16 px-3 sm:px-7`}>
        <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} 
        className={` ${styles.flexStart} flex-col gap-16 2xl:max-w-[1440px] w-full`}>

            <div className={`flex items-start justify-center flex-col lg:flex-row w-full gap-16`}>
                <motion.div 
                    variants={fadeIn('right', 'spring', 0, 0.8)}
                    className={` `}>
                    <Link href="/"> <Logo/> </Link>
                </motion.div>

                {Footer_links.map((footer_link, index) => (
                <motion.div
                variants={fadeIn('right', 'spring', (0.5 * (index + 1)), 1)}
                key={`${Footer_links}_${index}`} className={`${styles.flexStart} flex-col`}>
                    <h3 className=' text-lg font-bold text-primary-color-77 my-6'>{footer_link.title}</h3>
                    {footer_link.links.map(({ label, path }) => (
                        <Link className=' text-sm my-3 transition-all duration-300 hover:underline' key={label} href={path}>
                            {label}
                        </Link>
                    ))}
                </motion.div>
                ))}
            </div>

            <motion.div 
            variants={fadeIn('right', 'spring', 0, 0.8)}
            className={` w-full lg:w-full`}>
                {/* <p className='text-base text-secondary-color my-6'>Thank you for choosing ConvoBuy! We hope you enjoy using our app to enhance your productivity, stay inspired, and discover new music and podcasts. We&apos;re constantly working to improve the app and add new features, so please don&apos;t hesitate to reach out to us with any feedback or suggestions.</p> */}
                <p className='text-base text-secondary-color my-3 text-center'>Developed with &lt;3 by ELATTAR Ayoub.</p>
                <p className=' opacity-70 text-base text-secondary-color text-center'>Copyright &#169; 2023 ConvoBuy</p>
            </motion.div>
        </motion.div>
        
    </section>
  );
};

export default Header;