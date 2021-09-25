import create from "zustand";

const useStore = (set, get) => ({
  homeLocation: {
    lat: "33.2829055, lng: -79.88567139999999}",
    lng: "-79.88567139999999",
  },
  setHomeLocation: (lat, lng) => {
    set({ homeLocation: { lat: lat, lng: lng } });
  },
});

export default create(useStore);
