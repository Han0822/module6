//1.create map
function createMap(){
    //create the map
     

    var map = L.map('map', {
        center: [40,100],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};





//Step 2: Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var years = processData(response);
            //call function to create proportional symbols
            createPropSymbols(response, map, years);
            //call function to create sequence control
            
           
        }
    });
};


//
function processData(data){
    //empty array to hold attributes
    var years = [];
    //properties of the first feature in the dataset
    var properties = data.features[0].properties;
    //push each attribute name into attributes array
    for (var year in properties){
        //only take attributes with population values
        if (year.indexOf("20") > -1){
            years.push(year);
        };
    };

    return years;
};

//Step 3: Add circle markers for point features to the map
//Add circle markers for point features to the map
var featureLayer = null;//mapbox featureLayer to add geojson
function createPropSymbols(data, map, years){
    //create a Leaflet GeoJSON layer and add it to the map
    // L.geoJson(data, {
    //     pointToLayer: function(feature, latlng) {
    //         map.featureLayer = pointToLayer(feature, latlng, years);
    //         return pointToLayer(feature, latlng, years);
    //     }
    // }).addTo(map);
    featureLayer = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return pointToLayer(feature, latlng, years);
    }
    }).addTo(map);
};

