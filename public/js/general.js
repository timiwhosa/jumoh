var countDownDate = new Date("Oct 4, 2021 00:00:00").getTime();

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
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
 function closeenroll(e) {
   e.style.display = "none";
   var enroll = document.getElementsByClassName("enroll-div")[0];
   enroll.style.display = "none";
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