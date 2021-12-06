/* Data variable */
var x, y, z, hud, temp, wind,

    /* Battery Data */

    batteryData1 = [0, 0, 0, 0, 0],
    batteryData2 = [0, 0, 0, 0, 0],
    batteryData3 = [0, 0, 0, 0, 0],

    /* Hudmidity Data */

    hudmidityData1 = [0, 0, 0, 0, 0],
    hudmidityData2 = [0, 0, 0, 0, 0],
    hudmidityData3 = [0, 0, 0, 0, 0],

    /* ADXL345 Data */

    adxl345_Z1_Data1 = [0, 0, 0, 0, 0],
    adxl345_Z1_Data2 = [0, 0, 0, 0, 0],
    adxl345_Z1_Data3 = [0, 0, 0, 0, 0],

    adxl345_Z2_Data1 = [0, 0, 0, 0, 0],
    adxl345_Z2_Data2 = [0, 0, 0, 0, 0],
    adxl345_Z2_Data3 = [0, 0, 0, 0, 0],

    /*  Wind Volecity Data */

    windData1 = [0, 0, 0, 0, 0],
    windData2 = [0, 0, 0, 0, 0],
    windData3 = [0, 0, 0, 0, 0]

function handleDegree(a) {
    const d = 90
    var x, z
    x = Math.abs(parseFloat(a))
    z = d - x
    return z
}

async function MapDataPushFetch() {
    const response = await fetch("/api")
    const data = await response.json()
    if (data.length >= 1) {
        NodeData = data.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        if (NodeData.length === 1) {
            Z_body1 = NodeData[0].ADXL345_1.Z //Tree Body 1
            Z_root1 = NodeData[0].ADXL345_2.Z //Tree Root 1
            /* Pushing to Battery Data */
            batteryData1.push(NodeData[0].Pin) /*Data 1*/
            batteryData1.shift()

            batteryData2.push(0) /*Data 2*/
            batteryData2.shift()

            batteryData3.push(0) /*Data 3*/
            batteryData3.shift()
            /* Pushing to Hudmidity Data */
            hudmidityData1.push(NodeData[0].Do_am) /*Data 1*/
            hudmidityData1.shift()

            hudmidityData2.push(0) /*Data 2*/
            hudmidityData2.shift()

            hudmidityData3.push(0) /*Data 3*/
            hudmidityData3.shift()
            /* Pushing to Wind Data */
            windData1.push(NodeData[0].Gio) /*Data 1*/
            windData1.shift()

            windData2.push(0) /*Data 2*/
            windData2.shift()

            windData3.push(0) /*Data 3*/
            windData3.shift()

            /* Pushing to ADXL_1 Data 1  Body 1st*/
            adxl345_Z1_Data1.push(handleDegree(Z_body1))
            adxl345_Z1_Data1.shift()
            /* Pushing to ADXL_1 Data 2  Body 2nd*/
            adxl345_Z1_Data2.push(0)
            adxl345_Z1_Data2.shift()
            /* Pushing to ADXL_1 Data 3  Body 3rd*/
            adxl345_Z1_Data3.push(0)
            adxl345_Z1_Data3.shift()
            /*   //////////////////////////////////////////////  */
            /* Pushing to ADXL_2 Data 1  Root 1st*/
            adxl345_Z2_Data1.push(handleDegree(Z_root1))
            adxl345_Z2_Data1.shift()

            /* Pushing to ADXL_2 Data 2  Root 2nd*/
            adxl345_Z2_Data2.push(0)
            adxl345_Z2_Data2.shift()
            /* Pushing to ADXL_2 Data 3  Root 3rd*/
            adxl345_Z2_Data3.push(0)
            adxl345_Z2_Data3.shift()


        } else if (NodeData.length === 2) {
            Z_body1 = NodeData[0].ADXL345_1.Z //Tree Body 1
            Z_root1 = NodeData[0].ADXL345_2.Z //Tree Root 1
            Z_body2 = NodeData[1].ADXL345_1.Z //Tree Body 2
            Z_root2 = NodeData[1].ADXL345_2.Z //Tree Root 2
            /* Pushing to Battery Data */
            batteryData1.push(NodeData[0].Pin) /*Data 1*/
            batteryData1.shift()
            batteryData2.push(NodeData[1].Pin) /*Data 2*/
            batteryData2.shift()
            batteryData3.push(0) /*Data 3*/
            batteryData3.shift()
            /* Pushing to Hudmidity Data */
            hudmidityData1.push(NodeData[0].Do_am) /*Data 1*/
            hudmidityData1.shift()
            hudmidityData2.push(NodeData[1].Do_am) /*Data 2*/
            hudmidityData2.shift()
            hudmidityData3.push(0) /*Data 3*/
            hudmidityData3.shift()
            /* Pushing to Wind Data */
            windData1.push(NodeData[0].Gio) /*Data 1*/
            windData1.shift()
            windData2.push(NodeData[1].Gio) /*Data 2*/
            windData2.shift()
            windData3.push(0) /*Data 3*/
            windData3.shift()

            /* Pushing to ADXL_1 Data 1  Body 1st*/
            adxl345_Z1_Data1.push(handleDegree(Z_body1))
            adxl345_Z1_Data1.shift()
            /* Pushing to ADXL_1 Data 2  Body 2nd*/
            adxl345_Z1_Data2.push(handleDegree(Z_body2))
            adxl345_Z1_Data2.shift()
            /* Pushing to ADXL_1 Data 3  Body 3rd*/
            adxl345_Z1_Data3.push(0)
            adxl345_Z1_Data3.shift()
            /*   //////////////////////////////////////////////  */
            /* Pushing to ADXL_2 Data 1  Root 1st*/
            adxl345_Z2_Data1.push(handleDegree(Z_root1))
            adxl345_Z2_Data1.shift()

            /* Pushing to ADXL_2 Data 2  Root 2nd*/
            adxl345_Z2_Data2.push(handleDegree(Z_root2))
            adxl345_Z2_Data2.shift()
            /* Pushing to ADXL_2 Data 3  Root 3rd*/
            adxl345_Z2_Data3.push(0)
            adxl345_Z2_Data3.shift()

        } else {
            Z_body1 = NodeData[0].ADXL345_1.Z //Tree Body 1
            Z_root1 = NodeData[0].ADXL345_2.Z //Tree Root 1
            Z_body2 = NodeData[1].ADXL345_1.Z //Tree Body 2
            Z_root2 = NodeData[1].ADXL345_2.Z //Tree Root 2
            Z_body3 = NodeData[2].ADXL345_1.Z //Tree Body 3
            Z_root3 = NodeData[2].ADXL345_2.Z //Tree Root 3
            /* Pushing to Battery Data */
            batteryData1.push(NodeData[0].Pin) /*Data 1*/
            batteryData1.shift()
            batteryData2.push(NodeData[1].Pin) /*Data 2*/
            batteryData2.shift()
            batteryData3.push(NodeData[2].Pin) /*Data 3*/
            batteryData3.shift()
            /* Pushing to Hudmidity Data */
            hudmidityData1.push(NodeData[0].Do_am) /*Data 1*/
            hudmidityData1.shift()
            hudmidityData2.push(NodeData[1].Do_am) /*Data 2*/
            hudmidityData2.shift()
            hudmidityData3.push(NodeData[2].Do_am) /*Data 3*/
            hudmidityData3.shift()
            /* Pushing to Wind Data */
            windData1.push(NodeData[0].Gio) /*Data 1*/
            windData1.shift()
            windData2.push(NodeData[1].Gio) /*Data 2*/
            windData2.shift()
            windData3.push(NodeData[2].Gio) /*Data 3*/
            windData3.shift()
            /* Pushing to ADXL_1 Data 1  Body 1st*/
            adxl345_Z1_Data1.push(handleDegree(Z_body1))
            adxl345_Z1_Data1.shift()
            /* Pushing to ADXL_1 Data 2  Body 2nd*/
            adxl345_Z1_Data2.push(handleDegree(Z_body2))
            adxl345_Z1_Data2.shift()
            /* Pushing to ADXL_1 Data 3  Body 3rd*/
            adxl345_Z1_Data3.push(handleDegree(Z_body3))
            adxl345_Z1_Data3.shift()
            /*   //////////////////////////////////////////////  */
            /* Pushing to ADXL_2 Data 1  Root 1st*/
            adxl345_Z2_Data1.push(handleDegree(Z_root1))
            adxl345_Z2_Data1.shift()

            /* Pushing to ADXL_2 Data 2  Root 2nd*/
            adxl345_Z2_Data2.push(handleDegree(Z_root2))
            adxl345_Z2_Data2.shift()
            /* Pushing to ADXL_2 Data 3  Root 3rd*/
            adxl345_Z2_Data3.push(handleDegree(Z_root3))
            adxl345_Z2_Data3.shift()
        }

    } else {
        /* Pushing to Battery Data */
        batteryData1.push(0) /*Data 1*/
        batteryData1.shift()

        batteryData2.push(0) /*Data 2*/
        batteryData2.shift()

        batteryData3.push(0) /*Data 3*/
        batteryData3.shift()

        /* Pushing to Hudmidity Data */
        hudmidityData1.push(0) /*Data 1*/
        hudmidityData1.shift()

        hudmidityData2.push(0) /*Data 2*/
        hudmidityData2.shift()

        hudmidityData3.push(0) /*Data 3*/
        hudmidityData3.shift()

        /* Pushing to Wind Data */
        windData1.push(0) /*Data 1*/
        windData1.shift()

        windData2.push(0) /*Data 2*/
        windData2.shift()

        windData3.push(0) /*Data 3*/
        windData3.shift()
        /* Pushing to ADXL_1 Data 1  Body 1st*/
        adxl345_Z1_Data1.push(0)
        adxl345_Z1_Data1.shift()
        /* Pushing to ADXL_1 Data 2  Body 2nd*/
        adxl345_Z1_Data2.push(0)
        adxl345_Z1_Data2.shift()
        /* Pushing to ADXL_1 Data 3  Body 3rd*/
        adxl345_Z1_Data3.push(0)
        adxl345_Z1_Data3.shift()

        /*   //////////////////////////////////////////////  */

        /* Pushing to ADXL_2 Data 1  Root 1st*/
        adxl345_Z2_Data1.push(0)
        adxl345_Z2_Data1.shift()
        /* Pushing to ADXL_2 Data 2  Root 2nd*/
        adxl345_Z2_Data2.push(0)
        adxl345_Z2_Data2.shift()
        /* Pushing to ADXL_2 Data 3  Root 3rd*/
        adxl345_Z2_Data3.push(0)
        adxl345_Z2_Data3.shift()
    }

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
            x: {
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y: {
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
                    text: 'Giá trị'
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
            x: {
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y: {
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
                    text: 'Giá trị'
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
        datasets: [{
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
            x: {
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y: {
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
                    text: 'Giá trị'
                }
            },
        },
        legend: {
            display: false
        }
    }
});

/* ADXL345_1 Body Data Chart */
var myBarChart2 = new Chart(ctx4, {
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
            data: adxl345_Z1_Data1,
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
            data: adxl345_Z1_Data2,
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
            data: adxl345_Z1_Data3,
        }],
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y: {
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
                    text: 'Giá trị'
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
            data: adxl345_Z2_Data1,
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
            data: adxl345_Z2_Data2,
        }, {
            label: "Vị trí cây 3",
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
            data: adxl345_Z2_Data3,
        }],
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thời Gian'
                }
            },
            y: {
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
                    text: 'Giá trị'
                }
            },
        },
        legend: {
            display: false
        }
    }
});