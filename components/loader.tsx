// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={` ${styles.flexCenter}  absolute top-0 left-0 w-full h-full bg-primary-color-4 dark:bg-secondary-color opacity-50 z-20`}>
        
    </div>
  );
};

export default Loader;