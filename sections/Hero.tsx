'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';

// components
import Loader from '@/components/loader';
import ProductCard from '@/components/ProductCard';
import SolidSvg from '@/components/SolidSVG';

// styles
import styles from '@/styles/index';

// constants
import {suggestions} from '@/constants'

interface scriptData {
  productTitle: string;
  productThumbnail: string | undefined;
  productUrl: string;
  productPrice: string;
  productOriginalPrice: string;
  productRating: string;
  productReviews: string | undefined;
  productSeller: string | undefined;
  productProvider: string;
  productCoupon: string;
}

const Hero = () => {

  const providersArr = [
    {
      "title": "Amazon",
      "icon": "/amazon.svg",
      "active": true
    },
    {
      "title": "Aliexpress",
      "icon": "/Aliexpress.svg",
      "active": false
    },
  ];

  const filterOptions = [
    {
      value: 'All',
      label: 'All',
    },
    {
      value: 'Cheap',
      label: 'Most Cheap',
    },
    {
      value: 'Expensive',
      label: 'Most Expensive',
    },
    {
      value: 'Rated',
      label: 'Most Rated',
    },
    {
      value: 'Reviewed',
      label: 'Most Reviewed',
    },
    {
      value: 'Discount',
      label: 'Huge Discount',
    },
    {
      value: 'Coupons',
      label: 'Huge Coupons',
    }
  ];

  const [productsResults, setProductsResults] = useState<scriptData[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<scriptData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState(providersArr);

  function filterProducts(event: React.ChangeEvent<HTMLSelectElement>) {
    const filterOption = event.target.value;
    setSelectedFilter(filterOption);

    switch(filterOption) {
      case 'All':
        setProductsFiltered([...productsResults]);
        break;
      case 'Cheap':
        
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          if (!a.productPrice) {
            return 1;
          }
          if (!b.productPrice) {
            return -1;
          }
          const reviewsA = parseInt((a.productPrice).replace(/[$,]/g, ''));
          const reviewsB = parseInt((b.productPrice).replace(/[$,]/g, ''));
          
          return reviewsA - reviewsB;
        }));
        break;
      case 'Expensive':
        
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          if (!a.productPrice) {
            return 1;
          }
          if (!b.productPrice) {
            return -1;
          }
          const reviewsA = parseInt((a.productPrice).replace(/[$,]/g, ''));
          const reviewsB = parseInt((b.productPrice).replace(/[$,]/g, ''));
          return reviewsB - reviewsA;
        }));
        break;
      case 'Rated':
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          if (!a.productRating) {
            return 1;
          }
          if (!b.productRating) {
            return -1;
          }
          return parseInt(b.productRating) - parseInt(a.productRating);
        }));
        break;
      case 'Reviewed':
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          const reviewsA = parseInt((a.productReviews || '0').replace(/,/g, ''));
          const reviewsB = parseInt((b.productReviews || '0').replace(/,/g, ''));
          return reviewsB - reviewsA;
        }));
        break;
      case 'Discount':
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          if (!a.productOriginalPrice) {
            return 1;
          }
          if (!b.productOriginalPrice) {
            return -1;
          }
          const discountA = calculateDiscountPercentage(a.productOriginalPrice, a.productPrice);
          const discountB = calculateDiscountPercentage(b.productOriginalPrice, b.productPrice);
          return discountB - discountA;
        }));
        break;
      case 'Coupons':
        setProductsFiltered([...productsFiltered].sort((a, b) => {
          if (!a.productCoupon) {
            return 1;
          }
          if (!b.productCoupon) {
            return -1;
          }
          return parseInt(b.productCoupon || '0') - parseInt(a.productCoupon || '0');
        }));
        break;
      default:
        setProductsFiltered(productsFiltered);
    }
  }

  function calculateDiscountPercentage(productOriginalPrice: string, productPrice: string) {
    const originalPrice = parseFloat(productOriginalPrice.replace(/[^\d.-]/g, ''));
    const price = parseFloat(productPrice.replace(/[^\d.-]/g, ''));
    const discountPercentage = ((originalPrice - price) / originalPrice) * 100;
    return Math.round(discountPercentage);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const searchProducts = (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true);
    // 
    fetch("/api/scrapper", {
        method: "POST",
        body: JSON.stringify({string: inputValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data:any) => {
        console.log('data =>>>>>');
        console.log(data);
        setProductsResults(data.object);
        setProductsFiltered(data.object);
        console.log('productsResults');
        console.log(productsResults);

        setLoading(false);
    })
    .catch(error => {
        console.log(error);
        setLoading(false);
    });
    // 
    setInputValue('');
  }

  const toggleActive = (index:number) => {
    const updatedProviders = [...providers];
    updatedProviders[index].active = !updatedProviders[index].active;
    setProviders(updatedProviders);
  };

  return (
  <section className={`${styles.flexCenter} flex-col gap-8 relative overflow-hidden w-full my-4`} >

    {(loading) &&
        <Loader/>
    }

    <form onSubmit={searchProducts} className={` relative ${styles.flexBetween} flex-col w-full `}>
          <label aria-label='Search bar' className={` primary_label_form `}>
              <input required type="text" value={inputValue} onChange={handleChange} className='search_input'  />
          </label>
          
          <button aria-label="Search bar button" type="button" onClick={searchProducts} className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-grey-28 dark:bg-secondary-white transition-all ${styles.flexCenter} overflow-hidden w-10 h-10`} >
              <SolidSvg width={'24px'} height={'24px'} className={'SVGB2W scale-110'} color={'#ACACBE'} path={'/send.svg'} />
          </button>
    </form>

    <div className={` ${styles.flexStart} flex-col lg:flex-row w-full gap-6`}>
      <select title="Filter" value={selectedFilter} onChange={filterProducts} className=' cursor-pointer bg-primary-grey-28 dark:bg-secondary-white transition-all rounded-md overflow-hidden p-3 border-secondary-black w-64 border-primary-grey border-[1px]'>
        {filterOptions.map((option, index) => (
            <option key={index} value={option.value} className={` my-4 `}>
              {option.label}
            </option>
          ))}
      </select>
        
      <div className={` ${styles.flexStart} flex-wrap w-full h-full gap-4`}>
        {providers.map((provider, index) => (
          <button
            key={provider.title}
            className={` ${provider.active ? 'text-primary-grey bg-accent-color-77' :  'text-secondary-white bg-primary-grey-28' } 
            ${styles.flexCenter} h-[49px] p-2 gap-2 rounded shadow-sm
            `}
            onClick={() => toggleActive(index)}
          >
            <SolidSvg width={'24px'} height={'24px'} className={''} color={` ${provider.active ? '#343540' :  '#F6F6F6' }`} path={provider.icon} />
            {provider.title}
          </button>
        ))}
      </div>
      
    </div>

    {(productsResults.length == 0) && <div className={` ${styles.flexCenter} flex-wrap w-full gap-6`}>
      {suggestions.map((suggestion, index) => (
        <div onClick={() => setInputValue(suggestion.desc)} className={`' ${styles.flexCenter} w-full sm:w-[48%] min-h-[135px] p-6 bg-primary-grey-28 dark:bg-secondary-white rounded shadow-md cursor-pointer hover:bg-primary-grey-71 dark:hover:bg-accent-color-77 transition-all duration-300'`} key={suggestion.ID}>
          <h1 className=' text-xl font-normal'>
            "{suggestion.desc}" &#8594;
          </h1>
        </div>
      ))}
    </div>}

    {(productsFiltered.length > 0) && <div className={` grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] w-full gap-6`}>
      {productsFiltered.map((scriptData, index) => (
        <ProductCard key={index} scriptData={scriptData} />
      ))}
    </div>}

    
  </section>
  )
};

export default Hero;
