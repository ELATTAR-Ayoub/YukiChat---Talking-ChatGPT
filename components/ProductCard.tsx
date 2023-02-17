
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';

// styles
import styles from '../styles';

// components
import SolidSvg from '@/components/SolidSVG';

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

interface Data {
    scriptData: scriptData;
}

const ProductCard: React.FC<Data> = ({ scriptData }) => {



  return (
    <a target={'_blank'} href={'https://' + scriptData.productUrl} className={`relative ${styles.flexStart} gap-0 min-h-[224px] bg-primary-grey-28 dark:bg-secondary-white rounded-md shadow-md`}>

        {scriptData.productOriginalPrice && <div className={`${styles.flexCenter} absolute left-0 top-2 bg-accent-color-77 text-secondary-white h-11 w-32 p-2 rounded-r text-base lg:text-lg shadow-md z-10 `}> 
            <span className='relative'>Save {calculateDiscountPercentage(scriptData.productOriginalPrice, scriptData.productPrice)}%</span>
        </div>}

        <div className={` ${styles.flexCenter} w-2/5 lg:w-1/5 h-full bg-secondary-white`}>
            <div className={` w-full  `}>
                <img className={`w-full h-full object-cover `} src={scriptData.productThumbnail} alt="Product-image-0" />
            </div>
        </div>
        

        <div className={`relative ${styles.flexStart} flex-col gap-3 p-4 w-3/5 h-full `}>
            <h2 className='elleipsAfterTherdLine text-base w-full' title={scriptData.productTitle}> {scriptData.productTitle} </h2>
            
            <div className={` ${styles.flexBetweenEnd} text-alert-color`}>
                <span className='text-sm lg:text-base mr-1'>{scriptData.productRating}</span>
                {generateStarIcons(parseInt(scriptData.productRating))}
                <span className=' ml-1 text-xs lg:text-sm'> ({scriptData.productReviews})  </span>
            </div>

            <div className={`${styles.flexStart} w-full`}>
                <p className={` text-xl lg:text-3xl font-bold`}>
                    {scriptData.productPrice} <span className=' ml-1 line-through font-normal text-sm lg:text-base'>{scriptData.productOriginalPrice}</span>
                </p>
            </div>

            <div className={` ${styles.flexBetweenEnd} w-full `}>
                {scriptData.productCoupon && <div className={` ${styles.flexBetweenEnd} gap-2 `}>
                    <span className={` ${styles.flexCenter} bg-accent-color-77 h-11 w-32 p-2 rounded text-base`}> Save 10% </span> with coupon
                </div>}

                <div className={` ${styles.flexCenter} gap-2 rounded`}>
                    <SolidSvg width={'24px'} height={'24px'} className={' scale-75 lg:scale-100 SVGB2W'} color={'#F6F6F6'} path={'/amazon.svg'} />
                    <span className=' text-sm'>{scriptData.productProvider}</span>
                </div>
            </div>
        </div>

        
    </a>
  );
};

function calculateDiscountPercentage(productOriginalPrice: string, productPrice: string) {
    const originalPrice = parseFloat(productOriginalPrice.replace(/[^\d.-]/g, ''));
    const price = parseFloat(productPrice.replace(/[^\d.-]/g, ''));
    const discountPercentage = ((originalPrice - price) / originalPrice) * 100;
    return Math.round(discountPercentage);
}

function generateStarIcons(rating:number) {
    const filledStars = Math.floor(rating);
    const hasHalfStar = Math.round(rating * 2) / 2;
    const starIcons = [];
  
    for (let i = 0; i < filledStars; i++) {
      starIcons.push(
        <Image
          key={`filled-${i}`}
          src="/star-fill.svg"
          alt={`filled-star`}
          width={16}
          height={16}
        />
      );
    }
  
    if (hasHalfStar) {
      starIcons.push(
        <Image
          key="half-star"
          src="/star-semifill.svg"
          alt="semifilled-star"
          width={16}
          height={16}
        />
      );
    }
  
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(
        <Image
          key={`empty-${i}`}
          src="/star-empty.svg"
          alt={`empty-star`}
          width={16}
          height={16}
        />
      );
    }
  
    return starIcons;
}

export default ProductCard;