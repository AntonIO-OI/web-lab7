const squareSize = 10;
let step = 1;
let event_number = 0;
let direction = "right";
const square = document.getElementById("square");
const anim = document.getElementById("anim");

let data1;
let data2;

fetchDataAndPopulateTable();

function startAnimation() {
  if (event_number === 0) {
    clearFile("event_data.json").then((number) => {
      // The code inside this block will execute after clearFile completes
      changeText("CLICK 'START'");

      event_number++;
      saveEventDataLocally(event_number, "CLICK 'START'");
      saveEventDataToServer(event_number, "CLICK 'START'");
    });
  } else {
    // If event_number is not 0, execute the code directly without waiting
    changeText("CLICK 'START'");

    event_number++;
    saveEventDataLocally(event_number, "CLICK 'START'");
    saveEventDataToServer(event_number, "CLICK 'START'");
  }

  document.getElementById("anim").style.display = "flex";
  document.getElementById("stopBtn").style.display = "block";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("table").style.display = "none";

  animationInterval = setInterval(moveSquare, 500);
}

function closeAnimation() {
  changeText("CLICK 'CLOSE'");
  // Show the work area
  clearInterval(animationInterval);
  document.getElementById("anim").style.display = "none";
  square.style.top = "50%";
  square.style.left = "50%";
  square.style.transform = "translate(-50%, -50%)";

  event_number++;
  saveEventDataToServer(event_number, "CLICK 'CLOSE'");
  saveEventDataLocally(event_number, "CLICK 'CLOSE'");
  sendAccumulatedDataToServer();
  event_number = 0;

  direction = "right";
  step = 1;

  document.getElementById("startBtn").style.display = "block";
  document.getElementById("closeBtn").style.display = "block";
  document.getElementById("stopBtn").style.display = "none";
  document.getElementById("reloadBtn").style.display = "none";
  document.getElementById("table").style.display = "block";

  fetchDataAndPopulateTable();
}

function stopAnimation() {
  changeText("CLICK 'STOP'");
  document.getElementById("stopBtn").style.display = "none";
  document.getElementById("startBtn").style.display = "block";

  event_number++;
  saveEventDataToServer(event_number, "CLICK 'STOP'");
  saveEventDataLocally(event_number, "CLICK 'STOP'");

  clearInterval(animationInterval);
}

function cancelAnimation() {
  changeText("ANIM 'END'");
  document.getElementById("stopBtn").style.display = "none";
  document.getElementById("reloadBtn").style.display = "block";

  event_number++;
  saveEventDataToServer(event_number, "ANIM 'END'");
  saveEventDataLocally(event_number, "ANIM 'END'");

  clearInterval(animationInterval);
}

function reloadAnimation() {
  changeText("ANIM 'RELOAD'");
  document.getElementById("reloadBtn").style.display = "none";
  document.getElementById("startBtn").style.display = "block";

  event_number++;
  saveEventDataToServer(event_number, "ANIM 'RELOAD'");
  saveEventDataLocally(event_number, "ANIM 'RELOAD'");

  square.style.top = "50%";
  square.style.left = "50%";
  square.style.transform = "translate(-50%, -50%)";
}

function changeText(text) {
  const blockElement = document.getElementById("label");
  blockElement.textContent = text;
}

function moveSquare() {
  const squareRect = square.getBoundingClientRect();
  const animRect = anim.getBoundingClientRect();

  const x = squareRect.left - animRect.left;
  const y = squareRect.top - animRect.top;

  const isHitWallRight = squareRect.right > animRect.right;
  const isHitWallBottom = squareRect.bottom > animRect.bottom;
  const isHitWallLeft = squareRect.left < animRect.left;
  const isHitWallTop = squareRect.top < animRect.top;
  if (isHitWallBottom || isHitWallLeft || isHitWallRight || isHitWallTop) {
    changeText("HIT WALL");
    event_number++;
    saveEventDataToServer(event_number, "HIT WALL");
    saveEventDataLocally(event_number, "HIT WALL");
  }

  const isOutsideRight = squareRect.right - squareSize > animRect.right;
  const isOutsideBottom = squareRect.bottom - squareSize > animRect.bottom;
  const isOutsideLeft = squareRect.left + squareSize < animRect.left;
  const isOutsideTop = squareRect.top + squareSize < animRect.top;

  if (isOutsideBottom || isOutsideLeft || isOutsideRight || isOutsideTop) {
    direction = "right";
    step = 1;
    cancelAnimation();
  }

  switch (direction) {
    case "right":
      changeText("RIGHT");
      event_number++;
      saveEventDataToServer(event_number, "RIGHT");
      saveEventDataLocally(event_number, "RIGHT");
      square.style.left = `${x + step + squareSize / 2}px`;
      direction = "down";
      step += 5;
      // step++;
      break;

    case "down":
      changeText("DOWN");
      event_number++;
      saveEventDataToServer(event_number, "DOWN");
      saveEventDataLocally(event_number, "DOWN");
      square.style.top = `${y + step + squareSize / 2}px`;
      direction = "left";
      step += 5;
      // step++;
      break;

    case "left":
      changeText("LEFT");
      event_number++;
      saveEventDataToServer(event_number, "LEFT");
      saveEventDataLocally(event_number, "LEFT");
      square.style.left = `${x - step + squareSize / 2}px`;
      direction = "up";
      step += 5;
      // step++;
      break;

    case "up":
      changeText("UP");
      event_number++;
      saveEventDataToServer(event_number, "UP");
      saveEventDataLocally(event_number, "UP");
      square.style.top = `${y - step + squareSize / 2}px`;
      direction = "right";
      // step++;
      step += 5;
      break;
  }

  if (isHitWallBottom || isHitWallLeft || isHitWallRight || isHitWallTop) {
    changeText("HIT WALL");
  }

  const isOutsideRight1 = squareRect.right - squareSize > animRect.right;
  const isOutsideBottom1 = squareRect.bottom - squareSize > animRect.bottom;
  const isOutsideLeft1 = squareRect.left + squareSize < animRect.left;
  const isOutsideTop1 = squareRect.top + squareSize < animRect.top;

  if (isOutsideBottom1 || isOutsideLeft1 || isOutsideRight1 || isOutsideTop1) {
    changeText("ANIM END");
    cancelAnimation();
  }
}

function saveEventDataLocally(eventNumber, message) {
  const time = new Date().toISOString();

  const eventData = {
    'eventNumber': eventNumber,
    'time': time,
    'message': message
  };

  const localEvents = JSON.parse(localStorage.getItem('localEvents')) || [];

  localEvents.push(eventData);
  localStorage.setItem('localEvents', JSON.stringify(localEvents));
}

function sendAccumulatedDataToServer() {
  const localEvents = JSON.parse(localStorage.getItem('localEvents')) || [];

  console.log(localEvents);

  if (localEvents.length > 0) {
    fetch("save_event2.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localEvents),
    })
        .then((data) => {
          console.log("Data saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    localStorage.removeItem('localEvents');
  }
}

function saveEventDataToServer(eventNumber, message) {
  const time = new Date().toISOString();

  const data = {
    eventNumber: eventNumber,
    time: time,
    message: message
  };

  fetch("save_event1.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log("Data saved successfully:", data);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
}


function getData1() {
  // Append the filename as a query parameter
  const url = `get_data.php?filename=event_data.json`;

  return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
}

function getData2() {
  // Append the filename as a query parameter
  const url = `get_data.php?filename=localStorage_data.json`;

  return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the received data, for example, display it on the frontend
        // console.log('Data2 from PHP:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
}

// Function to clear or delete a file using a GET request
function clearFile(filename) {
  // Append the filename as a query parameter
  const url = `delete_data.php?filename=${filename}`;

  return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error clearing file: ${response.statusText}`);
        }
        return response.text();
      })
      .then(message => {
        console.log(message);
        return message;
      })
      .catch(error => {
        console.error('Error clearing file:', error);
        throw error;
      });
}

function populateTable(data1, data2) {
  const tableBody = document.getElementById('tableBody');

  tableBody.innerHTML = ``

  // Assuming both columns have the same length
  for (let i = 0; i < data1.length; i++) {
    const row = document.createElement('tr');

    // Column 1
    const column1Cell = document.createElement('td');
    if (data1[i]) {
      column1Cell.innerHTML = `<strong>${data1[i].eventNumber}</strong>. ${data1[i].message}<br/>${data1[i].time}`;
    } else {
      column1Cell.innerHTML = ``;
    }
    row.appendChild(column1Cell);

    // Column 2
    const column2Cell = document.createElement('td');
    if (data2[i]) {
      column2Cell.innerHTML = `<strong>${data2[i].eventNumber}</strong>. ${data2[i].message}<br/>${data2[i].time}`;
    } else {
      column2Cell.innerHTML = ``;
    }
    row.appendChild(column2Cell);

    tableBody.appendChild(row);
  }
}

async function fetchDataAndPopulateTable() {
  try {
    const data1 = await getData1();
    console.log('Received data1:', data1);

    const data2 = await getData2();
    console.log('Received data2:', data2);

    // Call populateTable once data1 and data2 are available
    populateTable(data1, data2);
  } catch (error) {
    // Handle errors from getData1 or getData2
    console.error('Error:', error);
  }
}

document.getElementById("startBtn").addEventListener("click", startAnimation);
document.getElementById("stopBtn").addEventListener("click", stopAnimation);
document.getElementById("reloadBtn").addEventListener("click", reloadAnimation);
document.getElementById("closeBtn").addEventListener("click", closeAnimation);
