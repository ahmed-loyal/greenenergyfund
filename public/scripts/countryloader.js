const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'cTlUUHVrZEl0ZmxoY2x0cTFoYzR3eEhwM2tMbHE0d0t6Q1JYdnJXSQ=='
}


var countrySelect = document.querySelector('input[name="country"]:checked');
var stateSelect = document.querySelector('.state');
var citySelect = document.querySelector('.city');

var headers = new Headers();
headers.append("X-CSCAPI-KEY", config.ckey);

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
    };


function loadCountries() {

    const apiEndPoint = config.cUrl

    fetch(apiEndPoint, requestOptions)
    .then(Response => Response.json())
    .then(data => {
        console.log(data);

        data.forEach(country => {

            if(countrySelect){
                countrySelect.value = country.iso2;
            }

            // const option = document.createElement('option')
            // option.value = country.iso2
            // option.textContent = country.name 
            // countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))

    stateSelect.disabled = true
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'none'
    citySelect.style.pointerEvents = 'none'
}


function loadStates() {
    stateSelect.disabled = false
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'auto'
    citySelect.style.pointerEvents = 'none'

    // console.log(selectedCountryCode);
    stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${countrySelect.value}/states`, requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateSelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'

    const selectedCountryCode = countrySelect.value
    const selectedStateCode = stateSelect.value
    // console.log(selectedCountryCode, selectedStateCode);

    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2
            option.textContent = city.name 
            citySelect.appendChild(option)
        })
    })
}

// window.onload = loadCountries;