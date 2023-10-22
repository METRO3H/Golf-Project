
import toast_html from "/src/views/toast.html";

export function Toast(title, body) {
  const toast_container = document.createElement("div");
  toast_container.innerHTML = toast_html;

  const toast_title = toast_container.querySelector("#toast-title");
  const toast_body = toast_container.querySelector(".toast-body");
  const toast_image = toast_container.querySelector("#toast-image");

  toast_title.textContent = title;
  toast_body.textContent = body;

  toast_image.style.width = "30px";

  return toast_container;
}
