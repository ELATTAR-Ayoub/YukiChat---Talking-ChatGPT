import type { NextApiRequest, NextApiResponse } from 'next'

import axios from "axios";
import cheerio from "cheerio";
import {storeBASEURL} from '@/constants'
const puppeteer = require('puppeteer');

const BASEURL_AMAZON = storeBASEURL[0].url
// const keyword = 'keyboard'
// const url = `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`;

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
    productCoupon: string | undefined;
}

const scrapeData = async (url:string) => {
    try {
      let data:scriptData[] = []; // Create an empty array that will store our data
      const browser = await puppeteer.launch(); // Launch a headless browser
      const page = await browser.newPage(); // Open a new page
      await page.goto(url); // Go to the website
      let html = await page.content(); // Get the HTML from the page
      const $ = cheerio.load(html); // Load the HTML into cheerio
  
      // Scrape all the product details
      $('div[data-asin][data-uuid]').each((i, el) => {
        let productTitle:string = $(el).find('h2 > a > span').text();
        let productThumbnail = $(el).find('img[data-image-latency="s-product-image"]').attr('src');
        let productUrl_raw = $(el).find('h2 > a').attr('href');
        let productPrice_raw = $(el).find('.a-price > span.a-offscreen:nth-child(1)').text().replace(/(\r\n|\n|\r)/gm, "").trim().split("$")[1];
        let productOriginalPrice = $(el).find('.a-price.a-text-price > .a-offscreen').text().replace(/(\r\n|\n|\r)/gm, "").trim();
        let productRating_raw = $(el).find('.a-section.a-spacing-none.a-spacing-top-micro > .a-row > span').attr('aria-label');
        let productReviews = $(el).find('.a-section.a-spacing-none.a-spacing-top-micro > .a-row > span:nth-child(2)').attr('aria-label');
        let productSeller = $(el).find('.a-spacing-mini .a-size-small').text().replace(/(\r\n|\n|\r)/gm, "").trim();

        let productPrice:string = "$" + productPrice_raw;
        let productUrl = BASEURL_AMAZON + productUrl_raw;

        let productRating = ''
        if (productRating_raw) {
            productRating = productRating_raw!.substring(0, 3);
        }

        let productProvider = 'Amazon';

        let productCoupon = undefined;
        
        data.push({
          productTitle,
          productThumbnail,
          productUrl,
          productPrice,
          productOriginalPrice,
          productRating,
          productReviews,
          productSeller,
          productProvider,
          productCoupon
        });
      });
      browser.close();
      return(data); // Return the data
    } catch (err) {
      console.log(err);
    }
  };
  
  /* scrapeData(url).then(data => {
    console.log('data ----');
    console.log(data);
  }); */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('you sent =>' + req.body.string);
        const url = `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${req.body.string}`;
        const data = await scrapeData(url);

        /* const url = `https://www.aliexpress.com/`;
        const newData  = await scrapeData(url);
        const data  = [...data, newData] */
        
        const responseData = { object: data };
        res.status(200).json(responseData);
    } catch (error) {
        const errorAsError = error as Error;
        const responseData = { message: errorAsError.message};
        res.status(404).json(responseData);
    }
}