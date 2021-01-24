const dateInput = document.getElementById("date_input");
const dateButton = document.getElementById("date_button");

const formattedToday = () => {
  const today = new Date();
  const year = today.getFullYear();

  const zeroPad = (num, places) => String(num).padStart(places, "0"); //* Using ES2017 String.prototype.padStart

  const month = zeroPad(today.getMonth() + 1, 2);
  const day = zeroPad(today.getDate(), 2);

  return year + "-" + month + "-" + day;
};

dateInput.innerHTML = `
    <label for="date">Choose a day:</label>
    <input type="date" id="date" name="date" value=${formattedToday()} max=${formattedToday()} min="1995-06-16">
`;

const displayImage = (data) => {
  const imageDiv = document.getElementById("image_div");
  let imageURL;
  if (data.media_type === "video") {
    console.log(data.thumbnail_url);
    imageURL = data.thumbnail_url;
  } else {
    imageURL = data.url;
  }

  let html = `
  <figure>
    <img src="${imageURL}" title="${data.title}" alt="${data.title}">
    <figcaption>
      <h2 id="title">${data.title}</h2>
      <div id="copyright">${
        data.copyright ? `&copy; ` + data.copyright : ""
      }</div>
    <figcaption>
  </figure>
  <div id="explanation_div">
    <p>${data.explanation}</p>
  </div>
  `;

  imageDiv.innerHTML = html;
};

// function testDate(date) {
//   const dateRegex = /^[12][09][012][0-9]-[01][0-9]-[0-3][0-9]$/;
//   const errorSpan = document.getElementById('date_error');
//   if (!dateRegex.test(date)) {
//     errorSpan.innerHTML = 'the date must be on or after 6/16/1995';
//     return false;
//   } else {
//     return true;
//   }
// }

function testDate(date) {
  const errorSpan = document.getElementById('date_error');
  const oldestTime = new Date('1995-06-16').getTime();
  const newestTime = new Date().getTime();
  const selectedTime = new Date(date);
  if (selectedTime < oldestTime || selectedTime > newestTime) {
    errorSpan.innerHTML = 'Date must be between 6-16-1995 and present.';
    return false;
  } else {
    errorSpan.innerHTML = '';
    return true;
  }
}

testDate();

const fetchData = (date) => {
  if (testDate(date)) {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=o1LBKnqER92QVjhPHCQrO0kQgpOdiCGdcKPSQq3r&thumbs=true&date=${date}`
    )
      .then((res) => res.json())
      .then((data) => displayImage(data));
  }
};

window.onload = function () {
  fetchData(formattedToday());

  dateButton.addEventListener("click", () => {
    fetchData(document.getElementById("date").value);
  });
};
