import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import numeral from "numeral";

// default configuration for line that will be rendered in the map
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: { // allows us to see the vale of a poin on the graph it is a predefined tool
    mode: "index",
    intersect : false,
    callbacks: {
      label : function (tooltipItem, data){
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
            callback: function(value,index,values){
              return numeral(value).format("0a");
            },
        },
      },
    ],
  },
};

const buildChartData = (data,caseType="cases") => {
  // here by setting caseType= 'cases' we are calling it for cases if no parameter is passed
  // else it can work with other types as well like deaths , recoverde etc.
    let chartData = [];
    let lastDataPoint;

    //data[caseType].forEach(date => {
      for(let date in data.cases){
        if(lastDataPoint){
          let newDataPoint = {
              x: date,
              y: data[caseType][date] - lastDataPoint,  
              // number of cases in current day is equal to no. of cases till current date - number pf cases till previous date.
              //
            };

            chartData.push(newDataPoint);
        }

        lastDataPoint = data[caseType][date];
    }
    return chartData;
};

function LineGraph({casesType = "cases"}) {
  const [data, setData] = useState({});

  useEffect(() => {
    // here the data fetch is asyn in nature there fore it will give 
    // an error.
    //To fecth asyn data in useffect we have to make a asunc function

    const fetchData = async() =>{
     await fetch("https://disease.sh/v3/covid-19/historical/all?lastdats=120") // fetching data from api for last 120 days
      .then((response) => response.json())
      .then((data) => {
        let chartData = buildChartData(data,casesType); // passing the data fetched form the api to buildChartFunction.
        setData(chartData);
        console.log(data);
        
      });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {/* <h1>I am Graph</h1> */}
      {data?.length >0 && ( // optional chaining
      // when initially we dont have any data then it will show an error while 
      //rendering map therefore we will have conditional chaining.
         <Line 
         options = {options}
         data={{
          datasets: [
            {
              backgroundColor: "rgba(240,16,52,0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
        />
      )}
     
    </div>
  );
}

export default LineGraph;
