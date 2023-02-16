// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={` ${styles.flexCenter} flex-col text-primary-grey gap-4 fixed top-0 left-0 w-full h-full bg-accent-color-77  opacity-50 z-30`}>
      <div className="load opacity-100">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className=' animate-bounce font-bold'>Hang Still...</div>
    </div>
  );
};

export default Loader;