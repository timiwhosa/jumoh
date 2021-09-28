window.addEventListener("scroll", (e) => {
  if (document.documentElement.scrollTop > 150) {
    document.querySelector("nav").classList.add("active");
  } else {
    document.querySelector("nav").classList.remove("active");
  }
});

var cover = document.getElementsByClassName("cover")[0];
document
  .getElementsByClassName("menu")[0]
  .addEventListener("click", sidenavtoogle);
cover.addEventListener("click", sidenavtoogle);
function sidenavtoogle(e) {
  var sidenav = document.getElementsByClassName("side-nav")[0];
  if (sidenav.style.left === "0px") {
    sidenav.style.left = "-100vw";
    cover.style.left = "-120vw";
  } else {
    sidenav.style.left = 0;
    cover.style.left = 0;
  }
}
