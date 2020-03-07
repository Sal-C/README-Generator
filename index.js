const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
    {
        message: "Enter your GitHub username:",
        name: "Username"
      },
      {
        type: "input",
        message: "Provide a project title.",
        name: "Title"
      },
      {
        type: "input",
        message: "Provide a description of your project.",
        name: "Description"
      },
      {
        type: "input",
        message: "Provide installation details for your project.",
        name: "Installation"
      },
      {
        type: "input",
        message: "Describe the usage of your project.",
        name: "Usage"
      },
      {
        type: "input",
        message: "What license will you give your project?",
        name: "License"
      },
      {
        type: "input",
        message: "Provide information regarding contributions.",
        name: "Credits"
      },

];

function init() {
    inquirer
  .prompt(questions)
  .then(function(response) {
    const queryUrl = `https://api.github.com/users/${response.Username}`;
     axios.get(queryUrl).then(function(res) {
         const data = 
         `# ${response.Title} \n## Description \n${response.Description} \n## Table of Contents \n* [Installation](#installation) \n* [Usage](#usage) \n* [License](#license) \n* [Contribution](#contribution) \n* [Test](#test) \n* [Questions](#questions) \n## Installation \n${response.Installation} \n## Usage \n${response.Usage} \n## License \n${response.License} \n## Contribution \n${response.Credits} \n## Tests \n## Questions \n ${res.data.avatar_url} \n${res.data.email} \n`;

         fs.writeFile("README.md", data, function(err) {

          if (err) {
            return console.log(err);
          }
        
          console.log("Success!");
        
        })
     });
  });
}

init();
