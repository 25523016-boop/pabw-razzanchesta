// dom.js — bagian yang menyentuh halaman (DOM, event, render).
import {
  profile,
  projects,
  filterProjects,
  validateField,
} from "./app.js";
import { fetchNews } from "./api.js";

// ---------- Sheet A: memilih elemen ----------
function getElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Elemen ${selector} tidak ditemukan`);
  }

  return element;
}

const profileName = getElement("#nama-profil");
const container = getElement("#list");
const filterRow = getElement("#filter");
const emptyMessage = getElement("#empty-message");
const form = getElement("#contact-form");
const submitButton = getElement("#submit-button");
const formStatus = getElement("#form-status");

// ---------- Sheet B & D: render proyek ----------
function buildCard(project) {
  const li = document.createElement("li");
  li.className = "card";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = `${project.category} · ${project.year} · ${
    project.done ? "Selesai" : "Sedang dikerjakan"
  }`;

  li.append(title, description, meta);
  return li;
}

function render(list) {
  container.textContent = "";

  if (list.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  const fragment = document.createDocumentFragment();
  list.forEach((project) => fragment.append(buildCard(project)));
  container.append(fragment);
}

// ---------- Sheet C: satu listener di parent ----------
function markActiveButton(activeButton) {
  filterRow.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  markActiveButton(button);
  render(filterProjects(projects, button.dataset.category));
});

// ---------- Sheet D: validasi formulir ----------
const fields = Array.from(form.querySelectorAll("input, textarea"));
let attempted = false;

function showError(field, message) {
  const errorElement = form.querySelector(`#error-${field.name}`);

  if (!errorElement) {
    console.error(`Elemen error untuk ${field.name} tidak ditemukan`);
    return;
  }

  errorElement.textContent = message;
  errorElement.hidden = message === "";
  field.setAttribute("aria-invalid", message === "" ? "false" : "true");
}

function checkField(field) {
  const message = validateField(field.name, field.value);
  showError(field, message);
  return message === "";
}

function isFormValid() {
  return fields.every(
    (field) => validateField(field.name, field.value) === ""
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  attempted = true;

  const results = fields.map((field) => checkField(field));
  const firstInvalid = fields[results.indexOf(false)];

  if (firstInvalid) {
    formStatus.textContent = "";
    submitButton.disabled = true;
    firstInvalid.focus();
    return;
  }

  formStatus.textContent = "Terima kasih, pesan Anda sudah dicatat.";
  form.reset();
  fields.forEach((field) => showError(field, ""));
  attempted = false;
  submitButton.disabled = false;
});

// Validasi saat mengetik
form.addEventListener("input", (event) => {
  const field = event.target.closest("input, textarea");
  if (!field) return;

  checkField(field);
  if (attempted) {
    submitButton.disabled = !isFormValid();
  }
});

// ---------- Tampilan awal ----------
profileName.textContent = profile.name;
render(projects);

// ---------- Data post dari API ----------
const apiStatus = getElement("#api-status");
const apiList = getElement("#api-list");

async function loadPosts() {
  apiStatus.textContent = "Memuat post...";
  apiList.textContent = "";

  try {
    const posts = await fetchNews();

    if (posts.length === 0) {
      apiStatus.textContent = "Belum ada post.";
      return;
    }

    apiStatus.textContent = "";

    posts.forEach((post) => {
      const card = document.createElement("article");
      const title = document.createElement("h3");
      const body = document.createElement("p");

      title.textContent = post.title;
      body.textContent = post.body;

      card.append(title, body);
      apiList.appendChild(card);
    });
  } catch (error) {
    apiList.textContent = "";
    apiStatus.textContent = `Post gagal dimuat: ${error.message}`;
  }
}

loadPosts();