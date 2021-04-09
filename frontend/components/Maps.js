import {MapContainer , TileLayer, Circle, Popup } from "react-leaflet";
import styled from "styled-components"
import "leaflet/dist/leaflet.css"
//import {shadowOnMap} from "./util"

const casesTypeColor = {
    cases:{
        hex:"#CC1034",
        rgb:"rgb(204,16,52",
        half_op: "rgba(204, 16, 52, 0.5",
        multiplier: 800
    },
    recovered:{
        hex:"7dd71d",
        rgb:"rgb(125,125,29)",
        half_op:"rgba(125,215,29,0.5",
        multiplier:1200,
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251, 68,67,0.5",
        half_op:"rgba(251, 68, 67,0.5)",
        multiplier:2000
    }
}


function Maps({countries, center, zoom, casesType = "cases"}) {
    return (
        <Container>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            {() =>(countries.map((country)=>(
                            <Circle
                                center={[country.countryInfo.lat, country.countryInfo.long]}
                                fillOpacity = {0.4}
                                color={casesTypeColor[casesType].hex}
                                fillColor = {casesTypeColors[casesType].hex}
                                radius = {3000}
                            >
                            <Popup>
                                <h1>Im a Popup</h1>
                            </Popup>
                            </Circle>
                    ))
            )}
            </MapContainer>
        </Container>
    )
}

export default Maps

const Container = styled.div`
height:500px;
background-color: white;
padding: 1rem;
border-radius:20px;
margin-top: 16px;
box-shadow: 0 0 8px -4px rgba(0,0,0,0.5)`


