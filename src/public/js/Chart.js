/* Data variable */
var x, y, z, hud, temp, wind,

    /* Battery Data */

    batteryData1 = [76, 77, 88, 78, 80],
    batteryData2 = [75, 78, 82, 81, 83],
    batteryData3 = [70, 74, 82, 87, 88],

    /* Hudmidity Data */

    hudmidityData1 = [0, 0, 0, 0, 1],
    hudmidityData2 = [0, 0, 0, 0, 2],
    hudmidityData3 = [0, 0, 0, 0, 3],

    /* ADXL345 Data */

    adxl345Data  = [],
    adxl345Data2 = [],

    /*  Wind Volecity Data */

    windData1 = [0, 0, 0, 0, 1],
    windData2 = [0, 0, 0, 0, 2],
    windData3 = [0, 0, 0, 0, 3]

async function MapDataPushFetch() {
    const response = await fetch("/api")
    const data = await response.json()

    /* Pushing to Battery Data */
    batteryData1.push(data[0].Pin) /*Data 1*/
    batteryData1.shift()

    batteryData2.push(data[1].Pin) /*Data 2*/
    batteryData2.shift()

    batteryData3.push(data[2].Pin) /*Data 3*/
    batteryData3.shift()


    /* Pushing to Hudmidity Data */
    hudmidityData1.push(data[0].Do_am) /*Data 1*/
    hudmidityData1.shift()

    hudmidityData2.push(data[1].Do_am) /*Data 2*/
    hudmidityData2.shift()

    hudmidityData3.push(data[2].Do_am) /*Data 3*/
    hudmidityData3.shift()

    /* Pushing to Wind Data */
    windData1.push(data[0].Gio) /*Data 1*/
    windData1.shift()

    windData2.push(data[1].Gio) /*Data 2*/
    windData2.shift()

    windData3.push(data[2].Gio) /*Data 3*/
    windData3.shift()

}

/* Update Chart Data */
async function drawChart() {
    await MapDataPushFetch()
    await setLabels()
    myLineChart1.update()
    myLineChart2.update()
    myBarChart1.update()
    myBarChart2.update()
    console.log('Charts Updated')
}

/* Set Hour labels */

var hours = ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];
async function setLabels() {

    var nextIndex = hours.indexOf(myLineChart1.data.labels[myLineChart1.data.labels.length - 1]) + 1;
    var nextIndexName = hours[nextIndex] != undefined ? hours[nextIndex] : "00:00 AM";

    myLineChart1.data.labels.push(nextIndexName)
    myLineChart1.data.labels.shift()

    myLineChart2.data.labels.push(nextIndexName)
    myLineChart2.data.labels.shift()

    myBarChart1.data.labels.push(nextIndexName)
    myBarChart1.data.labels.shift()

}


/* Continously update the chart */

setInterval(() => {
    drawChart()
}, 5000)


/* Chart selection */

var ctx1 = document.getElementById("myAreaChart1");
var ctx2 = document.getElementById("myBarChart1");

var ctx3 = document.getElementById("myAreaChart2");
var ctx4 = document.getElementById("myBarChart2");


/* Wind Data Chart */
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
            pointHoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
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

/* Battery Data Chart */
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
            pointHoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
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
            data: batteryData3,
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


/* Hudmidity Data Chart */
var myBarChart1 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"],
        datasets: [
            {
                label: "Vị trí cây 1",
                backgroundColor: "rgba(0, 0, 255, 0.8)",
                data: hudmidityData1
            },
            {
                label: "Vị trí cây 2",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
                data: hudmidityData2
            },
            {
                label: "Vị trí cây 3",
                backgroundColor: "rgba(0, 255, 0, 0.8)",
                data: hudmidityData3
            }
        ],
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


/* ADXL345 Data Chart */
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