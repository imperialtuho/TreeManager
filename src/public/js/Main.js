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
        marker.bindPopup(`Vị trí hiện tại của gateway`, {}) // lat: ${defX.toFixed(3)} long: ${defY.toFixed(3)}
        marker.openPopup()
    })
} else {
    console.log('geolocation not available')
}

//LongLat Converter || Hàm chuyển đổi Vĩ độ & Kinh độ
function handleLongLat(a){
    var x, y, z
    x = parseInt(a / 100)
    y = (a - x*100)/60
    z = (x + y).toFixed(5)
    return z
}

//[GET] Data from API || Lấy dữ liệu từ API
async function MapDataFetch() {
    const response = await fetch("/api")
    const data = await response.json()
    for (item of data) {
       
        nodeName = item.id //ID  
        stat = item.Trang_thai //Status              || Trạng thái
        
        x1 = item.ADXL345_1.X //X1
        y1 = item.ADXL345_1.Y //Y1
        z1 = item.ADXL345_1.Z //Z1
        
        x2 = item.ADXL345_2.X //X2
        y2 = item.ADXL345_2.Y //Y2
        z2 = item.ADXL345_2.Z //Z2
        
        description = item.Mo_ta //Description       || Chú thích
        hud = item.Do_am    //Hudmidity              || Độ ẩm
        bat = item.Pin      //Battery                || Pin
        wind = item.Gio     //Wind                   || Gió
        lat = handleLongLat(item.Toa_do[1]) //Latitude       || Vĩ độ
        lon = handleLongLat(item.Toa_do[0]) //Longitude     || Kinh độ
        latest = item.UpdateTime             //Latest update || Lần cập nhật mới nhất

        // Check status for the map icon popup || Kiểm tra trạng thái để sửa đổi Icon
        wsp = parseFloat(wind)
        if (stat != "Xanh" && wsp > 50) {
            stat = "Nguy hiểm"
            var marker = L.marker([lat, lon], {
                icon: endangeredTree
            })
            markers.addLayer(marker)
            map.addLayer(markers)
            alert(`Nguy hiểm tại cây số ${nodeName}`)
            map.setView([lat, lon], 18)
        }if (wsp >= 25 && wsp <= 50) {
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
            Độ ẩm: ${hud}%<br>
            Pin: ${bat}%<br>
            Gió: ${wind}km/h<br>
            ADXL345_Than: &nbsp; X: ${x1}&deg; &nbsp; Y: ${y1}&deg; &nbsp; Z: ${z1}&deg;<br>
            ADXL345_Goc: &nbsp; X: ${x2}&deg; &nbsp; Y: ${y2}&deg; &nbsp; Z: ${z2}&deg;<br>
            Trạng thái: ${stat} <br>
            Thời gian cập nhật: ${latest}
            
            `);

    }

}

/* Search Function || Hàm tìm kiếm vị trí  */
async function SearchDataFetch() {

    const response = await fetch("/api")
    const data = await response.json()
    var data_length = [] //For storing MongoDB object length || Trữ độ dài các đối tượng trong tệp JSON từ MongoDB
    var queryNumber, nodeData
    console.log(data[1])
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
        alert("Không tìm thấy!")
        queryNumber = '-1'
    }

    parseInt(queryNumber) //Convert to Num || chuyển đổi sang số kiểu int
    queryNumber--
    nodeData = data[queryNumber] //[GET] nodeData at query position || Lấy dữ liệu tại điểm truy vấn q
    map.setView([handleLongLat(nodeData.Toa_do[1]), handleLongLat(nodeData.Toa_do[0])], 20) //Set view to the Node position || Đặt chế độ xem tại vị trí tìm kiếm được

}
MapDataFetch()
SearchDataFetch()

/* Loop for every 5s || Khởi tạo hàm lập và gọi lại hàm mỗi sau 5 giây */
setInterval(() => {
    MapDataFetch()
    console.log("Map updated!")
    markers.clearLayers()
}, 10000)