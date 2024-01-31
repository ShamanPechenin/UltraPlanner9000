length_input = document.getElementById("length");
km_price_input = document.getElementById("price-per-km");
time_input = document.getElementById("time");
time_price_input = document.getElementById("price-per-h");

result_obj = document.getElementById("result");

route_obj = document.getElementById("route");
route_result_obj = document.getElementById("route-result");
cities = [];
cities_names = [];
cities_distances = {
"Liepāja": {
			"Liepāja": 0,
			"Ventspils": 117,
			"Rīga": 212,
			"Jelgava": 177,
			"Daugavpils": 424,
			"Valmiera": 317,
			"Dušanbe": 4962,
			"Gaiziņkalns": 349
			},
"Ventspils": {
			"Ventspils": 0,
			"Rīga": 184,
			"Jelgava": 172,
			"Daugavpils": 403,
			"Valmiera": 289,
			"Dušanbe": 4941,
			"Gaiziņkalns": 327
			},
"Rīga": {
			"Rīga": 0,
			"Jelgava": 46.6,
			"Daugavpils": 230,
			"Valmiera": 107,
			"Dušanbe": 4764,
			"Gaiziņkalns": 130
			},
"Jelgava": {
			"Jelgava": 0,
			"Daugavpils": 232,
			"Valmiera": 153,
			"Dušanbe": 4784,
			"Gaiziņkalns": 170
			},
"Daugavpils": {
			"Daugavpils": 0,
			"Valmiera": 243,
			"Dušanbe": 4609,
			"Gaiziņkalns": 146
			},
"Valmiera": {
			"Valmiera": 0,
			"Dušanbe": 4707,
			"Gaiziņkalns": 99.2
			},
"Dušanbe": {
			"Dušanbe": 0,
			"Gaiziņkalns": 4652
			},
"Gaiziņkalns": {
			"Gaiziņkalns": 0
			}
};

function roundToThree(num) {
    return +(Math.round(num + "e+3")  + "e-3");
}

function calculate_result(){
	let price = length_input.value*km_price_input.value + time_input.value*time_price_input.value;
	price = roundToThree(price);
	result_obj.innerText  = price;
}

function add_city(){
	let e = document.getElementById("add-city");
	let city = e.options[e.selectedIndex].value;
	cities.push(city)
	cities_names.push(e.options[e.selectedIndex].innerText)
	update_route();
}

function delete_city(id){
	cities.splice(id, 1);
	cities_names.splice(id, 1);
	update_route();
}

function update_route(){
	route_obj.innerHTML = "";
	let distance = 0;
	for (i = 0; i < cities.length; ++i) {
		console.log(i);
        let li = document.createElement('li');
        li.innerHTML = `${cities_names[i]} <input type="button" value="X" onclick="delete_city(${i})">`;
        route_obj.appendChild(li);
        if (i > 0){
            let dist = cities_distances[cities[i-1]][cities[i]];
            if (dist === undefined){dist = cities_distances[cities[i]][cities[i-1]]}
            distance += dist;
        }
    }
    route_result_obj.innerText  = distance;
    length_input.value = distance;
    calculate_result();
}
