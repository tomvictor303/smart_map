type Task = {
  id: string;
  category: string;
  title: string;
  lat: number;
  lon: number;
  point_size?: number;
  point_color?: string;
  details?: string;
  tooltip_info?: string;
  // For view...
  selected?: boolean;
}