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
    maxZoom: 19,
    minZoom: 7,
    zoom: 17,
    layers: [tiles]
});

var markers = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 30,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
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
        marker.bindPopup(`Vị trí IP truy cập hiện tại`, {}) // lat: ${defX.toFixed(3)} long: ${defY.toFixed(3)}
        marker.openPopup()
    })
} else {
    console.log('geolocation not available')
}

//LongLat Converter || Hàm chuyển đổi Vĩ độ & Kinh độ
function handleLongLat(a) {
    var x, y, z
    x = parseInt(a / 100)
    y = (a - x * 100) / 60
    z = (x + y).toFixed(5)
    return z
}

function handleDegree(a) {
    const d = 90
    var x, z
    x = Math.abs(parseFloat(a))
    z = d - x
    return z
}
var data, GeoData
//[GET] Data from API || Lấy dữ liệu từ API
async function MapDataFetch() {
    const response = await fetch("/api")
    const responseGeo = await fetch("/geoapi")
    data = await response.json()
    GeoData = await responseGeo.json()
    Options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    if (data.length < 1) {

        for (item of GeoData) {
            nodeName = item.id //ID  
            stat = item.Trang_thai //Status              || Trạng thái
            lat = handleLongLat(item.Toa_do[1]) //Latitude       || Vĩ độ
            lon = handleLongLat(item.Toa_do[0]) //Longitude     || Kinh độ
            latest = item.UpdateTime //Latest update || Lần cập nhật mới nhất
            var marker = L.marker([lat, lon], {
                icon: warningTree
            })
            markers.addLayer(marker)
            map.addLayer(markers)

            marker.bindPopup(`         
             ID: ${nodeName} <br>
             Chú thích: Vị trí nút cảm biến không còn hoạt động nữa <br>
             Tọa độ: Vĩ độ: ${lat}, Kinh độ: ${lon}<br>
             Độ ẩm: Không có thông tin<br>
             Pin: Không có thông tin<br>
             Gió: Không có thông tin<br>
             ADXL345 trên thân cây so với mặt đất: Không có thông tin<br>
             ADXL345 ở gốc cây so với mặt đất: Không có thông tin<br>
             Trạng thái: Không hoạt động <br>
             Thời gian hoạt động gần nhất: ${latest}
             `);
        }
    } else {

        for (item of data) {

            nodeName = item.id //ID  
            stat = item.Trang_thai //Status              || Trạng thái

            z1 = item.ADXL345_1.Z //Z1
            z2 = item.ADXL345_2.Z //Z2

            description = item.Mo_ta //Description       || Chú thích
            hud = item.Do_am //Hudmidity              || Độ ẩm
            bat = item.Pin //Battery                || Pin
            wind = item.Gio //Wind                   || Gió
            Geo = item.Toa_do
            latest = item.UpdateTime //Latest update || Lần cập nhật mới nhất
            if (Geo.length < 2) {
                console.log(`No [Lat,Long] info at ID: ${nodeName}`)
                continue
            } else {
                // Check status for the map icon popup || Kiểm tra trạng thái để sửa đổi Icon
                lat = handleLongLat(item.Toa_do[1]) //Latitude       || Vĩ độ
                lon = handleLongLat(item.Toa_do[0]) //Longitude     || Kinh độ
                wsp = parseFloat(wind)
                pwd = parseInt(bat)
                if ((stat != "0") || (wsp > 50) || (pwd <= 30)) {
                    stat = "Nguy hiểm"
                    var marker = L.marker([lat, lon], {
                        icon: endangeredTree
                    })
                    markers.addLayer(marker)
                    map.addLayer(markers)
                    fetch('/apidata', Options) //POST DATA BACK TO SERVER
                    alert(`Nguy hiểm tại cây số ${nodeName}`)
                    map.setView([lat, lon], 18)
                } else if ((wsp >= 25 && wsp <= 50) || (pwd > 30 && pwd < 50)) {
                    stat = "Có nguy cơ"
                    var marker = L.marker([lat, lon], {
                        icon: warningTree
                    })
                    markers.addLayer(marker)
                    map.addLayer(markers)
                } else {
                    stat = "An toàn"
                    var marker = L.marker([lat, lon], {
                        icon: treeIcon
                    })
                    markers.addLayer(marker)
                    map.addLayer(markers)
                }

                //Make Popup contents here || Tạo nội dung cho Popup
                marker.bindPopup(`
                    
                                ID: ${nodeName}<br>
                                Chú thích: ${description}<br>
                                Tọa độ: Vĩ độ: ${lat}, Kinh độ: ${lon}<br>
                                Độ ẩm: ${hud} %<br>
                                Pin: ${bat} %<br>
                                Gió: ${wind} km/h<br>
                                ADXL345 trên thân cây so với mặt đất: ${handleDegree(z1)}&deg;<br>
                                ADXL345 ở gốc cây so với mặt đất: ${handleDegree(z2)}&deg;<br>
                                Trạng thái: ${stat} <br>
                                Thời gian cập nhật gần nhất: ${latest}
                                
                                `);
            }


        }
    }

}

/* Search Function || Hàm tìm kiếm vị trí  */
var search = document.getElementById('search-box')
async function SearchDataFetch() {
    var Val = search.value
    if (data.length < 1) {
        const result = GeoData.find(({
            id
        }) => id === Val)
        if (result != null) {
            map.setView([handleLongLat(result.Toa_do[1]), handleLongLat(result.Toa_do[0])], 20) //Set view to the Node position || Đặt chế độ xem tại vị trí tìm kiếm được
        } else {
            alert(`Không tìm thấy id ${Val}`)
        }
    } else {
        const result = data.find(({
            id
        }) => id === Val)
        if (result != null) {
            map.setView([handleLongLat(result.Toa_do[1]), handleLongLat(result.Toa_do[0])], 20)
        } else {
            alert(`Không tìm thấy id ${Val}`)
        }
    }
}
MapDataFetch()
/* Loop for every 10s || Khởi tạo hàm lập và gọi lại hàm mỗi sau 10 giây */
setInterval(() => {
    MapDataFetch()
    console.log("Map updated!")
    markers.clearLayers()
}, 20000)