
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js' 
import toast_html from "/src/views/toast.html";

export function Toast() {
  const toast_container = document.querySelector("#toast-div");

  toast_container.innerHTML = toast_html;

  const toast_image = toast_container.querySelector("#toast-image");

  toast_image.style.width = "30px";
  return
}


export function Show_Toast(title, body){

  const ToastElement = document.querySelector('#liveToast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(ToastElement)

  const toast_title = document.querySelector("#toast-title");
  const toast_body = document.querySelector(".toast-body");
  
  toast_title.textContent = title;
  toast_body.textContent = body;

  toastBootstrap.show()
}
