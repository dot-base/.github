---
name: 🔍 QA Testing
about: Checklist of dotbase clinic functions that must be tested before each new release.
title: ""
labels: ""
assignees: ""

---

### What to test
Before each release, we need to test dotbase clinic according to this standardized protocol.
The testing focus should be on the new features of this release (see 2.). At the same time, it must be ensured that all standard dotbase features continue to function flawlessly (see 1.).

### How to test
Follow the QA Testing Checklist step by step.

# 🔍 QA Testing Checklist of all relevant dotbase functions
## 1. Standard QA Tasks


### 1. Installation PWA dotbase

- [ ]  1. Open the website at [https://dotbase.charite.de](https://dotbase.charite.de/) in Microsoft Edge and Google Chrome.
- [ ]  2. Install the PWA on the PC.

### 2. Login and Logout

- [ ]  1. Switch between instances using the selection.
- [ ]  2. Log in with Charité username and password.
- [ ]  3. View the home screen.
- [ ]  4. Verify your full name is displayed.
- [ ]  5. Test the logout.

### 3. Settings

- [ ]  1. Open the settings menu.
- [ ]  2. Can you select a prefix and position successfully? Are they remembered when signing out and back in?
- [ ]  3. Is the prefix displayed on the home screen?
- [ ]  4. Does the position appear in the signature under a document?
- [ ]  5. Can you change the language? Is the setting remembered when closing the browser?
- [ ]  6. Verify that all the buttons in the contact section are functional.
- [ ]  7. Are all indicators green on the server status page?

### 4. Search for a patient

- [ ]  1. Does the search button in the menu focus the search bar at the top?
- [ ]  2. Can patients be found in the search by any combination of the following: name, birth date, dotbase id, SAP id?
- [ ]  3. If a patient is not found, is an import suggested?
- [ ]  4. Can a patient be successfully imported from SAP if it did not exist yet?
- [ ]  5. Does the recent patients list contain the previously accessed patients?
- [ ]  6. Can a patient be visited from the recent patients?

### 5. Patient Lists

- [ ]  1. Create a new list
    1. Edit title and description
    2. Add and remove patients
    3. Change the status
    4. Add and edit notes
- [ ]  2. Open an existing list
- [ ]  3. Check that the breadcrumbs are correct.
- [ ]  4. Delete a list
- [ ]  5. Check collaboration features using a second device (or browser tab/window). Edit the same list on both at the same time.
- [ ]  6. Can you go back to Home using the breadcrumbs?

### 6. Patient Information

- [ ]  1. Open a patient.
- [ ]  2. Check that the breadcrumbs are correct.
- [ ]  3. Is the information card displayed, complete and correct?
- [ ]  4. Does it contain a button to copy the dotbase ID to the clipboard? Is it functional?
- [ ]  5. Does it contain a button to connect the dotlink app?
- [ ]  6. Can you go back to Home using the breadcrumbs?

### 7. Connection to dotlink

- [ ]  1. Open a patient.
- [ ]  2. Open the dotlink QR code.
- [ ]  3. Scan with dotlink and verify that the login succeeds.
- [ ]  4. Verify that scanning the QR code again with a different device does not lead to a second login.
- [ ]  5. Verify that the button now opens the disconnection dialog and the disconnect succeeds.
- [ ]  6. Does this lead to a logout on the previously connected device?
- [ ]  7. Is a reconnect working?
- [ ]  8. If the patient has patient reports assigned, verify that those and only those are displayed in dotlink.
- [ ]  9. Does the search for patient report templates work?
- [ ]  10. Assign a new patient report with an answer count of 1.
- [ ]  11. Verify it appears in dotlink.
- [ ]  12. Send a response.
- [ ]  13. Verify the questionnaire disappears on reaching the maximum count.
- [ ]  14. Click the refresh button in the patient menu. Verify that the response you just sent appears under the correct assignment.
- [ ]  15. Open the response and check if the content is correct and complete.
- [ ]  16. Assign a patient report with a timing logic. Check whether the app complies with the timing.

### 8. Filling out documents

- [ ]  1. Open a patient.
- [ ]  2. Click on new document.
- [ ]  3. Does the search for document templates work?
- [ ]  4. Add any document (e.g. Demonstration of Input Elements).
- [ ]  5. Does a draft appear at the top of the document stack?
- [ ]  6. Add another document. Does a second draft appear? Add the same document again. Does a third draft appear?
- [ ]  7. Can you switch between the drafts?
- [ ]  8. Fill out one of the documents and save it.
- [ ]  9. Can you switch between a saved document and a draft?
- [ ]  10. Delete the remaining drafts.
- [ ]  11. Edit the previously saved document. Are changes saved automatically?
- [ ]  12. Hover over the creation time of the document. Do you see a tooltip with the editing history of the document? Can you copy the e-mail addresses to your clipboard?
- [ ]  13. Can the document stack be sorted by creation date and last edit date, ascending and descending?

### 9. Copy-Pasting Sections

- [ ]  1. Open a patient.
- [ ]  2. Ensure the patient has a saved document.
- [ ]  3. Verify that copy buttons are shown next to the section titles in reading mode.
- [ ]  4. Copy one of the sections.
- [ ]  5. Create another document of the same kind.
- [ ]  6. Paste the previously copied content into the new document.
- [ ]  7. Save.
- [ ]  8. Add an ‘EV - Bewegungstörungen’.
- [ ]  9. Fill out the first medication section (admission).
- [ ]  10. Verify that you can use the arrow button next to the section title to copy the content to the second medication section (discharge).
- [ ]  11. Save.

### 10. Custom Sections (Diagnosis and DBS)

- [ ]  1. Open a patient who has nothing recorded yet.
- [ ]  2. Add DBS devices to the patient.
- [ ]  3. Add a ‘WV-Parkinson mit DBS’.
- [ ]  4. Verify that the document can be filled out completely, saved and displayed correctly.
- [ ]  5. Add another ‘WV-Parkinson mit DBS’.
- [ ]  6. Verify that content for the diagnosis, medication and DBS sections is copied from the previous visit.

### 11. Scores and Keyboard Input

- [ ]  1. Open a patient.
- [ ]  2. Add a ‘WV - Parkinson’.
- [ ]  3. Fill out the MDS-UPDRS 3 section using the keyboard input.
- [ ]  4. Verify that the score is computed correctly and displayed in reading mode.

### 12. File Upload and 3D Viewer

- [ ]  1. Add a ‘Neurolocalization’.
- [ ]  2. Upload the anatomy.ply and electrodes.ply files, as well as some pictures.
- [ ]  3. Verify that storage and display works correctly.
- [ ]  4. Also try editing the document by uploading different files.

### 13. Check required fields

- [ ]  1. Add a document with required fields (e.g. ESS Scala).
- [ ]  2. Verify that the document cannot be saved without filling them out.

### 14. Document Export

- [ ]  1. Open a saved document of any patient.
- [ ]  2. Open the letter view. Does the content look correct and well formatted? Is the date correct? Is the signature correct? Does it match the last editor of the document?
- [ ]  3. Print the document (to PDF).
- [ ]  4. Can you send a link to the document via e-mail using the paperplane button?
- [ ]  5. Open the export dialog. Does it work correctly?
- [ ]  6. Test the export (TODO test setup needed)

### 15. FHIR Resource Manager

- [ ]  1. Open the manager.
- [ ]  2. Drag a resource onto the upload space. Is it recognized?
- [ ]  3. Drag multiple resources at once. Are all of them recognized?
- [ ]  4. Drag a complex directory structure containing resource onto the upload area. Are all of them recognized?
- [ ]  5. Upload some resources.
- [ ]  6. Switch to the table tab and verify that the upload worked.
- [ ]  7. Verify that paging, filtering and sorting works.
- [ ]  8. Download some resources.
- [ ]  9. Delete some resources. Are the resources that need to be deleted computed correctly?

### 16. Document Builder

- [ ]  1. Create a template containing all item types and using all features (tables, admission - discharge, enable when) of the builder, but do not fill out anything yet.
- [ ]  2. Try to save and observe the validation warning you about the required fields.
- [ ]  3. Save and download.
- [ ]  4. Change something and reset to the saved state using the reset button.
- [ ]  5. Verify that the template can be successfully used for creating documents.
- [ ]  6. Load another document template using the search bar at the top.

## 2. Release Specific QA Tasks