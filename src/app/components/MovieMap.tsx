"use client";
import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Routing-ийг зөвхөн хөтөч дээр ачаалах
if (typeof window !== "undefined") {
  require("leaflet-routing-machine");
}

// 1. Хэрэглэгчийн байршлыг харуулах ТУСГАЙ ИКОН (Цэнхэр цэг)
const userIcon = L.divIcon({
  className: 'custom-user-icon',
  html: `<div class="relative flex h-5 w-5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white"></span>
        </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// 2. Кино театрын стандарт икон
const theaterIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2503/2503508.png', // Киноны икон
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const THEATERS = [
  { id: 1, name: "Өргөө 1 (Хороолол)", lat: 47.9231, lng: 106.8778 },
  { id: 2, name: "Өргөө 2 (IT Park)", lat: 47.9238, lng: 106.9341 },
  { id: 3, name: "Өргөө 3 (Шангри-Ла)", lat: 47.9152, lng: 106.9237 },
  { id: 4, name: "Тэнгис Кино Театр", lat: 47.9242, lng: 106.9092 },
  { id: 5, name: "Гэгээнтэн Энтертайнмент", lat: 47.8997, lng: 106.9189 },
  { id: 6, name: "Хүнну Синема", lat: 47.8741, lng: 106.7621 },
  { id: 7, name: "Cinema Next (Зайсан)", lat: 47.8864, lng: 106.9115 },
  { id: 8, name: "Өргөө 4 (IMAX)", lat: 47.9048, lng: 106.9429 },
  { id: 9, name: "Cinema Next (Encanto)", lat: 47.9022, lng: 106.9412 }
];

const RoutingMachine = ({ userLoc, targetLoc }: { userLoc: [number, number], targetLoc: [number, number] | null }) => {
  const map = useMap();

  useEffect(() => {
    // 1. Газрын зураг эсвэл очих цэг байхгүй бол юу ч хийхгүй
    if (!map || !targetLoc) return;

    const leafletAny = L as any;
    
    // 2. Шинэ routing үүсгэх
    const routingControl = leafletAny.Routing.control({
      waypoints: [
        L.latLng(userLoc[0], userLoc[1]),
        L.latLng(targetLoc[0], targetLoc[1])
      ],
      lineOptions: {
        styles: [{ color: '#3b82f6', weight: 6, opacity: 0.8 }],
        extendToWaypoints: true,
      },
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
    });

    // 3. Зөвхөн map бэлэн үед нэмэх
    routingControl.addTo(map);

    // 4. Цэвэрлэх функц (Cleanup)
  return () => {
  if (map && routingControl) {
    try {
      // hasLayer() дотор параметр нэхээд байгаа тул 
      // зөвхөн map объект байгаа эсэхийг шалгаад шууд removeControl хийнэ.
      // Leaflet доторх control-ууд өөрсдөө map-тайгаа холбоотой эсэхээ шалгадаг.
      if (typeof map.removeControl === 'function') {
        map.removeControl(routingControl);
      }
    } catch (error) {
      console.debug("Routing cleanup safely ignored:", error);
    }
  }
};
  }, [map, targetLoc, userLoc]);

  return null;
};

// Газрын зургийг хэрэглэгч рүү төвлөрүүлэх туслах компонент
const MapCenterer = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  const centerMap = () => map.setView(coords, 15, { animate: true });
  return (
    <button 
      onClick={centerMap}
      className="absolute bottom-5 right-5 z-[1000] bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
      title="Миний байршил"
    >
      📍
    </button>
  );
};

export default function MovieMap() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [targetLocation, setTargetLocation] = useState<[number, number] | null>(null);

  const [urgooMovies, setUrgooMovies] = useState<any[]>([]);

useEffect(() => {
  // Өргөөгийн кинонуудыг татах
  fetch('/api/movies/urgoo')
    .then(res => res.json())
    .then(data => {
      if (data.movies) setUrgooMovies(data.movies);
    });
}, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserLocation([pos.coords.latitude, pos.coords.longitude]); },
      (err) => { 
        console.error("GPS алдаа:", err);
        setUserLocation([47.9188, 106.9176]); 
      }
    );
  }, []);

  if (!userLocation) return (
    <div className="h-[600px] w-full flex items-center justify-center bg-[#1d1d27] rounded-2xl">
       <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-400 font-medium">Газрын зураг бэлдэж байна...</p>
       </div>
    </div>
  );

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
      <MapContainer center={userLocation} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {/* 3. Хэрэглэгчийн байршлыг онцлох Marker */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="w-[300px] h-[400px]">
                <iframe 
                src="https://urgoo.mn/Schedule" 
                className="w-full h-full border-none"
                />
            </div>
            </Popup>
        </Marker>

        {/* Кино театрууд */}
        {THEATERS.map((theater) => (
          <Marker 
            key={theater.id} 
            position={[theater.lat, theater.lng]}
            icon={theaterIcon}
            eventHandlers={{
              click: () => { setTargetLocation([theater.lat, theater.lng]); }
            }}
          >
                 <Popup>
            <div className="text-gray-900 w-[200px]">
                <h3 className="font-bold border-b mb-2">{theater.name}</h3>
                <p className="text-[10px] text-blue-500 font-bold mb-1">ОДОО ГАРЧ БУЙ:</p>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                {urgooMovies.length > 0 ? (
                    urgooMovies.map((movie, idx) => (
                    <div key={idx} className="flex items-center gap-2 border-b border-gray-100 pb-1">
                        <img src={movie.image} className="w-8 h-10 object-cover rounded" alt="" />
                        <span className="text-[11px] leading-tight font-medium">{movie.title}</span>
                    </div>
                    ))
                ) : (
                    <p className="text-[10px] text-gray-400">Хуваарь шинэчлэгдэж байна...</p>
                )}
                </div>
            </div>
            </Popup>
          </Marker>
        ))}

        {targetLocation && <RoutingMachine userLoc={userLocation} targetLoc={targetLocation} />}
        
        {/* Хэрэглэгч рүү үсрэх товчлуур */}
        <MapCenterer coords={userLocation} />
      </MapContainer>
    </div>
  );
}