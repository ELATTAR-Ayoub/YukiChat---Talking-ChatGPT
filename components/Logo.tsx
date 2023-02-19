// styles
import styles from '../styles';
import stylescss from '../styles/page.module.css';

const Loader = () => {

  return (
    <div className={`flex justify-end items-end gap-2 cursor-pointer`}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="13" fill="#696FFF"/>
          <line x1="14.0834" y1="14.7511" x2="7.54453" y2="21.2899" stroke="white" stroke-width="0.7" stroke-linecap="round"/>
          <path d="M13.6057 13.9727C13.7439 13.8376 13.7465 13.616 13.6115 13.4777C13.4764 13.3394 13.2548 13.3368 13.1165 13.4719L13.6057 13.9727ZM4.23824 22.1448L3.98787 22.3893L4.47702 22.8901L4.72739 22.6455L4.23824 22.1448ZM13.1165 13.4719L4.23824 22.1448L4.72739 22.6455L13.6057 13.9727L13.1165 13.4719Z" fill="white"/>
          <line x1="12.3248" y1="12.7727" x2="5.56618" y2="19.5313" stroke="white" stroke-width="0.7" stroke-linecap="round"/>
          <path d="M22.537 4.82215C22.8832 5.16837 22.8832 5.72584 22.537 6.06618L20.2543 8.34886L21.4984 13.7416L20.671 14.5749L18.3942 10.2149L16.1056 12.5034L16.3169 13.9528L15.689 14.5749L14.6562 12.7088L12.7843 11.6702L13.4063 11.0364L14.8733 11.2535L17.1443 8.98261L12.7843 6.6882L13.6176 5.8608L19.0103 7.10483L21.293 4.82215C21.6216 4.48181 22.2084 4.48181 22.537 4.82215Z" fill="white"/>
        </svg>




        <div className='relative font-bold text-sm text-accent-color-71 top-1'>
          GPT-Travel
        </div>
    </div>
  );
};

export default Loader;