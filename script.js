const menuMobile = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");
const header = document.querySelector("header");

menuMobile.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  document.body.classList.toggle("no-scroll");

  // Impede header de esconder quando menu estiver aberto
  header.classList.remove("hide");
});

let lastScroll = 0;

window.addEventListener("scroll", () => {

  // Se menu estiver aberto, não executar efeito
  if (menu.classList.contains("ativo")) return;

  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("hide");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("hide")) {
    header.classList.add("hide");
  } else if (currentScroll < lastScroll) {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// ANIMAÇÃO AO SCROLL PREMIUM

// ANIMAÇÃO PREMIUM COM INTERSECTION OBSERVER

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// HEADER DINÂMICO
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});
// HEADER MUDA AO ROLAR
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("ativo");
    document.body.classList.remove("no-scroll");
  });
});


// ANIMAÇÃO LATERAL COM INTERSECTION OBSERVER

const elements = document.querySelectorAll(".reveal-left, .reveal-right");

const observerSide = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observerSide.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => {
  observerSide.observe(el);
});

const form = document.getElementById("agendamento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: form[0].value,
    telefone: form[1].value,
    data: form[2].value,
    horario: form[3].value
  };

  const resposta = await fetch("http://localhost:3000/agendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();
  alert(resultado.mensagem);
});