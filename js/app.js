/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const navBarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function helper() {
  for (let i = 0; i < sections.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<a class="menu__link" href='#${sections[i].getAttribute(
      "id"
    )}'> ${sections[i].getAttribute("data-nav")} </a>`;
    navBarList.append(li);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
helper();

// Add class 'active' to section when near top of viewport
// Add an active state to your navigation items when a section is in the viewport.

function makeActive() {
  for (let section of sections) {
    const box = section.getBoundingClientRect();
    const id = section.getAttribute("id");
    const navli = document.querySelector(`[href='#${id}']`);

    //Find a value that works best, but 150 seems to be a good start.
    if (box.top <= 150 && box.bottom >= 150) {
      //apply active state on current section and corresponding Nav link
      section.classList.add("your-active-class");
      navli.classList.add("your-active-class");
    } else {
      //Remove active state from other section and corresponding Nav link
      section.classList.remove("your-active-class");
      navli.classList.remove("your-active-class");
    }
  }
}

// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", function () {
  makeActive();
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
const lists = document.querySelectorAll(".menu__link");

// Scroll to section on link click
document.addEventListener("click", function (e) {
  if (e.target.nodeName === "A") {
    e.preventDefault();
    const element = document.getElementById(
      e.target.getAttribute("href").slice(1)
    );
    element.scrollIntoView({ behavior: "smooth" });
  }
});

//Hide fixed navigation bar while not scrolling (it should still be present on page load).
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  //console.log(prevScrollPos, currentScrollPos);
  setTimeout(function () {
    if (Math.abs(currentScrollPos - prevScrollPos) < 5) {
      document.getElementsByClassName("navbar__menu")[0].style.display = "none";
    } else {
      document.getElementsByClassName("navbar__menu")[0].style.display =
        "block";
    }
    prevScrollPos = currentScrollPos;
  }, 400);
};

//Make sections collapsible.
