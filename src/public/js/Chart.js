/* Data variable */
var x, y, z, hud, temp, wind,

    /* Battery Data */

    batteryData1 = [76, 77, 88, 78, 80],
    batteryData2 = [75, 78, 82, 81, 83],
    batteryData3 = [70, 74, 82, 87, 88],

    /* Hudmidity Data */

    hudmidityData1 = [69, 70, 71, 68, 70],
    hudmidityData2 = [70, 69, 72, 71, 72],
    hudmidityData3 = [68, 71, 70, 70, 71],

    /* ADXL345 Data */

    adxl345_X_Data1  = [1, 3, 2, 1, 2],
    adxl345_Y_Data1  = [3 ,1, 3, 2, 1],

    adxl345_X_Data2  = [2, 3, 2, 3, 2.5],
    adxl345_Y_Data2  = [3 ,2, 2.3, 2.7, 1.3],

    /*  Wind Volecity Data */

    windData1 = [5, 7, 3, 8, 6],
    windData2 = [4, 2, 5, 7, 5],
    windData3 = [7, 6, 7, 7.5, 9]

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
    /* Pushing to ADXL Data 1  Body*/ 
    adxl345_X_Data1.push(data[0].ADXL345_1.X)
    adxl345_X_Data1.shift()
    adxl345_Y_Data1.push(data[0].ADXL345_1.Y)
    adxl345_Y_Data1.shift()
    /* Pushing to ADXL Data 2  Root*/
    adxl345_X_Data2.push(data[0].ADXL345_2.X)
    adxl345_X_Data2.shift()
    adxl345_Y_Data2.push(data[0].ADXL345_2.Y)
    adxl345_Y_Data2.shift()
}

/* Update Chart Data */
async function drawChart() {
    await MapDataPushFetch()
    await setLabels()
    myLineChart1.update()
    myLineChart2.update()
    myBarChart1.update()
    myBarChart2.update()
    myBarChart3.update()
    console.log('Charts Updated')
}

/* Set Hour labels */

var hours = [" ", " ", " ", " ", " ", " ", " "];
async function setLabels() {

    var nextIndex = hours.indexOf(myLineChart1.data.labels[myLineChart1.data.labels.length - 1]) + 1;
    var nextIndexName = hours[nextIndex] != undefined ? hours[nextIndex] : " ";

    myLineChart1.data.labels.push(nextIndexName)
    myLineChart1.data.labels.shift()

    myLineChart2.data.labels.push(nextIndexName)
    myLineChart2.data.labels.shift()

    myBarChart1.data.labels.push(nextIndexName)
    myBarChart1.data.labels.shift()

    myBarChart2.data.labels.push(nextIndexName)
    myBarChart2.data.labels.shift()

    myBarChart3.data.labels.push(nextIndexName)
    myBarChart3.data.labels.shift()

}


/* Continously update the chart */

setInterval(() => {
    drawChart()
}, 10000)


/* Chart selection */

var ctx1 = document.getElementById("myAreaChart1")
var ctx2 = document.getElementById("myBarChart1")
var ctx3 = document.getElementById("myAreaChart2")
var ctx4 = document.getElementById("myBarChart2")
var ctx5 = document.getElementById("myBarChart3")

/* Wind Data Chart */
var myLineChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [{
            label: "Vị trí cây 1",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216, 1)",
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
            pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
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
            pointHoverBackgroundColor: "rgba(0,255,0, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: windData3,
        }],
    },
    options: {
        scales: {
            x:{
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y:{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                },
                title: {
                    display: true,
                    text:'Giá trị'
                }
            },
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
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [{
            label: "Vị trí cây 1",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216, 1)",
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
            pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
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
            pointHoverBackgroundColor: "rgba(0,255,0, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: batteryData3,
        }],
    },
    options: {
        scales: {
            x:{
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y:{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                },
                title: {
                    display: true,
                    text:'Giá trị'
                }
            },
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
        labels: [" ", " ", " ", " ", " ", " ", " "],
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
            x:{
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y:{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                },
                title: {
                    display: true,
                    text:'Giá trị'
                }
            },
        },
        legend: {
            display: false
        }
    }
});


/* ADXL345_1 Data Chart */
var myBarChart2 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [{
            label: "X",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: adxl345_X_Data1,
        }, {
            label: "Y",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "red",
            pointRadius: 5,
            pointBackgroundColor: "red",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: adxl345_Y_Data1,
        }],
    },
    options: {
        scales: {
            x:{
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y:{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                },
                title: {
                    display: true,
                    text:'Giá trị'
                }
            },
        },
        legend: {
            display: false
        }
    }
});

/* ADXL345_2 Data Chart */
var myBarChart3 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [{
            label: "X",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "blue",
            pointRadius: 5,
            pointBackgroundColor: "blue",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: adxl345_X_Data2,
        }, {
            label: "Y",
            lineTension: 0.3,
            backgroundColor: "white",
            borderColor: "green",
            pointRadius: 5,
            pointBackgroundColor: "green",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0, 255, 0, 1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: adxl345_Y_Data2,
        }],
    },
    options: {
        scales: {
            x:{
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y:{
                ticks: {
                    min: 0,
                    max: 1000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                },
                title: {
                    display: true,
                    text:'Giá trị'
                }
            },
        },
        legend: {
            display: false
        }
    }
});