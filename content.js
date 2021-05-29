const containers = document.querySelectorAll(".c-pwa-product-tray-outer");
const ATCbuttons = document.querySelectorAll(".o-pwa-button-cart");

let currentCategory = "";

const onContainerClick = (e) => {
  let containLink = false;
  let category;

  e.path.forEach((path) => {
    if (path.nodeName === "A") {
      containLink = true;
    }

    if (path.className && path.className.includes("c-pwa-product-tray-outer")) {
      category = path.childNodes[0].childNodes[0].innerText;
    }
  });

  currentCategory = category;

  if (containLink) {
    let affinity = JSON.parse(localStorage.getItem("Affinity")) || {};

    affinity[category] ? affinity[category]++ : (affinity[category] = 1);

    localStorage.setItem("Affinity", JSON.stringify(affinity));
  }
};

const onAddToCartClick = () => {
  let affinity = JSON.parse(localStorage.getItem("Affinity")) || {};

  affinity[currentCategory]
    ? (affinity[currentCategory] += 3)
    : (affinity[currentCategory] = 1);

  localStorage.setItem("Affinity", JSON.stringify(affinity));
};

containers.forEach((container) => {
  container.addEventListener("click", onContainerClick);
});

ATCbuttons.forEach((button) => {
  button.addEventListener("click", onAddToCartClick);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "Link changed") {
    setInterval(() => {
      const containers = document.querySelectorAll(".c-pwa-product-tray-outer");
      const ATCbuttons = document.querySelectorAll(".o-pwa-button-cart");

      if (containers || buttons) {
        containers.forEach((container) => {
          container.addEventListener("click", onContainerClick);
        });

        ATCbuttons.forEach((button) => {
          button.addEventListener("click", onAddToCartClick);
        });
        clearInterval();
      }
    }, 2000);
  }
});
