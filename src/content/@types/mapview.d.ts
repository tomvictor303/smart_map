type Task = {
  id: string;
  category: string;
  info: string;
  label: string;
  lat: number;
  lon: number;
  marker_size?: number;
  marker_color?: string;
  tool_tip?: string;
  // For view...  
  selected?: boolean; // Deprecated
}