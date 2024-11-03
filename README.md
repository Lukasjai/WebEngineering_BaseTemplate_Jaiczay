# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file. 

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

Present your findings here...
1) Changes that had been done in your points 1-3 (adapt the code to use asynch/wait ...)
````JS
//BEfore -->main.js
function fetchImageUrl(fileName) {
  var imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  var url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  return fetch(url)
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            var pages = data.query.pages;
            var imageUrl = Object.values(pages)[0].imageinfo[0].url;
            return imageUrl;
          });
}

//After --> bearData.js
export const fetchImageUrl = async (fileName) => {
  const imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0]?.imageinfo;

    if (imageInfo && imageInfo[0].url) {
      return imageInfo[0].url;
    } else {
      return '/media/urban-bear.jpg'; // Placeholder image
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    alert('There was an error fetching the image. Please try again later.');
    return '/media/urban-bear.jpg'; // Placeholder image in case of error
  }
};
````

2) using const and let instead of var <br>
because var is function scoped which can lead to unexpacted behaviour in loops or conditions. With const and let beeing block scoped they are only accessible within the block they are declared in.
````JS
//Before --> main.js
var showHideBtn = document.querySelector('.show-hide');
var commentWrapper = document.querySelector('.comment-wrapper');
//After -->bearData.js
export const initializeComments = () => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  ...
````
3) improved Error Handling <br>
for easier debugging and customer interaction<br>
see example in point 1) 



4) switched from innerHTML to DOM manipulation <br>
for better security --> prevent XSS - Cross-Site Scripting <br>
and performance --> instead of recreating the whole DOM structure with innerHTML just maipulate the existing one.

````JS
//Before --> main.js

if (bears.length === rows.length) {
  var moreBearsSection = document.querySelector('.more_bears');
  bears.forEach(function(bear) {
    moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
  });
  
//After -->bearData.js
const moreBearsSection = document.querySelector('.more_bears');
moreBearsSection.innerHTML = '';

bears.forEach((bear) => {
  const bearDiv = document.createElement('div');
  const bearTitle = document.createElement('h3');
  bearTitle.textContent = `${bear.name} (${bear.binomial})`;
  bearDiv.appendChild(bearTitle);
  const bearImage = document.createElement('img');
  bearImage.src = bear.image;
  bearImage.alt = bear.name;
  bearImage.style.width = '200px';
  bearImage.style.height = 'auto';
  bearDiv.appendChild(bearImage);
  const bearRange = document.createElement('p');
  bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;
  bearDiv.appendChild(bearRange);
  moreBearsSection.appendChild(bearDiv);
});
````



## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

Present your findings here...

1) Satic Type Checking, im gegenteil zu Javascript zwingt Typescript eine Typenüberprüfung zur Compilezeit was helfen kann typenbezogene Fehler früh zu erkennen.
Unter den Schnittschtellen ImageIndo oder Page kann man diese Typenüberprüfung sehen
````JS
interface ImageInfo {
url: string;
}

interface Page {
imageinfo?: ImageInfo[];
}
````
2) Improved Code Readability weil die Typenanotationen auch als eine Form der Dokumentation zu sehen sind. zum beispiel sieht man bei der Funktion extractBears sofort das diese einen String akzeptiert und ein Promise<void> zurückliefert
````JS
export const extractBears = async (wikitext: string): Promise<void> => { ...
````
3) IDE Unterstützung und verbesserte Werkzeuge
   Funktionen wie Auto-Vervollständigung, Code-Navigation und Refactoring-Tools werden mit TypeScript laut Literatur effektiver, da der Editor die verwendeten Typen versteht.
    Meine Meinung dazu ist das dies auch mit JS mit gewissene einschränkungen möglich ist. 

## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

*Present your reports here.*

![Frontend.png](media%2FFrontend.png)

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

*Present your reports here.*

**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

*Present your findings and fixes here.*

**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

````HTML
 <form class="search">
    <label for="search" class="sr-only">Search query</label>
    <input type="search" id="search" name="q" placeholder="Search query" aria-label="Search query">

  <div class="flex-pair">
    <label for="name">Your name:</label>
    <input type="text" name="name" id="name" placeholder="Enter your name">

    <div class="flex-pair">
      <label for="comment">Your comment:</label>
      <input type="text" name="comment" id="comment" placeholder="Enter your comment">
````
**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?
````HTML
showHideBtn.setAttribute('tabindex', '0');
showHideBtn.setAttribute('role', 'button');

showHideBtn.onkeypress = (event) => {
if (event.key === 'Enter' || event.key === ' ') {
toggleComments(showHideBtn, commentWrapper);
}
};

````

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?
````HTML
<table>
      <caption>This table lists types of bears along with their characteristics including coat color, adult size, habitat, lifespan, and diet.</caption>
      <thead>
      <tr>
        <th scope="col">Bear Type</th>
        <th scope="col">Coat</th>
        <th scope="col">Adult size</th>
        <th scope="col">Habitat</th>
        <th scope="col">Lifespan</th>
        <th scope="col">Diet</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">Wild</th>
        <td>Brown or black</td>
        <td>1.4 to 2.8 meters</td>
        <td>Woods and forests</td>
        <td>25 to 28 years</td>
        <td>Fish, meat, plants</td>
      </tr>
      <tr>
        <th scope="row">Urban</th>
        <td>North Face</td>
        <td>18 to 22</td>
        <td>Condos and coffee shops</td>
        <td>20 to 32 years</td>
        <td>Starbucks, sushi</td>
      </tr>
      </tbody>
    </table>
````

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`