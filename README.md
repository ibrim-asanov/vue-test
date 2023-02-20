# Front-end developer evaluation task

## The tour viewer

The tour viewer is a web application that allows users to view tours hosted on our system.
For reference, you can use the following link for the same tour on our system:
[Tour viewer example](https://app.bimtours.dev/tour?id=4dFt1rmYFqRI7AxtN8q1SD&key=IgSjubq3amMafYhP6EL18KAexCqTnZWQ)

Tours have a **hierarchical structure** where the **tour is the root node**;

- Each tour contains one or more floors;
- Each floor contains one or more hotspots;
- Each hotspot contains zero or more photos;

## Task scope

The goal of the task is to use Vue.js 3 (Composition API), TypeScript, and Pinia for state management and create a
simplified version of our tour viewer by implementing the two API endpoints provided in the OpenAPI
specification. Specifically, you should implement the following features:

- The tour viewer should be able to display the tour structure (floors and hotspots) and the photos of the hotspots;
    - When a user lands on a tour, show the list of floors;
    - When a user clicks on a floor, the list of hotspots should be displayed along with the floorplan image overlayed
      with the hotspots as clickable red dots (there is no need to implement any zoom controls);
    - When a user clicks on a hotspot, the list of photos should be displayed;
    - If there are photos in the hotspot, show the first photo using the 360 viewer. If there are no photos in the
      hotspot, show the message "There are no photos in this hotspot...";
    - Implement the 360 photo viewer, see notes below;
    - On top of the page, display breadcrumbs to show the current location in the tour (`Tour > Floor > Hotspot`);
- Implement an error page if the attempt to load the tour returns an error;
- For all other errors like non-existent hotspots, you can just show an alert;
- A loader overlay should be displayed when loading data from the API;
- The design is out of the scope of the task, you can do it however you want or use the provided demo below (not the real tour
  viewer) for reference;

### Demo
Demo of what the completed task should do is available here https://youtu.be/IPA6qtRBzjg

The expected time for the task is around 4 hours.
If you don't have enough time to implement all the features, you can share your ideas and approach to solving them on
a call once you have submitted your solution.

We will be happy to answer any questions you might have, so please do not hesitate to contact us.

### App URLs

- `/` - Nothing, you can leave the default Vue page;
- `/${tourId}?key=${key}` - Show a list of the
  floors; [Example](http://localhost:5173/4dFt1rmYFqRI7AxtN8q1SD?key=IgSjubq3amMafYhP6EL18KAexCqTnZWQ);
- `/${tourId}/{$floorId}?key=${key}` - Show a list of the hotspots in the
  floor; [Example](http://localhost:5173/4dFt1rmYFqRI7AxtN8q1SD/4K7l7KE3ma8YItVIt3gzvN?key=IgSjubq3amMafYhP6EL18KAexCqTnZWQ);
- `/${tourId}/{$floorId}/${hotspotId}?key=${key}` - Show a list of the photos in the
  hotspot; [Example](http://localhost:5173/4dFt1rmYFqRI7AxtN8q1SD/4K7l7KE3ma8YItVIt3gzvN/4K7lUIHxmM65s88nVQOOJW?key=IgSjubq3amMafYhP6EL18KAexCqTnZWQ);
- `/${tourId}/{$floorId}/${hotspotId}/${photoId}?key=${key}` - Show the 360 photo viewer for the
  photo; [Example](http://localhost:5173/4dFt1rmYFqRI7AxtN8q1SD/4K7l7KE3ma8YItVIt3gzvN/4K7lUIHxmM65s88nVQOOJW/4NLUXpjEIaSfNJ1uiwHjzD?key=IgSjubq3amMafYhP6EL18KAexCqTnZWQ);

### OpenAPI

The provided OpenAPI specification is a simplified version of our API endpoints. You can ignore all fields from the API
endpoints that are not included in the spec. You can use the following values for `TourId` and `key`:

* Tour ID `4dFt1rmYFqRI7AxtN8q1SD`
* Tour Key `IgSjubq3amMafYhP6EL18KAexCqTnZWQ`

### Loader SVG

Example SVG you can use for the loader:

```svg

<svg viewBox="0 0 1024 1024">
    <path
            fill="ffffff"
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
    />
</svg>
```

### 360 photo viewer

For displaying the 360 photos, a third-party library is needed.
Please, use **Photo Sphere Viewer** 5.x. We do not expect you to become fully familiar with it. The code below is all
that is needed to display 360 photos:

```bash
npm install @photo-sphere-viewer/core
```

```js
import {Viewer} from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.scss';
```

```html

<div id="viewer" style="width: 1000px; height: 700px;"></div>
```

Create a new instance of the viewer:

```js
const viewer = new Viewer({
	container: document.querySelector('#viewer'),
	panorama: 'https://bimtours-dev.s3.eu-central-1.amazonaws.com/4dFt1rmYFqRI7AxtN8q1SD/1/1/1/1.jpg',
	navbar: false,
	defaultZoomLvl: 0,
	maxFov: 100
});
```

If the viewer already is initialized you can change the photo like this:

```js
viewer.setPanorama('https://new.image/url.jpg');
```

The full documentation for the viewer, if needed, is
available [here](https://photo-sphere-viewer.js.org/guide/#install-photo-sphere-viewer).

## CORS

The allowed origin for the API endpoints is `http://localhost:5173/`. If your application is running on a different
port, you will need to change it to `5173`.

## Evaluation

- Code quality and simplicity;
- Component design;
- Error handling;
- Use of state management;
- Use of TypeScript;

## Submission

Please submit your solution by sending us a link to a public repository or a zip file with the source code.

If you have any questions, please contact us.

Good luck!