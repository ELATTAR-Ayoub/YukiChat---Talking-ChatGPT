'use client'

import { useRef, useEffect } from 'react';

// styles
import styles from '../styles/index';

const Hero = () => {
  console.log('im here');

  const searchMusic = () => {
    // setLoading(true);
    // 
    
    fetch("/api/scrapper", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data:any) => {
        console.log('data =>>>>>');
        /* console.log(data);
        console.log(data.URL);
        dispatch(ADD_ITEM(data));
        console.log(musicState);
        setLoading(false); */
    })
    .catch(error => {
        console.log(error);
        // setLoading(false);
    });
    // 
    // setInputValue('');
  }

  return (
  <section className={`${styles.flexCenter}  `} >
    Hero section ss
  </section>
  )
};

export default Hero;
