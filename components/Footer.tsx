import Link from 'next/link';
import { useRouter } from 'next/navigation'

// styles
import styles from '../styles/index';

// components
import Logo from './Logo';

// motion
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer, textVariant } from '../utils/motion';


const Header = () => {
  const router = useRouter();

  return (
    <section className={` ${styles.flexCenter} flex-col w-full bg-secondary-black text-secondary-white-97 py-16 px-5 sm:px-7`}>
        <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} 
        className={` ${styles.flexStart} flex-col gap-16 2xl:max-w-[1440px] w-full`}>

            <div className={`flex items-center justify-center w-full gap-16`}>
                <motion.div 
                    variants={fadeIn('right', 'spring', 0, 0.8)}
                    className={` `}>
                    <Link href="/"> <Logo/> </Link>
                </motion.div>
            </div>

            <motion.div 
            variants={fadeIn('right', 'spring', 0, 0.8)}
            className={` w-full lg:w-full`}>
                <p className='text-base text-secondary-color my-3 text-center'>Developed with &lt;3 by ELATTAR Ayoub.</p>
                <p className=' opacity-70 text-base text-secondary-color text-center'>Copyright &#169; 2023 YukiChat</p>
            </motion.div>
        </motion.div>
        
    </section>
  );
};

export default Header;