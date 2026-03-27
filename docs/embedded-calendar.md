# Embeddable Calendar

## Purpose
The embeddable calendar allows you to generate a URL or iframe code to display events from the Archipelago website on another website.
Events can be displayed either in calendar view or in list view.

## Usage
The iframe code can be embedded into an external website.
You simply need to copy this code and add it to an HTML file or to a dedicated area in a CMS.
The URL can contain parameters to filter events by theme, by organization, or both.

## General behavior
When the iframe is displayed on an external website, it fetches events from Archipelago.
Events can be displayed with or without filters, depending on the parameters defined in the URL.
This allows an external website to display events without being directly on the Archipelago website.
For example, an organization can display only the events relevant to it.

## URL parameters
The calendar URL accepts several parameters to change the display and filter events.
These parameters can be used separately or combined.

### view
Used to choose the calendar view:
- `view=calendar` : displays the calendar view
- `view=list` : displays the list view

### theme
Used to filter events by theme.
Example:
- `theme=youth` (displays only events related to the "youth" theme)

### organization
Used to filter events by organization.
Example:
- `organization=creative-organization` (displays only events from the "Creative Organization")

### Example URLs (local)
- Calendar view with theme and organization filters:

http://localhost:5173/embeddedcalendar?view=calendar&theme=sport&organization=creative-organization

- List view with a theme filter:

http://localhost:5173/embeddedcalendar?view=list&theme=youth

- List view with an organization filter:

http://localhost:5173/embeddedcalendar?view=list&organization=creative-organization

- Calendar view without filters:

http://localhost:5173/embeddedcalendar?view=calendar

## Structure générale
- `demo/src/DemoEmbeddedCalendar.tsx`
- `frontend/src/resources/Agent/Event/EmbeddedCalendar.tsx`
- `middleware/services/embeddedcalendar.service.js`

`DemoEmbeddedCalendar.tsx` is the demo application used to generate a calendar URL or iframe code, with or without filters.

`EmbeddedCalendar.tsx` is the component that displays the event calendar. It reads the URL parameters (view, theme, organization) and displays the corresponding events.

`embeddedcalendar.service.js` is the backend service used to fetch events and apply filters (theme, organization). It is used by the frontend to get the data to display.
The service uses a backend endpoint to retrieve events:
`GET /api/embeddedcalendar/events`
This endpoint returns filtered events.

## Integration into the organization page
The `frontend/src/resources/Agent/Actor/Organization/OrganizationIntegration.jsx` component displays a simplified version of the demo directly on an organization page.
This makes it easier for non-technical users to use, allowing them to quickly get a customized view (calendar or list) for their organization using the following buttons:
- show a preview of the calendar or list
- copy the link
- copy the iframe code

The generated URL automatically includes the `organization` parameter corresponding to the displayed organization.

## Technical behavior
- The `EmbeddedCalendar.tsx` component reads the parameters from the URL
- It calls the backend to fetch events
- The `embeddedcalendar.service.js` service filters the events
- The frontend displays the results (calendar or list)
