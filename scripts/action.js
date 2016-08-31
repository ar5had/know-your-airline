var submitButton = document.querySelector("#searchBtn");

submitButton.addEventListener("click", function(){
  var req = new XMLHttpRequest();
  var url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBccWm4FglUUl0iTfVQkvZbnI5FOo69uhQ";

  var params ={
    "request": {
      "slice": [
        setTripData("forward")
      ],
      "passengers": setPassengersData(),
      "solutions": 2,
      "refundable": false
    }
  }
  // set round trip condition here
  console.log("roundtrip: ",$("#liRoundTrip").hasClass("active") );
  if ($("#liRoundTrip").hasClass("active")) {
    params.request.slice.push(setTripData("backward"));
  }

  console.log(params);
  //Some errors coming in date format
  // will resolve later...
  // check console for selection of elements of form.
  // req.open("POST", url, true);
  //
  // req.setRequestHeader("Content-type", "application/json");
  //
  // req.onload = function () {
  //   console.log(this.responseText);
  // };
  //
  // req.send(JSON.stringify(params));
});


function setTripData(type) {
  var trip = {
    "origin": "",
    "destination": "",
    "date": "",
    "preferredCabin": ""
  }
  var elem;
  if (type === "forward") {

    elem = document.querySelector("#txtFrom");
    trip.origin = elem.value.slice(elem.length - 3, elem.length);

    elem = document.querySelector("#txtTo");
    trip.destination = elem.value.slice(elem.length - 3, elem.length);

    elem = document.querySelector("#cabin");
    trip.preferredCabin = elem.options[elem.selectedIndex].value;

    elem = document.querySelector("#departDate");
    trip.date = parseDate(elem.value);

  } else {

      elem = document.querySelector("#txtTo");
      trip.origin = elem.value.slice(elem.length - 3, elem.length);

      elem = document.querySelector("#txtFrom");
      trip.destination = elem.value.slice(elem.length - 3, elem.length);

      elem = document.querySelector("#cabin");
      trip.preferredCabin = elem.options[elem.selectedIndex].value;

      elem = document.querySelector("#returnDate");
      trip.date = parseDate(elem.value);
  }
  return trip;
}

function setPassengersData() {
  var data = {
    "adultCount": 1,
    "infantInLapCount": 0,
    "infantInSeatCount": 0,
    "childCount": 0,
    "seniorCount": 0
  };

  var elem = document.querySelector("#adult");
  data.adultCount = parseInt(elem.options[elem.selectedIndex].value);

  elem = document.querySelector("#child");
  data.childCount = parseInt(elem.options[elem.selectedIndex].value);

  // counting infant in lap , not infant in seat count...
  // confirm changes !
  elem = document.querySelector("#infant");
  data.infantInLapCount = parseInt(elem.options[elem.selectedIndex].value);

  elem = document.querySelector("#adult");
  data.adultCount = parseInt(elem.options[elem.selectedIndex].value);

  return data;
}


function parseDate(date) {
  console.log(date.slice(6) + "-" + date.slice(0,2) + "-" + date.slice(3,5));
  return date.slice(6) + "-" + date.slice(0,2) + "-" + date.slice(3,5);
}
