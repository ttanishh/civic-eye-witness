
'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function MapPicker({ onLocationSelect, initialLocation }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || {
    latitude: 23.0225,  // Default to Gujarat center
    longitude: 72.5714, // Default to Gujarat center
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current) return;
    
    // This is a placeholder for map initialization
    // In a real implementation, you would use a mapping library like Mapbox, Google Maps, or Leaflet
    const mockMap = {
      addMarker: (lat, lng) => {
        console.log('Added marker at', lat, lng);
        // Simulate reverse geocoding
        setTimeout(() => {
          setSelectedLocation(prev => ({
            ...prev,
            address: `Sample Address near ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          }));
        }, 500);
      },
      setCenter: (lat, lng) => {
        console.log('Map centered at', lat, lng);
      },
      onClick: (callback) => {
        // Simulate map click by allowing clicking on the map container
        if (mapRef.current) {
          mapRef.current.addEventListener('click', (e) => {
            // Generate random offset from center for demo purposes
            const lat = selectedLocation.latitude + (Math.random() - 0.5) * 0.01;
            const lng = selectedLocation.longitude + (Math.random() - 0.5) * 0.01;
            callback(lat, lng);
          });
        }
      }
    };

    setMap(mockMap);

    // Set up click handler
    mockMap.onClick((lat, lng) => {
      setSelectedLocation({
        latitude: lat,
        longitude: lng,
        address: '',  // Will be filled by reverse geocoding
      });
      mockMap.addMarker(lat, lng);
      if (onLocationSelect) {
        onLocationSelect({
          latitude: lat,
          longitude: lng,
          address: `Sample Address near ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        });
      }
    });

    // If initial location is provided, center map and add marker
    if (initialLocation?.latitude && initialLocation?.longitude) {
      mockMap.setCenter(initialLocation.latitude, initialLocation.longitude);
      mockMap.addMarker(initialLocation.latitude, initialLocation.longitude);
    }

    return () => {
      // Cleanup
      if (mapRef.current) {
        mapRef.current.replaceWith(mapRef.current.cloneNode(true));
      }
    };
  }, [initialLocation, onLocationSelect]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation({
          latitude,
          longitude,
          address: '', // Will be filled by reverse geocoding
        });
        
        if (map) {
          map.setCenter(latitude, longitude);
          map.addMarker(latitude, longitude);
        }
        
        if (onLocationSelect) {
          onLocationSelect({
            latitude,
            longitude,
            address: `Location near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        }
        
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location', error);
        alert('Failed to get your location. Please try again or select manually.');
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Select Location</h3>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-civic-primary bg-civic-light rounded hover:bg-civic-light/80 transition-colors"
        >
          <MapPin className="h-3 w-3" />
          {isLoading ? 'Getting location...' : 'Use my location'}
        </button>
      </div>
      
      <div 
        ref={mapRef}
        className="w-full h-60 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden relative"
      >
        {/* Map placeholder - would be replaced by actual map in real implementation */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-sm">Map view (click to select location)</p>
        </div>
        
        {/* Center marker indication */}
        {selectedLocation.latitude && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-civic-primary">
            <MapPin className="h-8 w-8" />
          </div>
        )}
      </div>
      
      {selectedLocation.address && (
        <div className="text-sm text-gray-600 italic">
          Selected: {selectedLocation.address}
        </div>
      )}
    </div>
  );
}
