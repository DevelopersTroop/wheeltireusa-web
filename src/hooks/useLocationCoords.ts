import { create } from 'zustand';

export const useLocationCoords = create<{
  location: {
    lat: string | number;
    lng: string | number;
  };
  setLocation: (lat: string | number, lng: string | number) => void;
}>((set) => ({
  location: {
    lat: '',
    lng: '',
  },
  setLocation(lat, lng) {
    set({
      location: {
        lat,
        lng,
      },
    });
  },
}));
