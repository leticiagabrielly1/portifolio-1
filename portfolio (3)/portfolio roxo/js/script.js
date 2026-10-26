/* ===== TEMA (claro/escuro) =====
   Salva somente a preferência de tema no localStorage. */
const raiz = document.documentElement;
const botaoTema = document.querySelector(".tema-botao");

function aplicarTema(tema) {
  raiz.setAttribute("data-theme", tema);
  const escuro = tema === "dark";
  if (botaoTema) {
    botaoTema.setAttribute("aria-pressed", String(escuro));
    botaoTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
    botaoTema.firstElementChild.textContent = escuro ? "☀" : "☾";
  }
}

let temaSalvo = null;
try { temaSalvo = localStorage.getItem("tema"); } catch (e) { /* sem localStorage: segue sem salvar */ }
aplicarTema(temaSalvo || "dark"); // tema escuro (roxo) é o padrão

document.addEventListener("DOMContentLoaded", () => {
  const botaoTema2 = document.querySelector(".tema-botao");
  botaoTema2.addEventListener("click", () => {
    const novo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
    aplicarTema(novo);
    try { localStorage.setItem("tema", novo); } catch (e) {}
  });

  /* ===== SAUDAÇÃO DINÂMICA ===== */
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  document.getElementById("saudacao").textContent = saudacao;

  /* ===== ANO AUTOMÁTICO ===== */
  document.getElementById("ano").textContent = new Date().getFullYear();

  /* ===== MENU HAMBÚRGUER ===== */
  const botaoMenu = document.querySelector(".menu-botao");
  const menu = document.getElementById("menu");

  function alternarMenu(abrir) {
    menu.classList.toggle("aberto", abrir);
    botaoMenu.setAttribute("aria-expanded", String(abrir));
    botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  }
  botaoMenu.addEventListener("click", () => alternarMenu(!menu.classList.contains("aberto")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => alternarMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("aberto")) {
      alternarMenu(false);
      botaoMenu.focus();
    }
  });
});
