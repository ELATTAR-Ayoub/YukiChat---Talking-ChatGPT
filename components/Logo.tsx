// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={`flex justify-end items-end gap-2 cursor-pointer`}>
        <svg width="32" height="32"  viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2_198)">
          <rect width="26" height="26" fill="#FF8AC5"/>
          <mask id="mask0_2_198" maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="26">
          <path d="M0 0L26 0V26H0L0 0Z" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_2_198)">
          <path d="M6.15841 36.6916C5.23094 28.8972 5.28932 24.6844 5.98914 16.5403L17.311 37.0567L6.15841 36.6916Z" fill="#343540"/>
          <path d="M5.98188 16.5506C6.08545 16.0634 19.6709 5.31628 20.3113 5.32209C20.9517 5.3279 40.125 13.4527 41.2585 16.9303C42.392 20.4079 17.7333 39.3243 14.7993 37.6637C11.8654 36.0031 5.87831 17.0379 5.98188 16.5506Z" fill="white"/>
          <path d="M10.6941 15.1927C9.52098 5.01578 9.52098 5.01578 19.4818 8.16713" stroke="#343540" stroke-linecap="round"/>
          <rect x="13.6141" y="21.2482" width="2" height="2" rx="1" transform="rotate(-41.3029 13.6141 21.2482)" fill="#343540"/>
          <rect x="18.2185" y="17.2027" width="2" height="2" rx="1" transform="rotate(-41.3029 18.2185 17.2027)" fill="#343540"/>
          <rect x="22.8229" y="13.1572" width="2" height="2" rx="1" transform="rotate(-41.3029 22.8229 13.1572)" fill="#343540"/>
          </g>
          </g>
          <defs>
          <clipPath id="clip0_2_198">
          <rect width="26" height="26" fill="white"/>
          </clipPath>
          </defs>
        </svg>

        <div className='relative font-bold text-sm text-accent-color-71 top-1'>
          Convobuy
        </div>
    </div>
  );
};

export default Loader;