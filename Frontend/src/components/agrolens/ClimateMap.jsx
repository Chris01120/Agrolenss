import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { REGIONS } from "@/lib/agrolens-data";
import "leaflet/dist/leaflet.css";

// Fix marker icons (important)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// West Africa bounds (restrict view)
const WEST_AFRICA_BOUNDS = [
  [0, -25],   // SW corner
  [25, 20],   // NE corner
];

const COUNTRY_COORDS = {
  Senegal: [14.5, -14.45],
  "Côte d'Ivoire": [7.54, -5.55],
  Ghana: [7.95, -1.02],
  Nigeria: [9.08, 8.68],
};

export function ClimateMap({ selectedRegionId, onSelect }) {
  const selected = REGIONS.find((r) => r.id === selectedRegionId);

  return (
    <div className="surface-elevated overflow-hidden rounded-2xl">

      <MapContainer
        center={[7.5, -1]}          // West Africa center
        zoom={5}
        minZoom={4}
        maxZoom={7}
        maxBounds={WEST_AFRICA_BOUNDS}
        maxBoundsViscosity={1.0}
        className="h-[420px] w-full"
      >

        {/* Light clean map style */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Only West Africa countries */}
        {REGIONS.map((r) => {
          const coords = COUNTRY_COORDS[r.country];
          if (!coords) return null;

          return (
            <Marker
              key={r.id}
              position={coords}
              eventHandlers={{
                click: () => onSelect?.(r.id),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{r.name}</strong>
                  <br />
                  {r.country}
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

      {/* Optional selected info */}
      {selected && (
        <div className="p-3 text-sm text-muted-foreground">
          Active Region:{" "}
          <span className="font-semibold text-foreground">
            {selected.name}, {selected.country}
          </span>
        </div>
      )}
    </div>
  );
}