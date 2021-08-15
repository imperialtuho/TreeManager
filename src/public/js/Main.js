/* Icons */
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

/* Map Init || Khởi tạo Map */
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    latlng = L.latLng(10.031517, 105.767851); /*10.031517, 105.767851 vị trí tại B1 CTU */

var map = L.map('map', {
    center: latlng,
    maxZoom: 20,
    minZoom: 4,
    zoom: 7,
    layers: [tiles]
});

var markers = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 650,
    spiderfyOnMaxZoom: false
});

/* GET Current Position || Lấy vị trí hiện tại của thiết bị truy cập web */
if ('geolocation' in navigator) {
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(position => {
        var defX, defY
        defX = position.coords.latitude
        defY = position.coords.longitude
        var marker = L.marker([defX, defY])
        marker.addTo(map)
        marker.bindPopup(`Vị trí hiện tại của bạn`, {}) // lat: ${defX.toFixed(3)} long: ${defY.toFixed(3)}
        marker.openPopup()
    })
} else {
    console.log('geolocation not available')
}

//[GET] data from api || Lấy dữ liệu từ API
async function MapDataFetch() {
    const response = await fetch("/api")
    const data = await response.json()
    for (item of data) {
        nodeName = item.Name //ID
        stat = item.Status //Status                     || Trạng thái
        x = item.ADXL345.X //X
        y = item.ADXL345.Y //Y
        z = item.ADXL345.Z //Z
        description = item.Description //Description    || Chú thích
        hud = item.Hud //Hudmidity                      || Độ ẩm
        temp = item.Temp //Temparature                  || Nhiệt độ
        wind = item.Wind //Wind                         || Gió
        lat = item.Coordinate.Latitude //Latitude       || Vĩ độ
        lon = item.Coordinate.Longitude //Longitude     || Kinh độ

        // Check status for the map icon popup || Kiểm tra trạng thái để sửa đổi Icon
        if (stat === "Good") {
            stat = "An toàn"
            var marker = L.marker([lat, lon], {
                icon: treeIcon
            })
            markers.addLayer(marker)
            map.addLayer(markers)
        } else if (stat === "Moderate") {
            stat = "Có nguy cơ"
            var marker = L.marker([lat, lon], {
                icon: warningTree
            })
            markers.addLayer(marker)
            map.addLayer(markers)
        } else {
            stat = "Nguy hiểm"
            var marker = L.marker([lat, lon], {
                icon: endangeredTree
            })
            markers.addLayer(marker)
            map.addLayer(markers)
        }

        //Make Popup contents here || Tạo nội dung cho Popup
        marker.bindPopup(`

            ID: ${nodeName}<br>
            Chú thích: ${description}<br>
            Tọa độ: Lat: ${lat}, Long: ${lon}<br>
            Độ ẩm: ${hud} %<br>
            Nhiệt độ: ${temp} &deg;C<br>
            Gió: ${wind} km/h<br>
            ADXL345: &nbsp; X: ${x} &nbsp; Y: ${y} &nbsp; Z: ${z}<br>
            Trạng thái: ${stat}

            `);

    }

}

/* Search Function || Hàm tìm kiếm vị trí  */
async function SearchDataFetch() {

    const response = await fetch("/api")
    const data = await response.json()
    var data_length = [] //For storing MongoDB object length || Trữ độ dài các đối tượng trong tệp JSON từ MongoDB
    var queryNumber, nodeData

    //Store the object length for comparation || Lưu độ dài của đối tượng trong tệp JSON
    for (i = 0; i < Object.keys(data).length; i++) {
        data_length.push(`${i+1}`)
    }
    //GET number on url ?q= || Lấy số trên thanh url ?q=
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Data_type = urlParams.get('q')

    //Check the Data_type of the query in the length || null ? || Kiểm tra truy vấn q có nằm trong độ dài của đối tượng tệp JSON hay không?
    if (data_length.includes(Data_type) || Data_type == null) {
        queryNumber = Data_type
        console.log(`ID ${Data_type}`)
    } else {
        alert("Not found")
        queryNumber = '-1'
    }

    parseInt(queryNumber) //Convert to Num || chuyển đổi sang số kiểu int
    queryNumber--
    nodeData = data[queryNumber] //[GET] nodeData at query position || Lấy dữ liệu tại điểm truy vấn q
    map.setView([nodeData.Coordinate.Latitude, nodeData.Coordinate.Longitude], 15) //Set view to the Node position || Đặt chế độ xem tại vị trí tìm kiếm được

}
MapDataFetch()
SearchDataFetch()

/* Loop for every 5s || Khởi tạo hàm lập và gọi lại hàm mỗi sau 5 giây */
setInterval(() => {
    MapDataFetch()
    console.log("Map updated!")
    markers.clearLayers()
}, 5000)