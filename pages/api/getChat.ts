import type { NextApiRequest, NextApiResponse } from 'next'

// opanAI
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const getChat = async (inputValue:string) => {
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputValue,
    temperature: 0,
    max_tokens: 550,
    });
    if (response.data.choices[0].text) {return(response.data.choices[0].text);}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('you sent - chatGPT =>' + req.body.string);

        const data = await getChat(req.body.string);
        const responseData = { object: data };
        res.status(200).json(responseData);
    } catch (error) {
        const errorAsError = error as Error;
        const responseData = { message: errorAsError.message};
        res.status(404).json(responseData);
    }
}