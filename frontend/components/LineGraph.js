import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"

function LineGraph() {
    const [data,setData] = useState({});

    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(data=>{
            console.log("LineData",data)
        })
    },[])


    return (
        <div>
            <h1>Im a graph</h1>
            <Line data={{
                datasets: [{
                    type:"line",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: "black",
                    borderColor: "#5AC53B",
                    borderWidth: 1
                }]

            }}
            options = {{
                maintainAspectRatio: false,
                legend:{
                    display: false,
                },
                tooltips:{
                    mode:"index",
                    intersect: false
                },
               scales:{
                   xAxes:[{
                    type:"time",
                    time:{
                        format:"MM/DD/YY",
                        tooltipFormat:"ll"
                    },
                    ticks:{display:false}
                   }],
                   yAxes:[{
                       ticks:{
                           display: false
                       }
                   }]
               } 

            }}/>
        </div>
    )
}

export default LineGraph
