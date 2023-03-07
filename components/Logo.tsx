import Image from 'next/image';

// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={`flex justify-end items-end gap-2 cursor-pointer`}>
        {/* <Image src={'./logo.svg'} alt={'logo'} width={26} height={26} /> */}

        <div className='relative font-bold text-sm md:text-base text-accent-color-71 top-1'>
          YukiChat - Talking GPT
        </div>
    </div>
  );
};

export default Loader;