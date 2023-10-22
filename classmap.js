// Initialize the map
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.349726, lng: -71.099111 }, // Replace with the center coordinates of your campus
        zoom: 15
    });
}

// Define the coordinates of colleges and dorms
const collegeCoordinates = {
    CAS: { lat: 42.361145, lng: -71.057083 }, // Replace with CAS coordinates
    CDS: { lat: 42.3499, lng: -71.1032 }, // Replace with CDS coordinates
    CGS: { lat: 42.3514, lng: -71.1146 }, // Replace with CGS coordinates
    BUA: { lat: 42.3505, lng: -71.1054 },
    KHC: { lat: 42.3503, lng: -71.0970 },
    COM: { lat: 42.3489, lng: -71.1025 }, // Replace with CGS coordinates
    ENG: { lat: 42.3485, lng: -71.1030 },
    CFA: { lat: 42.3513, lng: -71.1139 },
    EOP: { lat: 42.361145, lng: -71.057083 },
    SHA: { lat: 42.3510, lng: -71.1174 },
    QST: { lat: 42.3496, lng: -71.0995 },
    //add more
};

const dormCoordinates = {
    Warren: { lat: 42.3495, lng: -71.1048 }, // Replace with Warren coordinates
    Tower: { lat: 42.3503, lng: -71.0998 }, // Replace with Tower coordinates
    Claflin: { lat: 42.3525, lng: -71.1198 }, // Replace with Claflin coordinates
    Sleeper: { lat: 42.3530, lng: -71.1206 }, // Replace with Sleeper coordinates
    Rich: { lat: 42.3535, lng: -71.1205 }, // Replace with Rich coordinates
};

// Calculate the distance between two sets of coordinates (in meters)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const rad = Math.PI / 180;
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const dLat = (lat2 - lat1) * rad;
    const dLng = (lng2 - lng1) * rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c * 1000; // Convert to meters

    return distance;
}

// Find the closest dorm to the selected college
document.getElementById("find-dorm-button").addEventListener("click", function () {
    const selectedCollege = document.getElementById("college-select").value;
    const collegeCoords = collegeCoordinates[selectedCollege];

    if (collegeCoords) {
        let closestDorm = null;
        let minDistance = Number.MAX_VALUE;

        for (const dormName in dormCoordinates) {
            const dormCoords = dormCoordinates[dormName];
            const distance = calculateDistance(collegeCoords.lat, collegeCoords.lng, dormCoords.lat, dormCoords.lng);

            if (distance < minDistance) {
                minDistance = distance;
                closestDorm = dormName;
            }
        }

        if (closestDorm) {
            // Display the closest dorm
            document.getElementById("dorm-address").textContent = `Closest Dorm: ${closestDorm}`;
        } else {
            document.getElementById("dorm-address").textContent = "No dorms found.";
        }
    } else {
        document.getElementById("dorm-address").textContent = "Invalid college selection.";
    }
});