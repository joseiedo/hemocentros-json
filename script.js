function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function geraLi(hemocentro, ul) {
  const li = document.createElement("li");
  const enderecoFormatado = hemocentro.endereco;

  const tituloCard = `<h1>${hemocentro.estado}</h1>`,
    subtituloCard = `<h2>${hemocentro.nome}</h2>`,
    enderecoCard = `<p>${hemocentro.endereco}</p>`,
    contatoCard = `<p class="tel"><span>Telefone:</span> ${hemocentro.telefone}</p>`,
    emailCard = `<a class="tel" href="mailto:${hemocentro.email}"><span>E-mail:</span> ${hemocentro.email}</a>`,
    linkMapCard = `<a href="https://www.google.com.br/maps/place/${enderecoFormatado}+Brazil/" target="_blank" id="vermaps">Ver no google maps</a>`;

  li.innerHTML += `<div>${tituloCard}</div>`;
  li.innerHTML += `<div>${subtituloCard}${enderecoCard}</div><div>${contatoCard}${emailCard}</div>`;
  li.innerHTML += linkMapCard;

  ul.appendChild(li);
}

async function puxarHemocentrosJson(opcaoSelecionada) {
  const ul = document.querySelector("[data-hemocentros]");

  removeChildren(ul);
  const hemocentrosResponse = fetch("./hemocentros-db.json");
  const hemocentrosJSON = await (await hemocentrosResponse).json();

  hemocentrosJSON.forEach((hemocentro) => {
    const expressao =
      opcaoSelecionada === "todos"
        ? true
        : hemocentro.estado === opcaoSelecionada;

    if (expressao) geraLi(hemocentro, ul);
  });
  console.table(hemocentrosJSON);
}

const input = document.querySelector("[data-hemocentros-options]");
puxarHemocentrosJson(input.value);

input.addEventListener("change", () => {
  puxarHemocentrosJson(input.value);
});
