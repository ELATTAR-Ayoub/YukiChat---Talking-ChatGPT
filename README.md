# YukiChat - Talking ChatGPT

YukiChat is a web application that allows users to have a natural, oral conversation with OpenAI's GPT language model using text-to-speech (TTS) and speech-to-text (STT) technologies. With YukiChat, users can ask ChatGPT any question, and the AI will respond with a natural, human-like answer.

YukiChat is built using React.js and Next.js, and it utilizes the React-Speech-Kit library for TTS and STT functionalities. It also integrates with OpenAI's GPT API to generate responses to user queries.

## Getting Started

To get started with YukiChat, you will need to have a modern web browser that supports Web Speech API (Chrome is recommended). You will also need an API key from OpenAI's GPT service, which you can obtain from the OpenAI website.

Once you have the necessary dependencies, simply clone the repository and run the following commands:

```npm install```
```npm run dev```

This will start a development server on `http://localhost:3000`, where you can access the YukiChat application.

## Usage

To use YukiChat, simply click on the microphone button to start speaking. Your words will be converted to text and sent to the GPT API, which will generate a response. The response will be played back to you using TTS technology.

You can also use the text input field to type in your questions or responses, which will be sent to the GPT API for processing.

## Contributing

Contributions to YukiChat are welcome and encouraged! If you find a bug or have a feature request, please submit an issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request with your changes.

## License

YukiChat is licensed under the MIT License. See `LICENSE` for more information.
