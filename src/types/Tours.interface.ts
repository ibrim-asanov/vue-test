// Data intefrace
export interface TourData {
  data: Tour[];
}

// Tour interface
export interface Tour {
  id: string;
  name: string;
  property_name: string | null;
  description: string | null;
  shareable: boolean;
  floor_plan: string;
  structure?: Floor[];
}

// Floor
export interface Floor {
  id: string;
  name: string;
  floor_plan: string;
  hotspots: Hotspot[];
}

// Hotspot interface
export interface Hotspot {
  id: string;
  floor_id: string;
  name: string;
  position: Position;
}

// Position interface
export interface Position {
  x: number;
  y: number;
}
