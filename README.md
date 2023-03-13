# 🏓 CV APP 🏓
#### A tool for creating your own beautiful CV, and download it as PDF
https://github.com/ElMoscaviador/cv-app

---
## ALL ABOUT THE PROJECT

Welcome to my CV app. I don't know if it looks like it - I sure hope it does, at least a bit - but this was a labor of love. I appreciate you checking it out!

### DESCRIPTION
This app allows you to create your own custom Curriculum Vitae.
Browse through both mandatory & optional sections to tailor your CV to your needs - for maximum flexibility!

### WALKTHROUGH OF THE APP
- All sections feature SVG logos & background pictures representing the current section.
#### Intro Screen
- Features a CSS-animated SVG CV hero, which materializes on landing & reacts to your navigation.
- Click on 'Make your CV' to start your CV.
#### Basic Information `mandatory section`
- This is the only mandatory form section of the app. All fields must be filled out.
- Fill in the most important personal information for your future employer.
#### Optional Sections Selection `optional section`
- Use interactive buttons to select or deselect any form section you might want to fill out. The choice is yours!
#### Profile Picture `optional section`
- Add your own profile picture.
##### The upload menu
- Features a default user image with an custom upload button.
##### The crop menu
- Features a modal powered by js-cropper & react-cropper to crop/resize the upload picture.
##### The post-upload menu
- Features a CSS-animated SVG background and an SVG crown to top your uploaded picture.
- Choose to validate the upload or upload a different picture.
#### Work Experience / Education / Hobbies / Tools / Languages
- These menus all feature the same templates.
##### The entries viewer
- View all of your added entries.
- By default, no entry is displayed. Click on 'Add an Entry' to add one.
- You can edit or delete an entry by clicking the dedicated buttons on the side of an entry card.
- When all entries have been added, the 'Add an Entry' button is greyed out.
##### The entries adder
- Add an entry.
- Fill in all the information about the entry.
- For Career & Education, you have the possibility to toggle the end date on or off, depending of the completion of the added experience.
#### Review
- Browse all sections in a side-generated pop-up. Add, edit & delete information.
- By default, if nothing if selected, a default SVG image will be displayed in the pop-up screen to indicate the absence of a section.
- Instead of offering to move on to the next section or skip a section, all sections will now display a 'Save Featured Contents' button.
#### Preview & Download
- Preview your completed CV in HTML form.
- Download the PDF version of the completed CV.
- Features html2canvas & jspdf to convert the HTLM CV to PDF
- A characters and space limitation is built into the CSS of the HTML CV to prevent text overflowing.
- If a section is not filled out, it will remain blank.

### RESPONSIVE DESIGN
- The app is fully responsive. 
- It has been tested on several PCs & mobile devices ranging from 5120*1440 to 375* 667.
- On a regular screen, all sections feature side images. 
- On a smaller screen, the side-image is removed and transposed to the header.
- On a smaller screen, the HTML version of the CV on the Preview page is replaced by the SVG representation of a CV as seen on the home page.

### EXTENSIONS USED
- Cropper-js & React-Cropper crop the profile picture.
- Formik powers the forms.
- Html2canvas & Jspdf convert the HTLML CV to PDF.
- MUI handles some media queries.

### CREDITS & MATERIALS USED
- All icons and artwork featured were made by myself using Inkscape, save for the *upload* and *download* buttons which are from Material Icons:
https://fonts.google.com/icons
- The background images are from Unsplash:
https://unsplash.com/

### JEST TESTING
- This app has not yet been tested.

### KNOWN ISSUES
- The 'from' fields are only accessible after the optional 'to' fields when browsing the page with the keyboard. This isdDue to the way I manage the optional layout of multiple entries forms with CSS Grid & leads to a confusing navigation experience while hindering accessibility.
- Side image overflow issues have been reported when navigating forms, but I have not yet been able to reproduce the issue.

### ABOUT UNKNOWN ISSUES
Please do not hesitate to report any lingering issues to me - I am all ears & would be grateful to you.

## GENESIS OF THIS PROJECT

### WHY I TOOK ON THIS PROJECT
As a web developer in the making, I started The Odin Project's course in late 2021. 

The CV App is the latest project I was asked to tackle as part of the course.

### WHAT MY LEARNING TARGETS WERE FOR THIS PROJECT
- Thinking in React
- Understanding the difference between state & props
- Learning how to integrate third-party packages in order not to reinvent the wheels
- Improving my design cohesion skills by limiting my options: creating matching color palettes, using fewer values & assigning them to variables
- Animating individual SVG units with CSS

### WHAT MY VISION FOR THIS PROJECT WAS
I aimed to give the app a modern but focused visual feel.
It had to look professional, down to earth & close to what you'd get in a professional environment, in spite of my limited skills.

### HOW I APPROACHED THIS PROJECT
1. Writing out the whole app logic in pseudocode & using flowcharts to understand all possible outcomes.
   
2. Writing one component at a time.

3. Drawing a mood board & a basic layout for the website's appearance. Establish a color palette.

4. Refactoring the code to match the layout.

5. Eliminating bugs.

6. Designing a grayscale, mobile version of the website.

7. Adding responsive design and colors. 

### THE CHALLENGES I FACED DURING THIS PROJECT
- It took me a while to understand just how adaptable a component can be made using React. I was stuck for many hours trying to make my section components modular and ending up with a very rigid structure. Once I understood how `children` work & how props/state can be used to change anything based on the context, I became much better at coding in React.
- Keys are a common issue for new learners, but I struggled with them nonetheless. I did not understand why very similar sections would not get rerendered in the DOM if changes were occuring, then I understood that unique keys had to be applied to the parent of a list element.
- I also mismanaged my time coding many functions to generate random keys, none of which were practical in the end, when I could have just used the unique names of my list elements.
- I had a hard time figuring out what is & what is not possible during rerender. I now understood that I can't update state during render.

### CLOSING THOUGHTS ON COMPLETING THE PROJECT
- I should have managed my time better. I spent about 80 hours trying to understand everything about React instead of starting small.
- Once I did start with planning the actual project as a whole, I managed my time much more efficiently & advanced more assuredly.
- I love creating and animating SVGs. I am notably proud of the SVG version of the CV and am looking forward to create more of them to liven up my future projects.
- I did not use Jest as I had not yet learned how to use react-testing-library.
- I tried making the code as clean as I knew how and organizing it logically in folders.
- All in all, this project further reinforced my growing fascination for web development and left me wanting more.

## AUTHOR
ElMoscaviador
https://github.com/ElMoscaviador/cv-app

## TIME SPENT ON THIS PROJECT
130hrs - 17 days

