"use client";
import { useCheckout } from "@/context/checkoutContext";
import { setSelectedDealerInfo } from "@/redux/features/checkoutSlice";
import { useTypedSelector } from "@/redux/store";
import { TDealer } from "@/types/order";
import L, { LatLngExpression } from "leaflet"; // Leaflet library for map functionality
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for map styling
import { memo, useEffect, useMemo, useRef, useState } from "react"; // React hooks for state and lifecycle management
import { ImSpinner } from "react-icons/im"; // Spinner icon for loading state
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"; // React-Leaflet components for rendering maps
import { useDispatch } from "react-redux";

// Component to handle map centering dynamically
const DynamicMapView = ({
  coordinates,
  onLoadingChange,
  popupRef,
  ...props
}: {
  coordinates?: LatLngExpression;
  onLoadingChange?: (isLoading: boolean) => void;
  popupRef: L.Popup;
}) => {
  const { relocate } = useCheckout(); // Access `relocate` state from the checkout context
  const map = useMap(); // Access the map instance from React-Leaflet
  useEffect(() => {
    onLoadingChange?.(false); // Reset loading state
    if (coordinates || (relocate && coordinates)) {
      // Trigger the map animation
      map.setView(coordinates, 12, { animate: true });
      // Simulate loading delay
      const timeOut = setTimeout(() => {
        onLoadingChange?.(false);
      }, 700);
      return () => clearTimeout(timeOut);
    }
  }, [coordinates, map, onLoadingChange, relocate]);

  return null; // This component only handles map centering and does not render anything
};

const getCoords = (dealer: TDealer | undefined) => {
  if (dealer?.coordinates.latitude && dealer?.coordinates.longitude) {
    return [
      dealer?.coordinates.latitude,
      dealer?.coordinates.longitude,
    ] as LatLngExpression;
  }
  return [0, 0] as LatLngExpression;
};

// Main Map Component
const Map = () => {
  const { otherDealers } = useCheckout(); // Access dealer information from the checkout context
  const { selectedDealerInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner visibility
  const popupRefs = useRef<Record<string, L.Popup>>({});
  const dealers = useMemo(() => {
    return [selectedDealerInfo, ...otherDealers];
  }, [selectedDealerInfo, otherDealers]);
  // Function to update loading state
  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };
  const dispatch = useDispatch();

  // Memoize rendering of additional dealers' markers
  const renderMapContent = useMemo(() => {
    if (dealers?.length > 12) {
      return dealers
        .filter((dealer) => {
          return dealer?.coordinates;
        })
        .map((dealer, index) => {
          const dealerKey = `${dealer?.address}-${dealer?.addressPhone}`;
          // Define custom marker icons based on dealer index
          const markerIcon = new L.Icon({
            iconUrl:
              index < 2
                ? "/installer.svg"
                : index < 4
                ? "/mobile.svg"
                : "/top-rated.svg",
            iconSize: [30, 40] as L.PointExpression,
          });

          return (
            <Marker
              icon={markerIcon}
              key={index}
              position={getCoords(dealer)}
              eventHandlers={{
                click: () => {
                  dispatch(setSelectedDealerInfo(dealer));
                },
              }}
            >
              <Popup
                ref={(ref) => {
                  if (ref) {
                    popupRefs.current[dealerKey] = ref;
                  }
                }}
                autoClose={true}
              >
                <p>{dealer?.address || "Unknown Dealer"}</p>
                <p>{dealer?.addressPhone || "Unknown Phone"}</p>
                <p>{dealer?.address1 || "Unknown Address Line 1"}</p>
                <p>{dealer?.address2 || ""}</p>
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${dealer?.address}, ${dealer?.address1}, ${dealer?.city}, ${dealer?.stateProvince}, ${dealer?.zipCode}, ${dealer?.country}`
                  )}`}
                >
                  Get Directions
                </a>
              </Popup>
            </Marker>
          );
        });
    }
    return null; // Return null if there are no dealers
  }, [dealers]);

  // Default marker icon for the nearest dealer
  const nearestMarkerIcon = new L.Icon({
    iconUrl: "/top-rated.svg",
    iconSize: [30, 40] as L.PointExpression,
  });
  // Default fallback coordinates
  return (
    <div className="relative w-full h-[300px] md:h-[350px] lg:h-[500px]">
      {/* Map container */}
      <MapContainer
        center={getCoords(selectedDealerInfo)}
        zoom={selectedDealerInfo ? 5 : 2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Tile layer for map rendering */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render additional dealers' markers */}
        {renderMapContent}
        {/* Handle dynamic view updates */}
        {getCoords(selectedDealerInfo) && (
          <DynamicMapView
            popupRef={
              popupRefs.current[
                `${selectedDealerInfo?.address}-${selectedDealerInfo?.addressPhone}`
              ]
            }
            onLoadingChange={handleLoadingChange}
            coordinates={getCoords(selectedDealerInfo)}
          />
        )}
      </MapContainer>
      {/* Optional loading spinner */}

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-9999">
          <ImSpinner size={38} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default memo(Map);
