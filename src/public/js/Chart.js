/* Data variable */
var x, y, z, hud, temp, wind
var windData = [],
    batteryData = [],
    hudmidityData = [],
    adxl345Data = [],
    tempData = []

async function MapDataPushFetch() {
    const response = await fetch("/api")
    const data = await response.json()

    console.log(data)
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // var Data_type = urlParams.get('q')
    // Data_type--
    // nodeData = data[Data_type]
    // console.log(nodeData);
    // for (item of data) {

    //     x = item.ADXL345.X
    //     y = item.ADXL345.Y
    //     z = item.ADXL345.Z
    //     hud = item.Hud
    //     temp = item.Temp
    //     wind = item.Wind

    //     /* Push data to array */
    //     // hudmidityData.push(hud)
    //     // tempData.push(temp)
    //     // windData.push(wind)
    //     hudmidityData.push(parseInt(hud))
    //     tempData.push(parseInt(temp))
    //     windData.push(parseInt(wind))
    // }
    hudmidityData.push(data[0].Hud)

    console.log(hudmidityData)
    console.log(tempData)
    console.log(windData)
}

MapDataPushFetch()

/* Update Chart Data */
async function drawChart() {
    await MapDataPushFetch()
    myLineChart1.data.datasets[0].data = windData
    myLineChart1.data.datasets[1].data = windData
    myLineChart1.update()
    console.log('Updated')
}

// setInterval(() => {
//     drawChart()
// }, 1000)



var ctx1 = document.getElementById("myAreaChart1");
var ctx2 = document.getElementById("myBarChart1");
var ctx3 = document.getElementById("myAreaChart2");
var ctx4 = document.getElementById("myBarChart2");


// Area Chart Example
var myLineChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Vị trí cây 1",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData[0],
        }, {
            label: "Vị trí cây 2",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(255,50,10,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(255,50,10,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,50,10,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData[1],
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
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Battery %",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [100, 80, 90, 85, 70, 88, 90, 75, 87, 66, 77, 88, 90],
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
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Humidity %",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [33, 18, 45, 27, 35, 77, 60],
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
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "ADXL345",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [0, 10, 20, 30, 40, 80, 60, 70, 90, 100, 75, 67],
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