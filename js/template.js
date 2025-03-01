document.addEventListener("DOMContentLoaded", function () {
  const head = document.querySelector("head");

  if (!window.jQuery) {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.onload = function () {
      initializeCommonFeatures();
      loadPageSpecificScript();
      enableSmoothPageTransitions();
    };
    head.appendChild(jqueryScript);
  } else {
    initializeCommonFeatures();
    loadPageSpecificScript();
    enableSmoothPageTransitions();
  }
});

function initializeCommonFeatures() {
  if (!document.querySelector("#bootstrap-css")) {
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.id = "bootstrap-css";
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    document.querySelector("head").appendChild(bootstrapCSS);
  }

  if (!document.querySelector("#bootstrap-js")) {
    const bootstrapJS = document.createElement("script");
    bootstrapJS.id = "bootstrap-js";
    bootstrapJS.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapJS);
  }

  document.body.classList.remove("loading");

  if (!document.querySelector("#header")) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
      <header class="text-center p-3 text-info" id="header">
        <div class="logo">
          <img src="images/ntua-diesels.png" alt="NTUA Diesels Logo" class="img-fluid mx-auto d-block" style="max-width: 100px;">
        </div>
        <h1 class="text-primary">NTUA DIESELS</h1>
        <button id="darkModeToggle" class="btn bg-secondary text-white mt-2">Dark Mode</button>
      </header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">NTUA Diesels</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
              <li class="nav-item"><a class="nav-link" href="about.html">The Team</a></li>
              <li class="nav-item"><a class="nav-link active" href="stats.html">The Team Stats</a></li>
              <li class="nav-item"><a class="nav-link" href="tasks.html">Tasks</a></li>
            </ul>
          </div>
        </div>
      </nav>
      `
    );
  }

  if (!document.querySelector("#footer")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <footer class="bg-dark text-white text-center py-3" id="footer">
        <p class="m-0">&copy; 2024 NTUA Diesels. All rights reserved.</p>
      </footer>
      `
    );
  }

  setupDarkMode();

  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentPage ||
        (currentPage === "" && link.getAttribute("href") === "index.html")
    );
  });
}

function setupDarkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  applyDarkMode(isDarkMode);

  document.body.addEventListener("click", function (event) {
    if (event.target.id === "darkModeToggle") {
      const newDarkMode = !document.body.classList.contains("dark-mode");
      applyDarkMode(newDarkMode);
      localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");
    }
  });
}

function applyDarkMode(enable) {
  document.body.classList.toggle("dark-mode", enable);
  document.querySelector("header").classList.toggle("dark-mode", enable);
  document.querySelector("footer").classList.toggle("dark-mode", enable);
  document.querySelector("nav").classList.toggle("dark-mode", enable);
}

function enableSmoothPageTransitions() {
  const allLinks = document.querySelectorAll("a[href]");

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";

      const isExternal =
        href.startsWith("http") || href.startsWith("#") || href === "";

      if (!isExternal) {
        e.preventDefault();

        document.body.classList.add("loading");

        document.body.addEventListener("transitionend", function handleEnd() {
          document.body.removeEventListener("transitionend", handleEnd);
          window.location.href = href;
        });
      }
    });
  });
}

function loadPageSpecificScript() {
  if (window.location.pathname.endsWith("stats.html")) {
    const statsScript = document.createElement("script");
    statsScript.src = "js/stats.js";
    document.body.appendChild(statsScript);
  }
  if (window.location.pathname.endsWith("tasks.html")) {
    const tasksScript = document.createElement("script");
    tasksScript.src = "js/tasks.js";
    document.body.appendChild(tasksScript);
  }
}
