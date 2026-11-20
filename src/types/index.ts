import { type ImageSource } from 'expo-image';

export type Product = {
  id: string;
  image: ImageSource | number;
};

export type ShipmentStatus = 'In the process' | 'In delivery';

export type Shipment = {
  id: string;
  receipt: string;
  status: ShipmentStatus;
  emoji: number;
};

export type TrackingEvent = {
  id: string;
  title: string;
  location: string;
  time: string;
  emoji: number;
  highlighted: boolean;
};
