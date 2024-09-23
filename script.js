// Datos de ejemplo para las brigadas
const brigades = [
    {
        id: 1,
        name: "Brigada 1",
        coords: [40.416775, -3.703790], // Madrid
        speed: "60 km/h",
        kpi: "90%",
        path: [
            [40.416775, -3.703790],
            [40.416775, -3.803790],
            [40.516775, -3.803790]
        ]
    },
    {
        id: 2,
        name: "Brigada 2",
        coords: [41.385064, 2.173404], // Barcelona
        speed: "50 km/h",
        kpi: "85%",
        path: [
            [41.385064, 2.173404],
            [41.385064, 2.273404],
            [41.485064, 2.273404]
        ]
    },
    // Puedes agregar más brigadas aquí
];

// Inicializar el mapa
const map = L.map('map').setView([40.416775, -3.703790], 6);

// Añadir capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Referencia para los marcadores de brigadas en el mapa
const brigadeMarkers = {};

// Función para agregar brigada al mapa
function addBrigadeToMap(brigade) {
    const marker = L.marker(brigade.coords).addTo(map);

    // Agregar indicadores al marcador
    const popupContent = `
        <strong>${brigade.name}</strong><br>
        Velocidad: ${brigade.speed}<br>
        KPI: ${brigade.kpi}
    `;
    marker.bindPopup(popupContent);

    // Almacenar el marcador para futuras referencias
    brigadeMarkers[brigade.id] = marker;

    // Evento al hacer clic en el marcador
    marker.on('click', function() {
        // Mostrar desplazamiento
        const path = L.polyline(brigade.path, { color: 'blue' }).addTo(map);
        // Zoom al área del desplazamiento
        map.fitBounds(path.getBounds());
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
        listItem.textContent = brigade.name;

        const addButton = document.createElement('button');
        addButton.textContent = "Agregar al mapa";
        addButton.className = "add-button";
        addButton.onclick = () => addBrigade(brigade.id);

        listItem.appendChild(addButton);
        listElement.appendChild(listItem);
    });
}

// Inicializar la aplicación
loadBrigadeList();
