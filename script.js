function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function geraLi(hemocentro, ul) {
  const li = document.createElement("li");
  const enderecoFormatado = hemocentro.endereco.split(" ").join("+");

  const tituloCard = `<h1>${hemocentro.estado}</h1>`,
    subtituloCard = `<h2>${hemocentro.nome}</h2>`,
    enderecoCard = `<p>${hemocentro.endereco}</p>`,
    contatoCard = `<a class="tel">${hemocentro.tel.join("<br>")}</a>`,
    linkMapCard = `<a href="https://www.google.com.br/maps/place/${enderecoFormatado}+Brazil/" target="_blank">Ver no google maps</a>`;

  li.innerHTML += `<div>${tituloCard}${subtituloCard}</div>`;
  li.innerHTML += `<div>${enderecoCard}${contatoCard}</div>`;
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
}

const input = document.querySelector("[data-hemocentros-options]");
puxarHemocentrosJson(input.value);

input.addEventListener("change", () => {
  puxarHemocentrosJson(input.value);
});
