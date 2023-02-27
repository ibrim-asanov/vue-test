// Set the predefined link types
export type linkType = "tour" | "floor" | "hotspot" | "panorama";

// Get the ENV variables
const key = import.meta.env.VITE_APP_TOUR_KEY;

// Build the link
export function getLink(
  type: linkType,
  tour: string | null,
  floor: string | null,
  hotspot: string | null,
  id: string | null
) {
  let link = "";
  // Check the type and generate the link
  if (type == "tour") {
    link = `/${id}?key=${key}`;
  } else if (type == "floor") {
    link = `/${tour}/${id}?key=${key}`;
  } else if (type == "hotspot") {
    link = `/${tour}/${floor}/${id}?key=${key}`;
  } else if (type == "panorama") {
    link = `/${tour}/${floor}/${hotspot}/${id}?key=${key}`;
  }

  // Output the link
  return link;
}
