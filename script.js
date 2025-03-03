/* *********** Menu *********** */ 

((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", e=> {
        if(!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);

/* *********** ContactForm *********** */ 
document.addEventListener("DOMContentLoaded", () => {
    const $form = document.querySelector(".contact-form"),
      $loader = document.querySelector(".contact-form-loader"),
      $response = document.querySelector("#gracias .modal-content");
  
    if (!$form || !$loader || !$response) {
      console.error("No se encontraron los elementos necesarios en el DOM.");
      return;
    }
  
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      $loader.classList.remove("none");
  
      fetch("https://formsubmit.co/ajax/4837dcb2c8fcd83aadf9a0e42b0e7652", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          location.hash = "#gracias";
          $form.reset();
        })
        .catch((err) => {
          console.error("Error en la petición:", err);
          let message =
            err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
  
          if ($response) {
            $response.innerHTML = `<h3>Error ${err.status}: ${message}</h3>`;
          }
        })
        .finally(() => {
          $loader.classList.add("none");
          setTimeout(() => {
            location.hash = "#close";
          }, 3000);
        });
    });
  });
  