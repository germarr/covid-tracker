import numeral from "numeral"
//import {Circle, Popup} from "react-leaflet"

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


export const sortData = (data) =>{
    const sortData = [...data];

    return sortData.sort((a,b) => (a.cases > b.cases ? -1: 1))
}

// export const shadowOnMap = (data, casesType="cases") =>(
//     data.map(country=>(
//         <div>
//             <Circle
//                 center={[data.countryInfo.lat, data.countryInfo.long]}
//                 fillOpacity = {0.4}
//                 color={casesTypeColor[casesType].hex}
//                 fillColor = {casesTypeColors[casesType].hex}
//                 radius = {Math.sqrt([country[casesType]])*casesTypeColors[casesType].multiplier}
//             >
//             </Circle>
//         </div>
//     ))
// )