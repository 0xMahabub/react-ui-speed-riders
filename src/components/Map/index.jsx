import React from 'react';
import './map.scss';
// import mapImg from '../../images/Map.png';
// import L from 'leaflet';
// import leafPin from '../../images/pin.png';
import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
    
    return (
        <div className="map_container">
            <MapContainer center={[23.8232, 90.3649]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[23.8232, 90.3649]} icon={mapPin}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    );
};

export default Map;