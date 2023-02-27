// Data intefrace
export interface PanoramaData {
  data: Panorama[];
}

// Panorama interface
export interface Panorama {
  id: string;
  name: string;
  floor_id: string;
  hotspot_id: string;
  taken_on: number;
  risk_status: string;
  assets: Assets;
}

// Panorama Assets interface
export interface Assets {
  thumbnail: string;
  standard: string;
  hd: string;
}
