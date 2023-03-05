# Core logic

The app follows a linear structure, going from section to section until the review screen. The user can then review and confirm the data then download the PDF version of their CV.

## The home page
The home page is nothing but a background and an action button to start the form.

## The form sections 

All sections are managed by a single `MainFrame` component. 

It manages the saved form data and the flow of the pages.

### 1. General information section
The general information section is the only mandatory section.

It contains:
- a form
- a 'go to next section' button: only if all inputs are filled can the user continue to the next section.

### 2. Optional sections selection screen
The optional sections selection screen allows the user to pick the optional sections they'd like to add.

It contains:
- checkboxes matching the sections
- a 'add checked sections' button: adds sections to list of sections to display and displays the first section of the list
- a 'review CV button': continues to the 'review CV' section.

### 3. Profile picture section
The profile picture section allows the user to upload their own profile picture.

It contains: 
- a file input and its label, parametered to accept jpg/png
- a 'skip to next section' button

If a picture if uploaded, a modal opens to resize it.

The modal contains a 'confirm resize' button which closes the modal.

The section now includes:

- the resized picture
- a 'continue' button which now replaces the 'skip to next section' button
- a 'try again' button which resets the section to its original state

### 4. Career/Education/Tools/Hobbies/Languages section

These sections are all identically structured. They include:

#### a. a default page 
which contains:
- the added entries: each have their own edit/delete button
- the 'add an entry' button: it toggles the menu to add an entry
- the 'skip section' button (only if no entry was yet added): it skips to the next section
- the 'continue' button (only if entries have been added): it saves the entries and moves on to the next section

#### b. a menu to add an entry
which contains:
- the section's form fields
- the 'add entry' button: saves the entry & reverts to the *default page* if all inputs are filled

## The review page
The review page includes: 
- the name of all form sections
- a 'preview CV' button which redirects to the CV preview page

By clicking on a section name, the user will be redirected to the specific section in a side pop-up.

The saved data of that section will still be present.

However, the clicked sections' skip button disappears and the continue button is replaced by a 'save again' button.

## The CV preview & download page
The CV preview page contains:
- the previewed CV 
- a button to download the CV in PDF format

---

## Short recap

Home page > general information > optional selections screen > any selections > review > preview

## Details to remember

  ### The section buttons are scenario-based
  The review page uses the original section components as a pop-up. 
  
  The original navigation buttons of the section are however irrelevant and replaced by a 'save' button. 
  
  Therefore, the section component's state must determine if we are in 'review mode' or in 'default mode' to display the right buttons.

  ### The hook, title & picture must be updated
  Those skeleton items must be updated with the sections without reloading everything.

  ### Use a conditional prop to inject past saved data into the sections on the review page
  The section components must use either the saved data prop as history or start empty.

  ### The desktop layout uses an additional div for the picture whereas the mobile mode includes the picture in the header

  Use media queries & state to adjust the website's appearance in the upmost component.

  ### Dynamic changes 
  The header icon changes its color in light/dark mode.
  The background picture is different in light/dark mode.
  The background picture is included inside the header in mobile mode. 


