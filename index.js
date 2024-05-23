const axios = require('axios');
const fs = require('fs');

const fetchJokeAndUpdateReadme = async () => {
  const options = {
    method: 'GET',
    url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Key': 'ec5d205df7mshcc70712784b73aep14575cjsn9bcebc37424b',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    let joke = response.data.value;

    // Replace "Chuck Norris" with "Jayesh Shete"
    joke = joke.replace(/Chuck Norris/g, 'Jayesh Shete');

    // Prepare new content with heading
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;   // IST offset UTC +5:30 
    let d = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    d = d.toLocaleDateString("en-IN");

    const newContent = `# Joke of the Day\n\n<!-- #joke -->\n${joke}\n\nUpdated on: [${d}]\n<!-- #jokeEnd -->`;


    fs.writeFile("README.md", newContent, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  await fetchJokeAndUpdateReadme();
};

init();
