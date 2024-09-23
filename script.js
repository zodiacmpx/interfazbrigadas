// Datos de ejemplo para las brigadas en Chile
const brigades = [
    // Brigadas en Valdivia
    {
        id: 1,
        name: "Brigada Valdivia 1",
        coords: [-39.8196, -73.2452],
        speed: 55,
        kpi: 92,
        kpiHistory: [88, 90, 91, 92, 92],
        path: [
            [-39.8196, -73.2452],
            [-39.8296, -73.2552],
            [-39.8396, -73.2652],
            [-39.8496, -73.2752],
            [-39.8596, -73.2852]
        ]
    },
    {
        id: 2,
        name: "Brigada Valdivia 2",
        coords: [-39.8142, -73.2451],
        speed: 60,
        kpi: 89,
        kpiHistory: [85, 86, 88, 89, 89],
        path: [
            [-39.8142, -73.2451],
            [-39.8242, -73.2551],
            [-39.8342, -73.2651],
            [-39.8442, -73.2751],
            [-39.8542, -73.2851]
        ]
    },
    {
        id: 3,
        name: "Brigada Valdivia 3",
        coords: [-39.8088, -73.2450],
        speed: 58,
        kpi: 95,
        kpiHistory: [90, 92, 94, 95, 95],
        path: [
            [-39.8088, -73.2450],
            [-39.8188, -73.2550],
            [-39.8288, -73.2650],
            [-39.8388, -73.2750],
            [-39.8488, -73.2850]
        ]
    },
    // Brigadas en Osorno
    {
        id: 4,
        name: "Brigada Osorno 1",
        coords: [-40.5741, -73.1144],
        speed: 52,
        kpi: 88,
        kpiHistory: [82, 84, 86, 87, 88],
        path: [
            [-40.5741, -73.1144],
            [-40.5841, -73.1244],
            [-40.5941, -73.1344],
            [-40.6041, -73.1444],
            [-40.6141, -73.1544]
        ]
    },
    {
        id: 5,
        name: "Brigada Osorno 2",
        coords: [-40.5690, -73.1120],
        speed: 57,
        kpi: 90,
        kpiHistory: [85, 87, 88, 89, 90],
        path: [
            [-40.5690, -73.1120],
            [-40.5790, -73.1220],
            [-40.5890, -73.1320],
            [-40.5990, -73.1420],
            [-40.6090, -73.1520]
        ]
    },
    {
        id: 6,
        name: "Brigada Osorno 3",
        coords: [-40.5639, -73.1096],
        speed: 54,
        kpi: 87,
        kpiHistory: [80, 82, 84, 86, 87],
        path: [
            [-40.5639, -73.1096],
            [-40.5739, -73.1196],
            [-40.5839, -73.1296],
            [-40.5939, -73.1396],
            [-40.6039, -73.1496]
        ]
    },
    // Brigadas en Puerto Montt
    {
        id: 7,
        name: "Brigada Puerto Montt 1",
        coords: [-41.4689, -72.9411],
        speed: 59,
        kpi: 91,
        kpiHistory: [86, 88, 89, 90, 91],
        path: [
            [-41.4689, -72.9411],
            [-41.4789, -72.9511],
            [-41.4889, -72.9611],
            [-41.4989, -72.9711],
            [-41.5089, -72.9811]
        ]
    },
    {
        id: 8,
        name: "Brigada Puerto Montt 2",
        coords: [-41.4638, -72.9387],
        speed: 56,
        kpi: 89,
        kpiHistory: [83, 85, 87, 88, 89],
        path: [
            [-41.4638, -72.9387],
            [-41.4738, -72.9487],
            [-41.4838, -72.9587],
            [-41.4938, -72.9687],
            [-41.5038, -72.9787]
        ]
    },
    {
        id: 9,
        name: "Brigada Puerto Montt 3",
        coords: [-41.4587, -72.9363],
        speed: 61,
        kpi: 93,
        kpiHistory: [88, 90, 91, 92, 93],
        path: [
            [-41.4587, -72.9363],
            [-41.4687, -72.9463],
            [-41.4787, -72.9563],
            [-41.4887, -72.9663],
            [-41.4987, -72.9763]
        ]
    },
];

// Inicializar el mapa centrado en la zona sur de Chile
const map = L.map('map').setView([-40.5, -73.0], 7);

// Añadir capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Referencia para los marcadores de brigadas en el mapa
const brigadeMarkers = {};

// Función para agregar brigada al mapa
function addBrigadeToMap(brigade) {
    const customIcon = L.icon({
        iconUrl: 'https://img.icons8.com/emoji/48/000000/electric-plug-emoji.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const marker = L.marker(brigade.coords, { icon: customIcon }).addTo(map);

    // Agregar indicadores al marcador
    const popupContent = `
        <strong>${brigade.name}</strong><br>
        Velocidad: ${brigade.speed} km/h<br>
        KPI: ${brigade.kpi}%
    `;
    marker.bindPopup(popupContent);

    // Almacenar el marcador para futuras referencias
    brigadeMarkers[brigade.id] = marker;

    // Evento al hacer clic en el marcador
    marker.on('click', function () {
        showDetails(brigade);
    });

    // Simular movimiento en tiempo real
    let index = 0;
    setInterval(() => {
        if (index < brigade.path.length) {
            marker.setLatLng(brigade.path[index]);
            index++;
        } else {
            index = 0; // Reiniciar para que se repita
        }
    }, 2000); // Actualiza cada 2 segundos
}

// Función para agregar brigada desde la lista
function addBrigade(id) {
    const brigade = brigades.find(b => b.id === id);
    if (brigade) {
        addBrigadeToMap(brigade);
    }
}

// Cargar lista de brigadas
function loadBrigadeList() {
    const listElement = document.getElementById('brigade-list');
    brigades.forEach(brigade => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = brigade.name;

        const addButton = document.createElement('button');
        addButton.textContent = "Agregar";
        addButton.className = "btn btn-primary btn-sm";
        addButton.onclick = () => addBrigade(brigade.id);

        listItem.appendChild(nameSpan);
        listItem.appendChild(addButton);
        listElement.appendChild(listItem);
    });
}

// Mostrar detalles de la brigada
function showDetails(brigade) {
    document.getElementById('brigade-name').textContent = brigade.name;
    document.getElementById('brigade-speed').textContent = brigade.speed + ' km/h';
    document.getElementById('brigade-kpi').textContent = brigade.kpi + '%';

    // Mostrar el panel de detalles
    document.getElementById('details-panel').style.display = 'block';

    // Crear gráfico de KPI
    createKpiChart(brigade.kpiHistory);

    // Mostrar desplazamiento
    const path = L.polyline(brigade.path, { color: 'blue' }).addTo(map);
    // Zoom al área del desplazamiento
    map.fitBounds(path.getBounds());
}

// Crear gráfico de KPI
function createKpiChart(data) {
    const ctx = document.getElementById('kpi-chart').getContext('2d');
    // Destruir el gráfico anterior si existe
    if (window.kpiChart) {
        window.kpiChart.destroy();
    }
    window.kpiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
            datasets: [{
                label: 'KPI',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointRadius: 3,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Filtrar brigadas
function filterBrigades() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const listItems = document.querySelectorAll('#brigade-list .list-group-item');
    listItems.forEach(item => {
        const brigadeName = item.firstChild.textContent.toLowerCase();
        if (brigadeName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Evento de búsqueda
document.getElementById('search-input').addEventListener('input', filterBrigades);

// Inicializar la aplicación
loadBrigadeList();
