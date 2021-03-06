import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
    legend:{
        display:false
    },
    elements:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intsersect:false,
        callbacks:{
            label: function (tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll"
                },
            }
        ],
        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

function LineGraph({casesType = "cases"}) {
    const [data,setData] = useState({});

    const buildChartData = (data,casesType) =>{
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases){
            if(lastDataPoint){
                let newDataPoint = {
                    x:date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }
        return chartData;
    }

    useEffect(()=>{
        const fetchData = async()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response)=>response.json())
            .then((data)=>{
                const chartData = buildChartData(data, "cases")
                setData(chartData)
                console.log("LineData>>>",data["cases"])
            });
        }
        fetchData()

    },[casesType])



    return (
        <div>
            <h1>Im a graph</h1>
            {data?.length > 0 && (
                <div>
                    <Line 
                    options={options}
                    data ={{
                        datasets:[
                            {
                                data:data,
                                backgroundColor:"rgba(204,16,52,0.5)",
                                borderColor: "#CC1034"
                            }
                        ]
                    }}/>
                </div>
            )}
        </div>
    )
}

export default LineGraph
