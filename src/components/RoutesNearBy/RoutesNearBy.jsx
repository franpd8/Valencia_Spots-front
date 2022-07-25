import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPoisNearBy } from '../../features/routes/routesSlice';

const RoutesNearBy = () => {

  const { pois } = useSelector(state => state.routes);
  const dispatch = useDispatch();
  const [mapCenter, setMapCenter] = useState({});
  const [loading, setLoading] = useState(false);

  const launchGetPoisNearby = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((pos) => {
        setMapCenter({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      })
    }
  }

  useEffect(() => {
    launchGetPoisNearby();
  }, []);

  useEffect(() => {
    if (mapCenter.lat) {
      dispatch(getPoisNearBy(mapCenter));
    }
    setLoading(false);
  }, [mapCenter]);

  const truncateAfterWord = (str, chars) =>
    str.length < chars ?
      str
      :
      `${str.substr(0, str.substr(0, chars - 3).lastIndexOf(" "))}...`;

  const marker = pois?.map((poi) => {
    return (
      <Marker
        key={poi._id}
        position={[poi.latitude, poi.longitude]}>
        <Popup className="pop2">
          <div className="pop">
            <h3>{poi.name}</h3>
            <p>{truncateAfterWord(poi.description, 300)}</p>
            <Link to={`/route/${poi.routeId._id}`}>
              <Tag color="geekblue">{poi.routeId.name}</Tag>
            </Link>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (<>
    <h1>RoutesNearBy</h1>
    {mapCenter.lat && !loading ?
      <MapContainer
        center={[mapCenter.lat, mapCenter.lon]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "80vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
      </MapContainer>
      :
      <div>Loading...</div>
    }
  </>)
}

export default RoutesNearBy;