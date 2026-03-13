const form = document.getElementById("demo-form");
const success = document.getElementById("form-success");

if (form && success) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    success.hidden = false;
    form.reset();
  });
}
