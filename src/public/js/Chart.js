/* Data variable */
var x, y, z, hud, temp, wind,

    /* Battery Data */

    batteryData1 = [0, 0, 0, 0, 0],
    batteryData2 = [0, 0, 0, 0, 0],
    batteryData3 = [0, 0, 0, 0, 0],
    batteryData4 = [0, 0, 0, 0, 0],

    /* Hudmidity Data */

    hudmidityData1 = [0, 0, 0, 0, 0],
    hudmidityData2 = [0, 0, 0, 0, 0],
    hudmidityData3 = [0, 0, 0, 0, 0],
    hudmidityData4 = [0, 0, 0, 0, 0],

    /* ADXL345 Data */

    adxl345Data = [],

    /* Temperature Data */

    tempData1 = [0, 0, 0, 0, 0],
    tempData2 = [0, 0, 0, 0, 0],
    tempData3 = [0, 0, 0, 0, 0],
    tempData4 = [0, 0, 0, 0, 0],

    /*  Wind Volecity Data */

    windData1 = [0, 0, 0, 0, 1],
    windData2 = [0, 0, 0, 0, 2],
    windData3 = [0, 0, 0, 0, 3],
    windData4 = [0, 0, 0, 0, 4]

async function MapDataPushFetch() {
    const response = await fetch("/api")
    const data = await response.json()

    /* Pushing to Battery Data */
    batteryData1.push(data[0].Hud) /*Data 1*/
    batteryData1.shift()

    batteryData2.push(data[1].Hud) /*Data 2*/
    batteryData2.shift()

    batteryData3.push(data[2].Hud) /*Data 3*/
    batteryData3.shift()

    batteryData4.push(data[3].Hud) /*Data 4*/
    batteryData4.shift()


    /* Pushing to Hudmidity Data */
    hudmidityData1.push(data[0].Hud) /*Data 1*/
    hudmidityData1.shift()

    hudmidityData2.push(data[1].Hud) /*Data 2*/
    hudmidityData2.shift()

    hudmidityData3.push(data[2].Hud) /*Data 3*/
    hudmidityData3.shift()

    hudmidityData4.push(data[3].Hud) /*Data 4*/
    hudmidityData4.shift()


    /* Pushing to Temperature Data */
    tempData1.push(data[0].Temp) /*Data 1*/
    tempData1.shift()

    tempData2.push(data[1].Temp) /*Data 2*/
    tempData2.shift()

    tempData3.push(data[2].Temp) /*Data 3*/
    tempData3.shift()

    tempData4.push(data[3].Temp) /*Data 4*/
    tempData4.shift()


    /* Pushing to Wind Data */
    windData1.push(data[0].Wind) /*Data 1*/
    windData1.shift()

    windData2.push(data[1].Wind) /*Data 2*/
    windData2.shift()

    windData3.push(data[2].Wind) /*Data 3*/
    windData3.shift()

    windData4.push(data[3].Wind) /*Data 4*/
    windData4.shift()

}

/* Update Chart Data */
async function drawChart() {
    await MapDataPushFetch()
    await setLabels()
    myLineChart1.update()
    myLineChart2.update()
    myBarChart1.update()
    myBarChart2.update()
    console.log('Updated')
    console.log(batteryData1)
}

/* Set Hour labels */

var hours = ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];
async function setLabels() {
    var nextMonthIndex = hours.indexOf(myLineChart1.data.labels[myLineChart1.data.labels.length - 1]) + 1;
    var nextMonthName = hours[nextMonthIndex] != undefined ? hours[nextMonthIndex] : "00:00 AM";

    myLineChart1.data.labels.push(nextMonthName)
    myLineChart1.data.labels.shift()

    myLineChart2.data.labels.push(nextMonthName)
    myLineChart2.data.labels.shift()

    myBarChart1.data.labels.push(nextMonthName)
    myBarChart1.data.labels.shift()
}


/* Continously update the chart */

setInterval(() => {
    drawChart()
}, 3000)

/* Chart selection */

var ctx1 = document.getElementById("myAreaChart1");
var ctx2 = document.getElementById("myBarChart1");

var ctx3 = document.getElementById("myAreaChart2");
var ctx4 = document.getElementById("myBarChart2");


// Area Chart Example
var myLineChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"],
        datasets: [{
            label: "Vị trí cây 1",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData1,
        }, {
            label: "Vị trí cây 2",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "red",
            pointRadius: 5,
            pointBackgroundColor: "red",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,50,10,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData2,
        }, {
            label: "Vị trí cây 3",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "green",
            pointRadius: 5,
            pointBackgroundColor: "green",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0,255,0,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData3,
        }, {
            label: "Vị trí cây 4",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "rgba(241, 196, 15,1.0)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(241, 196, 15,1.0)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(241, 196, 15, 0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData4,
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                }
            }],
        },
        legend: {
            display: false
        }
    }
});


var myLineChart2 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"],
        datasets: [{
            label: "Vị trí cây 1",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: batteryData1,
        }, {
            label: "Vị trí cây 2",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "red",
            pointRadius: 5,
            pointBackgroundColor: "red",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,50,10,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: batteryData2,
        }, {
            label: "Vị trí cây 3",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "green",
            pointRadius: 5,
            pointBackgroundColor: "green",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0,255,0,0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData3,
        }, {
            label: "Vị trí cây 4",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "rgba(241, 196, 15,1.0)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(241, 196, 15,1.0)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(241, 196, 15, 0.8)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData4,
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                }
            }],
        },
        legend: {
            display: false
        }
    }
});


// Bar Chart Example
var myBarChart1 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"],
        datasets: [{
            label: "Humidity %",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: hudmidityData1,
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'month'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 6
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    maxTicksLimit: 5
                },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
            display: false
        }
    }
});

var myBarChart2 = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"],
        datasets: [{
            label: "ADXL345",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [25, 10, 20, 30, 40, 80, 60, 70, 90, 100, 75, 67],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'month'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 6
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 15000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
            display: false
        }
    }
});




window.onload = function () {}