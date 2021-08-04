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

// Create map
const map = L.map('map').setView([10.031517, 105.767851], 7) // Default Coordiante, B1 CTU CAN THO [10.031517, 105.767851] [Lat, Long]
var marker = L.marker([10.031517, 105.767851], {}).addTo(map)
marker.bindPopup('Vị trí mặt định tại B1 CTU')
marker.openPopup()

var popup = L.popup();


//layer tile set
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20, // Max Zoom
}).addTo(map);

//[GET] data from api
MapDataFetch()
async function MapDataFetch() {
    const response = await fetch("/api")
    const data = await response.json()
    console.log(data)

    for (item of data) {

        nodeName = item.Name
        status = item.Status
        x = item.ADXL345.X
        y = item.ADXL345.Y
        z = item.ADXL345.Z
        description = item.Description
        hud = item.Hud
        temp = item.Temp
        wind = item.Wind
        lat = item.Coordinate.Latitude
        lon = item.Coordinate.Longitude

        // Check status for map icon popup

        if (status === "Good") {
            status = "An toàn"
            marker = L.marker([lat, lon], {
                icon: treeIcon
            }).addTo(map)
        } else if (status === "Moderate") {
            status = "Có nguy cơ"
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

        //Make Popup content here
        marker.bindPopup(`

            ID: ${nodeName}<br>
            Chú thích: ${description}<br>
            Tọa độ: Lat: ${lat}, Long: ${lon}<br>
            Độ ẩm: ${hud} %<br>
            Nhiệt độ: ${temp} &deg;C<br>
            Gió: ${wind} km/h<br>
            ADXL345: &nbsp; X: ${x} &nbsp; Y: ${y} &nbsp; Z: ${z}<br>
            Trạng thái: ${status}

            `);
        //  marker.openPopup()
    }

}