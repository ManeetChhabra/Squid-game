const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://mastersunion.org/'; // Check if this is the correct URL

axios.get(url)
  .then(response => {
    const html = response.data;
    console.log(html); // Log the entire HTML to check if the page is fetched

    const $ = cheerio.load(html);
    const courses = [];

    $('.course-title').each((index, element) => {
      courses.push($(element).text().trim());
    });

    console.log(courses); // Check if any data is extracted
  })
  .catch(error => {
    console.error('Error fetching the page:', error);
  });
