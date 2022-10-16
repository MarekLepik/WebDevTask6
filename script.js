(function () {
  "use strict";

  //clock

  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");

    //setTimeout(updateClock, 2000);
    setInterval(updateClock, 1000);

    function updateClock() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      if (h < 13) {
        if (h < 10) {
          h = "0" + h;
        }

        if (m < 10) {
          m = "0" + m;
        }

        if (s < 10) {
          s = "0" + s;
        }

        c.innerHTML = h + ":" + m + ":" + s + "EL";
      } else {
        h -= 12;
        if (h < 10) {
          h = "0" + h;
        }

        if (m < 10) {
          m = "0" + m;
        }

        if (s < 10) {
          s = "0" + s;
        }

        c.innerHTML = h + ":" + m + ":" + s + "PL";
      }
    }
  });

  // forms

  document.getElementById("form").addEventListener("submit", estimateDelivery);

  let e = document.getElementById("delivery");
  e.innerHTML = "0,00 &euro;";

  function estimateDelivery(event) {
    event.preventDefault();
    let ees = document.getElementById("fname").value;
    let pere = document.getElementById("lname").value;
    const nimeArray = ees.split("");
    if (nimeArray.length == 0) {
      alert("sisestage nimi!");
    } else {
      nimeArray.map((e) => {
        console.log(e);
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        if (numbers.includes(e)) {
          alert("nimes ei tohi olla numbreid");
        }
      });
    }
    const pereArray = pere.split("");
    if (pereArray.length == 0) {
      alert("sisestage perekonnanimi!");
    } else {
      pereArray.map((e) => {
        console.log(e);
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        if (numbers.includes(e)) {
          alert("perekonnanimes ei tohi olla numbreid");
        }
      });
    }

    let linn = document.getElementById("linn");

    if (linn.value === "") {
      alert("Palun valige linn nimekirjast");

      linn.focus();

      return;
    } else {
      let present = document.getElementById("v1");
      let contactless = document.getElementById("v2");
      let kullerType = document.getElementById("eco");
      let tavaKuller = document.getElementById("tava");
      if (!kullerType.checked && !tavaKuller.checked) {
        alert("Palun valige kulleritüüp.");
      }
      let hind = 0;
      if (linn.value === "tln") {
        hind += 0;
      } else if (linn.value === "trt" || linn.value === "nrv") {
        hind += 2.5;
      } else if (linn.value === "prn") {
        hind += 5;
      }
      if (present.checked) {
        hind += 5;
      }
      if (contactless.checked) {
        hind += 1;
      }
      if (kullerType.value == "eco") {
        hind += 1;
      } else {
        hind += 0;
      }
      e.innerHTML = `${hind} &euro;`;
    }
    console.log("Tarne hind on arvutatud");
  }
})();

// map

let mapAPIKey =
  "Au2GFA6xtTZGsyFAkMwk0vs697aHdh0IinfVNS9bztsIqbwh9OFTZLorpcw34Xw1";

let map;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let loomaaed = new Microsoft.Maps.Location(59.4189, 24.66013);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 6,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

  let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
    id: "ylikool",
    title: "Tartu Ülikool",
    //subTitle: 'Hea koht',
    //text: 'UT'
  });
  let loomaaedPin = new Microsoft.Maps.Pushpin(loomaaed, {
    id: "loomaaed",
    title: "Tallinna Loomaaed",
  });
  var ylikooliInf = new Microsoft.Maps.Infobox(centerPoint, {
    title: "Tartu Ülikool",
    visible: false,
  });
  let loomaaedInf = new Microsoft.Maps.Infobox(loomaaed, {
    title: "Tallinna Loomaaed",
    visible: false,
  });

  ylikooliInf.setMap(map);
  loomaaedInf.setMap(map);

  Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
  Microsoft.Maps.Events.addHandler(loomaaedPin, "click", pushpinClicked);
  map.entities.push(pushpin);
  map.entities.push(loomaaedPin);
  function pushpinClicked(e) {
    if (e.target.id) {
      if (e.target.id == 10) {
        ylikooliInf.setOptions({
          visible: true,
        });
      } else if (e.target.id == 11) {
        loomaaedInf.setOptions({
          visible: true,
        });
      }
    }
  }
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
