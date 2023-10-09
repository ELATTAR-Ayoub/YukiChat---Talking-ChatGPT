import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const getChat = async (inputValue: string, key: string) => {
  try {
    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);
    let response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `## ${inputValue}`,
      temperature: 0,
      max_tokens: 50,
    });

    if (response.data.choices[0]) {
      // Successful response (OpenAI may return 201 for created resources)
      return response.data.choices[0].text;
    }
  } catch (error) {
    throw new Error("Error from OpenAI: " + error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Received input - chatGPT: " + req.body.string);
    console.log("Received input - key: " + req.body.key);

    const data = await getChat(req.body.string, req.body.key);
    const responseData = { object: data };
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error:", error); // Log the complete error object
    const errorAsError = error as Error;
    const responseData = { message: errorAsError.message };
    res.status(500).json(responseData);
  }
}
