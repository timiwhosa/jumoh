window.addEventListener("scroll", (e) => {
  if (document.documentElement.scrollTop > 150) {
    document.querySelector("nav").classList.add("active");
  } else {
    document.querySelector("nav").classList.remove("active");
  }
});

function success(data, type) {
  var suc = document.createElement("div");
  if (type === "error") {
    suc.setAttribute("class", "message-show bg-secondary white");
  } else {
    suc.setAttribute("class", "message-show bg-primary white");
  }
  suc.setAttribute("id", `success${Math.floor(Math.random())}`);
  suc.textContent = data;
  document.body.append(suc);
  setTimeout(() => {
    document.body.removeChild(suc);
  }, 2000);
}

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

function loader(type, id) {
  if (type === "show") {
    document.getElementById(id).setAttribute("class", "lds-dual-ring");
  } else {
    document.getElementById(id).removeAttribute("class", "lds-dual-ring");
  }
}
