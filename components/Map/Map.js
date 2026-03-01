import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default function Map(props) {

    const trip = props.trip

    return (
        <MapContainer style={{ "height": "500px" }} center={[trip["start station location"].coordinates[1], trip["start station location"].coordinates[0]]} zoom={15}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[trip["start station location"].coordinates[1], trip["start station location"].coordinates[0]]}>
                            <Tooltip permanent direction='right'>Start: {trip["start station name"]}</Tooltip>
                    </Marker>
                    <Marker position={[trip["end station location"].coordinates[1], trip["end station location"].coordinates[0]]}>
                            <Tooltip permanent direction='right'>End: {trip["end station name"]}</Tooltip>
                    </Marker>
                </MapContainer>
    );
}
