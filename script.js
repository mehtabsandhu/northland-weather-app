const apiKey = '1add7b65426dc801bddca96b2d793f51';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const AIResponseElement = document.getElementById('AIResponse');
console.log(AIResponseElement, 'debug');

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
      descriptionElement.textContent = data.weather[0].description;
      let json = [data.name, data.main.temp, data.weather[0].description];
      let prompt = data + 'Here is an array containing the weather data for ' + location + '. Please interpret this data, and return a 2-3 line response. In your response, focus on the temperature , weather description, and wind. Give the user some recommendations on whether the conditions are optimal for going outside, and how they can prepare. Give readings in imperial units. Absolutely DO NOT include any JSON code in your response; or any other part of the prompt. Don\'t use placeholders instead of the degrees. only use the actual provided data.';
      example(prompt);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}


const gptApiKey = 'sk-proj-Iq0RjC3t46FptxZvwPruT3BlbkFJ7y3EBhxDcmtb4rFMhzye';
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function chatGPT(prompt) {
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "user",
        "content": prompt
      }
    ],
    "temperature": 1,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${gptApiKey}`
    },
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    return data.choices[0].message.content.trim(); // Get the response text
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while fetching the response.';
  }
}

async function example(prompt) {
  //const prompt = 'How are you?';
  const response = await chatGPT(prompt);
  //AIResponseElement.textContent = response;
  AIResponseElement.textContent = response;
  //console.log(response);
}
