import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useFarmData() {
  const [farms, setFarms] = useLocalStorage("hydroponic_farms", [
    { id: 1, name: "Main Greenhouse", plants: 250, status: "healthy", lastUpdate: "2 min ago" },
    { id: 2, name: "Nursery Section A", plants: 120, status: "healthy", lastUpdate: "5 min ago" },
    { id: 3, name: "Vertical Farm Unit", plants: 180, status: "needs-attention", lastUpdate: "1 min ago" },
  ]);

  const [nearbyFarms, setNearbyFarms] = useLocalStorage("hydroponic_nearby_farms", [
    { id: 1, name: "Green Valley Farm", distance: "2.3 km", status: "active", moisture: 78, temp: 24, ph: 6.5, location: "North Zone" },
    { id: 2, name: "Sunrise Hydroponics", distance: "3.1 km", status: "active", moisture: 82, temp: 26, ph: 6.8, location: "East Zone" },
    { id: 3, name: "Aqua Grow Center", distance: "4.5 km", status: "warning", moisture: 45, temp: 31, ph: 5.2, location: "South Zone" },
    { id: 4, name: "Urban Greens", distance: "5.2 km", status: "active", moisture: 71, temp: 23, ph: 6.9, location: "West Zone" },
    { id: 5, name: "EcoFarm Hub", distance: "6.8 km", status: "critical", moisture: 32, temp: 28, ph: 7.8, location: "Central Zone" },
    { id: 6, name: "Fresh Leaf Garden", distance: "7.1 km", status: "active", moisture: 85, temp: 25, ph: 6.4, location: "North Zone" },
  ]);

  const addFarm = (farm) => {
    setFarms(prev => [...prev, { ...farm, id: Date.now() }]);
  };

  const updateFarm = (id, updates) => {
    setFarms(prev => prev.map(farm => 
      farm.id === id ? { ...farm, ...updates } : farm
    ));
  };

  const removeFarm = (id) => {
    setFarms(prev => prev.filter(farm => farm.id !== id));
  };

  const updateNearbyFarm = (id, updates) => {
    setNearbyFarms(prev => prev.map(farm => 
      farm.id === id ? { ...farm, ...updates } : farm
    ));
  };

  return {
    farms,
    nearbyFarms,
    addFarm,
    updateFarm,
    removeFarm,
    updateNearbyFarm,
    setFarms,
    setNearbyFarms
  };
}

export function useSettings() {
  const [settings, setSettings] = useLocalStorage("hydroponic_settings", {
    darkMode: false,
    compactMode: false,
    showAnimations: true,
    themeColor: "#4facfe",
    dataRefreshInterval: 2000,
    autoSave: true,
    language: "en",
    units: "metric",
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    alertThreshold: {
      moisture: { min: 30, max: 80 },
      temperature: { min: 15, max: 35 },
      ph: { min: 5.5, max: 7.5 }
    }
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateAlertThreshold = (param, type, value) => {
    setSettings(prev => ({
      ...prev,
      alertThreshold: {
        ...prev.alertThreshold,
        [param]: {
          ...prev.alertThreshold[param],
          [type]: parseFloat(value)
        }
      }
    }));
  };

  return { settings, updateSetting, updateAlertThreshold, setSettings };
}