# K Explore — Web Designing Project Report

## 1. Project Title

**Design and Develop a Responsive Event Management Website**

## 2. Objective

The objective is to create a modern, intuitive and responsive event management website where visitors can discover events, search by topic, view event details, and register through a client-side validated form. The project is built using HTML5, CSS3 and vanilla JavaScript.

## 3. Problem Overview

Event information can be difficult to find when details are scattered or interfaces are confusing. K Explore organizes fictional events into clear cards with category browsing, search, and a simple registration workflow. It demonstrates the user experience of an event-discovery platform.

## 4. Implementation

**HTML5:** Semantic header, navigation, main sections, articles, footer, accessible dialog elements, and form fields with explicit labels.

**CSS3:** Custom color system, CSS Grid and Flexbox, responsive breakpoints, animations, focus states, dark-mode variables, and reduced-motion accessibility support.

**JavaScript:** Event data rendering, live keyword search, category filtering, sorting, dynamic event detail views, form validation, confirmation, registration CRUD using localStorage, CSV export, countdown, and theme persistence.

**Images:** Locally bundled original SVG posters for each event plus a hero illustration. The visuals render without external image-hosting dependencies.

## 5. Requirement-to-Feature Mapping

| Requirement in the assignment | Where implemented |
| --- | --- |
| Attractive homepage / hero | `index.html` → `hero-section`; styles in `styles.css` |
| Upcoming and featured event cards | `data.js` event objects; `app.js` → `cardHtml`, `renderEvents` |
| Event name, date, venue, image, description | Event cards in `app.js`, assets in `assets/` |
| Browse and search events | Search input + `filteredEvents` in `app.js` |
| Filter by categories | Category tiles / filter chips / `renderFilters` |
| Individual event details | `detailsDialog` + `showDetails` |
| Form collects name/email/phone/event | `registrationForm` in `index.html` |
| JavaScript validation | `validationRules`, `validateField`, registration submit handler |
| Confirmation after successful registration | `successDialog` and generated reference number |
| Responsive phone/tablet/desktop | CSS media queries at 1100px, 850px, 650px, 390px |
| HTML5, CSS3, JavaScript | `index.html`, `styles.css`, `app.js` |
| Bonus: dark / light mode | `initializeTheme`, `setTheme` |
| Bonus: countdown timer | `updateCountdown` |
| Bonus: animations and transitions | CSS hover transitions, modal animation |
| Bonus: LocalStorage registrations | `getRegistrations`, `saveRegistrations`, `renderPasses` |
| README | `README.md` |
| GitHub repository and deployed URL | **Manual publishing still required**; `SUBMISSION_GUIDE.md` |

## 6. Registration Flow

1. A visitor selects **Register** from an event card or the event details dialog.
2. The selected event automatically appears in the form.
3. JavaScript validates the four required fields.
4. The app rejects another registration for the same event/email combination in the current browser.
5. The registration record is saved in browser localStorage.
6. The success dialog shows the event and demo reference ID.
7. The visitor can later view, export, or delete the local record.

## 7. Responsive and Accessibility Features

The interface adapts from a multi-column desktop view to compact cards and a hamburger menu on mobile. Form fields are labeled, validation errors are exposed, dialogs can be closed with Escape, and `prefers-reduced-motion` minimizes motion where requested.

## 8. Testing Checklist

- [x] Page renders sample event cards and their locally bundled images.
- [x] Search returns matching items and displays an empty state for no matches.
- [x] Category filtering and reset work.
- [x] Details show event agenda, location, date and tags.
- [x] Form rejects missing inputs and accepts a valid sample submission.
- [x] Success screen displays a demo reference.
- [x] Saved registrations display and can be removed.
- [x] CSV download works.
- [x] Theme toggle updates the page.
- [x] Mobile menu works and a 390px layout has no horizontal page overflow.
- [ ] User pushes repository to their own GitHub account.
- [ ] User deploys website and verifies the public URL.
- [ ] User submits both required links to the instructor.

The checked interactions were exercised in a headless Chromium harness; browser storage was simulated in memory for that harness. Repeat basic checks in the published browser environment before submitting.

## 9. Scope and Limitations

This is a **front-end educational demo**. Events and schedules are sample data. Registering does not book a real event, send emails, reserve seats, or communicate with any server. localStorage is device/browser-specific and is not a secure production storage system. A production version would need a secure server, database, authentication, and organizer/admin functionality.

## 10. Future Enhancements

An organizer dashboard, authenticated accounts, real event database, transactional email confirmations, calendar integration, and payment handling could be added after the front-end demonstration.
