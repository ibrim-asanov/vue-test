// Get the ENV variables
const env_key = import.meta.env.VITE_APP_TOUR_KEY;

// Link for the tours API
function apiTours(tour: string, key: string) {
  let link = "";
  const theKey = key ? key : env_key;

  // Check the type and generate the link
  if (tour) {
    link = `https://api.bimtours.dev/v1/tours/viewer/${tour}?key=${theKey}`;
  }

  // Output the link
  return link;
}

// Link for the hotspots API
function apiHotspots(tour: string, hotspot: string, key: string) {
  let link = "";
  const theKey = key ? key : env_key;

  // Check the type and generate the link
  if (tour && hotspot) {
    link = `https://api.bimtours.dev/v1/tours/viewer/${tour}/hotspots/${hotspot}?key=${theKey}`;
  }

  // Output the link
  return link;
}

export { apiTours, apiHotspots };
