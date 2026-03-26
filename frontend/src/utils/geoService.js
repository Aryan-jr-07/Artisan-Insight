// frontend/src/utils/geoService.js

const INDIA_STATES_GEOJSON = "https://raw.githubusercontent.com/HindustanTimesLabs/indiamap/master/public/data/india-states.json";

// Fallback GeoJSON with basic placeholders for NE states + general states
const FALLBACK_INDIA_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "ST_NM": "Mizoram" }, "geometry": { "type": "Polygon", "coordinates": [[[92, 22], [93.5, 22], [93.5, 24], [92, 24], [92, 22]]] } },
    { "type": "Feature", "properties": { "ST_NM": "Assam" }, "geometry": { "type": "Polygon", "coordinates": [[[90, 24], [95, 24], [95, 28], [90, 28], [90, 24]]] } },
    { "type": "Feature", "properties": { "ST_NM": "Nagaland" }, "geometry": { "type": "Polygon", "coordinates": [[[93, 25], [95, 25], [95, 27], [93, 27], [93, 25]]] } },
    { "type": "Feature", "properties": { "ST_NM": "Manipur" }, "geometry": { "type": "Polygon", "coordinates": [[[93, 23], [94.5, 23], [94.5, 25], [93, 25], [93, 23]]] } }
  ]
};

export const fetchIndiaStates = async () => {
  try {
    const response = await fetch(INDIA_STATES_GEOJSON);
    if (!response.ok) throw new Error("Remote GeoJSON unreachable");
    return await response.json();
  } catch (error) {
    console.warn("India States GeoJSON fetch failed. Using hardcoded fallback.");
    return FALLBACK_INDIA_GEOJSON;
  }
};

// Simplified Mizoram District GeoJSON (mock for demo stability)
const MOCK_MIZORAM_DISTRICTS = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "Aizawl",
      "properties": { "name": "Aizawl" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[92.6, 23.3], [92.9, 23.3], [93.1, 23.6], [92.8, 23.9], [92.6, 23.8], [92.6, 23.3]]]
      }
    },
    {
      "type": "Feature",
      "id": "Lunglei",
      "properties": { "name": "Lunglei" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[92.4, 22.8], [92.6, 22.8], [92.9, 22.9], [92.8, 23.3], [92.4, 23.3], [92.4, 22.8]]]
      }
    },
    {
      "type": "Feature",
      "id": "Champhai",
      "properties": { "name": "Champhai" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[93.1, 23.2], [93.4, 23.2], [93.5, 23.7], [93.1, 23.6], [93.1, 23.2]]]
      }
    }
  ]
};

export const fetchStateDistricts = async (stateName) => {
  // We return the mock Mizoram districts or null for others
  if (stateName.toLowerCase() === "mizoram") {
    return MOCK_MIZORAM_DISTRICTS;
  }
  return null;
};
