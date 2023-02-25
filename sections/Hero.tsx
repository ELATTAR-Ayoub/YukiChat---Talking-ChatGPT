'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSpeechSynthesis, useSpeechRecognition  } from 'react-speech-kit';

// components
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import ToastMessage from '@/components/Toast';

// styles
import styles from '@/styles/index';

// constants
import {suggestions} from '@/constants';

const languageOptions = [
  { label: 'Cambodian', value: 'km-KH' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English', value: 'en-AU' },
  { label: 'Farsi', value: 'fa-IR' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
  { label: '普通话 (中国大陆) - Mandarin', value: 'zh' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Español', value: 'es-MX' },
  { label: 'Svenska - Swedish', value: 'sv-SE' },
];

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string, type: string}>({show:false, msg:'', type:'error' })
  const [inputValue, setInputValue] = useState('');
  const [aiRespond, setAiRespond] = useState('');

  // useSpeechSynthesis
  const onEnd = () => {
    hitAPI(inputValue);
  };
  const { speak, cancel, speaking, voices } = useSpeechSynthesis({});
  // pitch => min="0", max="2", defaultValue="1"
  const [pitch, setPitch] = useState(1);
  // rate => min="0", max="2", defaultValue="1"
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState<string | null>(null);
  const voice = voices[voiceIndex] || null;

  // useSpeechRecognition
  const onError = (event:any) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const onResult = (result:string) => {
    setInputValue(result);
  };
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onError,
    onEnd
  });
  const [lang, setLang] = useState('en-AU');
  const [blocked, setBlocked] = useState(false);
  
  const handleTts = async (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tts(inputValue);
  }

  const handleStt = async (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toggle = listening ? stop: () => { stt(lang) };

    toggle();
  }

  const tts = (input: string) => {
    speak({ 
      text: input, voice, rate, pitch
    });
  }

  const stt = (language: string) => {
    setBlocked(false);
    listen({ lang: language });
  }

  const hitAPI = (msg:string) => {
    setLoading(true);
    // 
    fetch("/api/getChat", {
        method: "POST",
        body: JSON.stringify({string: msg}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data:any) => {
        setAiRespond(data.object);
        setLoading(false);
        tts(data.object);
    })
    .catch(error => {
        console.log(error);
        setLoading(false);
    });
  }

  

  return (
  <section className={`${styles.flexCenter} flex-col gap-2 relative overflow-hidden w-full my-4`} >

    {toast.show && <ToastMessage message={toast.msg} type={'success'} />}
    {loading && <Loader />}

    {!supported && (
      <p className=' text-danger-color text-sm sm:text-base font-bold'>
        Oh no, it looks like your browser doesn&#39;t support Speech
        Synthesis.
      </p>
    )}
    {supported && (

    <div className={` relative ${styles.flexCenter} flex-col gap-10 w-full pb-12  `}>
      <form className={` relative ${styles.flexBetween} gap-2 flex-col w-full `}>
        <label htmlFor="language" aria-label='Language of speech recognition' className={` primary_label_form `}>Language</label>
          <select
            form="speech-recognition"
            id="language"
            value={lang}
            className='search_input'
            onChange={(e) => setLang(e.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      </form>

      <p className=' text-center text-sm sm:text-base'>"{inputValue}"</p>

      <div className={`${styles.flexCenter} w-full `}>
        <button disabled={speaking} title='Click and say something!' onClick={handleStt} className={` ${listening ? 'button-pulse' : '' } ${styles.flexCenter} rounded-full bg-accent-color-71 hover:bg-accent-color-77 transition-all duration-300 w-1/3 sm:w-1/4 md:w-32 aspect-square   `}>
          {!loading && <SolidSvg width={'24px'} height={'24px'} className={' scale-110 sm:scale-150 md:scale-110'} color={'#fff'} path={`${listening ? '/ear.svg' : '/mic.svg'}`} />}
          {loading && <Loader />}
        </button>
      </div>
      
    </div>

    )}

    <div className={` relative ${styles.flexCenter} flex-col gap-10 w-full pb-12  `}>
      <form className={` relative ${styles.flexBetween} gap-2 flex-col w-full `}>
        <label htmlFor="voice" aria-label='voice of chatGPT' className={` primary_label_form `}>AI Voice</label>
          <select
            id="voice"
            name="voice"
            className='search_input'
            value={voiceIndex || ''}
            onChange={(event) => {
              setVoiceIndex(event.target.value);
            }} >
            <option value="">Default</option>
            {voices.map((option:any, index:number) => (
              <option key={option.voiceURI} value={index}>
                {`${option.lang} - ${option.name}`}
              </option>
            ))}
          </select>
      </form>

      <div className={`${styles.flexCenter} w-full `}>
        <div title='Stop the AI from talking!' onClick={cancel} className={` ${speaking ? 'button-pulse' : '' } ${styles.flexCenter} rounded-full bg-accent-color-71 hover:bg-accent-color-77 hover:scale-110 transition-all duration-300 w-1/3 sm:w-1/4 md:w-32 aspect-square   `}>
          {<Image alt='ChatGPT-logo' width={32} height={32} src={`./chatGPT.svg`} />}
        </div>
      </div>

      <p className=' text-center text-sm sm:text-base' onClick={() => tts(aiRespond)}>"{aiRespond}"</p>
      
    </div>

    

  </section>
  )
};



export default Hero;
