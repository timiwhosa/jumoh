var countDownDate = new Date("Oct 23, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementsByClassName("course-rating")[0].innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementsByClassName("course-rating")[0].innerHTML = "Ongoing";
  }
}, 1000);
function closeenroll(e) {
  e.style.display = "none";
  var enroll = document.getElementsByClassName("enroll-div")[0];
  enroll.style.display = "none";
  document.getElementById("enroll-form").children[7].children[1].disabled = false;
  loader("hide", "loader");
}
function enroll() {
  var enroll = document.getElementsByClassName("enroll-div")[0];
  var enrollCover = document.getElementsByClassName("enroll-cover")[0];
  enroll.style.display = "block";
  enrollCover.style.display = "block";
}
function closevideo() {
  var overVideo = document.getElementsByClassName("overlay-video")[0];
  overVideo.style.display = "none";
  overVideo.children[1].setAttribute("src", "");
}
function openvideo(src) {
  var overVideo = document.getElementsByClassName("overlay-video")[0];
  overVideo.style.display = "block";
  overVideo.children[1].setAttribute("src", src);
}

document.getElementById("enroll-form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  var numb = (num) => {
    if (parseInt(num.split("")[0]) === 0) {
      return num.substring(1)
    } else {
      return num
    }
  }
  var name = e.target[0].value;
  var number = "+234" + numb(e.target[1].value);
  var email = e.target[2].value;
  var button = e.target[3];
  var id = e.target.getAttribute("class");

  loader("show", "loader");
  button.disabled = true;
  console.log(name, number, email, button);
  var opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, number, email, id }),
  };
  fetch("/enroll", opt)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      button.disabled = false;
      loader("hide", "loader");
      if (data.status === 200) {
        success(data.message, "success");
      } else {
        success(data.message, "error");
      }
    });
});

Object.entries(document.getElementsByClassName("course-tab")[0].children).forEach((obj) => {
  obj[1].addEventListener("click", ()=> scrolltocourseSection(obj[1].textContent.trim().toLowerCase()));
});
function scrolltocourseSection(targetid) {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var dimension = document
    .getElementById(`${targetid}`)
    .getBoundingClientRect();
  document.documentElement.scrollTop = dimension.top + ( scrollTop * 0.6) ;
  // console.log(dimension)
}
