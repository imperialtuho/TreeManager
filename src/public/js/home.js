//Create new Varible for reusing scope
var nodeName, status, x, y, z, description, hud, temp, wind, lat, lon

//Customize Icon
var treeIcon = L.icon({
    iconUrl: '/images/tree.png',
    iconSize: [30, 30]
})
var warningTree = L.icon({
    iconUrl: '/images/alert.png',
    iconSize: [30, 30]
})

var endangeredTree = L.icon({
    iconUrl: '/images/alarm.png',
    iconSize: [30, 30]
})


/* Create map view */
var defaultCoordinate = [10.031517, 105.767851] // Default Coordiante, B1 CTU CAN THO [10.031517, 105.767851] [Lat, Long]

var map = L.map('map', {
    minZoom: 7,
    maxZoom: 19
}).setView(defaultCoordinate, 7)

var marker = L.marker([10.031517, 105.767851], {}).addTo(map)

marker.bindPopup('Vị trí mặt định tại B1 CTU')
marker.openPopup()

var popup = L.popup();

//layer tile set
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 30, // Max Zoom
}).addTo(map);


//[GET] data from api
async function MapDataFetch() {
    const response = await fetch("/api")
    const data = await response.json()

    for (item of data) {

        nodeName = item.Name //ID
        status = item.Status //Status
        x = item.ADXL345.X //X
        y = item.ADXL345.Y //Y
        z = item.ADXL345.Z //Z
        description = item.Description //Description
        hud = item.Hud //Hudmidity
        temp = item.Temp //Temparature
        wind = item.Wind //Wind
        lat = item.Coordinate.Latitude //Latitude
        lon = item.Coordinate.Longitude //Longitude

        // Check status for the map icon popup

        if (status === "Good") {
            status = "An toàn"
            marker = L.marker([lat, lon], {
                icon: treeIcon
            }).addTo(map)
        } else if (status === "Moderate") {
            status = "Trung bình"
            marker = L.marker([lat, lon], {
                icon: warningTree
            }).addTo(map)
        } else {
            status = "Nguy hiểm"
            marker = L.marker([lat, lon], {
                icon: endangeredTree
            }).addTo(map)
        }

        // console.log(`${name} ,${status} ,${x} ,${y} ,${z} ,${description} ,${hud} ,${temp} ,${wind} , ${lat} , ${lon} `)

        //Make Popup contents here
        marker.bindPopup(`

            ID: ${nodeName}<br>
            Chú thích: ${description}<br>
            Tọa độ: Lat: ${lat}, Long: ${lon}<br>
            Độ ẩm: ${hud} %<br>
            Nhiệt độ: ${temp} &deg;C<br>
            Gió: ${wind} km/h<br>
            ADXL345: &nbsp; X: ${x} &nbsp; Y: ${y} &nbsp; Z: ${z}<br>
            Trạng thái: ${status}

            `).addTo(map);
    }

}

/* Search Function */

async function SearchDataFetch() {

    const response = await fetch("/api")
    const data = await response.json()

    var data_length = [] //For storing MongoDB object length
    var queryNumber, nodeData

    //Store the object length for comparation
    for (i = 0; i < Object.keys(data).length; i++) {
        data_length.push(`${i+1}`)
    }
    //GET number on url ?q=
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Data_type = urlParams.get('q')

    //Check the Data_type of the query in the length || null ?
    if (data_length.includes(Data_type) || Data_type == null) {
        queryNumber = Data_type
        console.log(`ID ${Data_type}`)
    } else {
        alert("Not found")
        queryNumber = '-1'
    }

    parseInt(queryNumber) //Convert to Num
    queryNumber--
    nodeData = data[queryNumber] //[GET] nodeData at query position
    //Set view to the Node position
    map.setView([nodeData.Coordinate.Latitude, nodeData.Coordinate.Longitude], 15)

}
SearchDataFetch()

/* RUN ENV*/
setInterval(() => {
    MapDataFetch()
    console.log("Map updated!")
}, 3000)