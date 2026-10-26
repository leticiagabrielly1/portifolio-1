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
aplicarTema(temaSalvo || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

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

  /* ===== VALIDAÇÃO DO FORMULÁRIO (demonstrativa, sem envio) ===== */
  const form = document.getElementById("form-contato");
  const retorno = document.getElementById("retorno");
  const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  function mostrarErro(campo, mensagem) {
    const erro = document.getElementById("erro-" + campo.id);
    erro.textContent = mensagem;
    campo.classList.toggle("invalido", mensagem !== "");
    campo.setAttribute("aria-invalid", mensagem !== "" ? "true" : "false");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    retorno.textContent = "";
    const nome = form.nome, email = form.email, msg = form.mensagem, ok = form.consentimento;
    const problemas = [];

    mostrarErro(nome, nome.value.trim() === "" ? "Informe seu nome." : "");
    if (nome.value.trim() === "") problemas.push(nome);

    let erroEmail = "";
    if (email.value.trim() === "") erroEmail = "Informe seu e-mail.";
    else if (!emailValido(email.value.trim())) erroEmail = "Digite um e-mail válido, como nome@exemplo.com.";
    mostrarErro(email, erroEmail);
    if (erroEmail) problemas.push(email);

    mostrarErro(msg, msg.value.trim() === "" ? "Escreva sua mensagem." : "");
    if (msg.value.trim() === "") problemas.push(msg);

    mostrarErro(ok, ok.checked ? "" : "Marque o consentimento para continuar.");
    if (!ok.checked) problemas.push(ok);

    if (problemas.length > 0) {
      retorno.textContent = "Corrija os campos indicados e tente novamente.";
      problemas[0].focus();
      return;
    }
    retorno.textContent = "Dados validados. Este formulário é demonstrativo e não enviou sua mensagem. Para entrar em contato, use o link de e-mail.";
    form.reset(); // limpa os campos; nada é guardado
  });
});
