// $("#Menu-portfolio").click(function () {
//   $("#Container--1").css("opacity", "1");
// }),
//   (window.onload = function () {
//     $(".Preload").fadeOut("slow", function () {
//       $(".Preload").css("visibility", "hidden");
//     }),
//       $("body").css("overflow", "visible");
//   }),
//   $(function () {
//     $(window).scroll(function () {
//       var i = $(this).scrollTop();
//       $("#about").length &&
//         (i >= $("#about").offset().top - 40 &&
//           ($(".link-white").addClass("b-text-black"),
//           $(".Menu--js").css("visibility", "visible"),
//           $(".Menu--js").css("opacity", "1"),
//           $(".Menu--main").css("visibility", "hidden"),
//           $(".Menu--main").css("opacity", "0")),
//         i < $("#about").offset().top - 40 &&
//           ($(".link-white").removeClass("b-text-black"),
//           $(".Menu--js").css("visibility", "hidden"),
//           $(".Menu--js").css("opacity", "0"),
//           $(".Menu--main").css("visibility", "visible"),
//           $(".Menu--main").css("opacity", "1"))),
//         $(".Container--stat").length &&
//           (i >= $(".Container--stat").offset().top &&
//             ($(".Menu--js").css("visibility", "visible"),
//             $(".Menu--js").css("opacity", "1"),
//             $(".Menu--main").css("visibility", "hidden"),
//             $(".Menu--main").css("opacity", "0")),
//           i < $(".Container--stat").offset().top &&
//             ($(".Menu--js").css("visibility", "hidden"),
//             $(".Menu--js").css("opacity", "0"),
//             $(".Menu--main").css("visibility", "visible"),
//             $(".Menu--main").css("opacity", "1")));
//     });
//   });
// ==== darkToggler
const darkTogglerCheckbox = document.querySelector("#darkToggler");
const html = document.querySelector("html");

const darkModeToggler = () => {
  darkTogglerCheckbox.checked
    ? html.classList.add("dark")
    : html.classList.remove("dark");
};
darkModeToggler();

darkTogglerCheckbox.addEventListener("click", darkModeToggler);

// ====== scroll top js
function scrollTo(element, to = 0, duration = 500) {
  const start = element.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;

    const val = Math.easeInOutQuad(currentTime, start, change, duration);

    element.scrollTop = val;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

document.querySelector(".back-to-top").onclick = () => {
  scrollTo(document.documentElement);
};
