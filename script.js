const li = document.createElement("li");
const ul = document.querySelector("ul");

async function iniciar() {
  // pegando informacoes do arquivo json
  const hemocentrosResponse = fetch("./hemocentros-db.json");
  const hemocentrosJSON = await (await hemocentrosResponse).json();

  // criando cards de cada hemocentro e colocando na ul
  hemocentrosJSON.map((hemocentro) => {
    const li = document.createElement("li");
    if (hemocentro.estado == "Minas Gerais") {
      const estado = hemocentro.estado,
        nomeHemocentro = hemocentro.nome,
        endereco = hemocentro.endereco,
        telefone = hemocentro.tel.join("<br>"),
        // mapa = `https://www.google.com.br/maps/place/${endereco}`;
        mapa = `https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${endereco}+(T%C3%ADtulo)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed`;

      const tituloCard = `<h1>${estado}</h1>`,
        subtituloCard = `<h2>${nomeHemocentro}</h2>`,
        enderecoCard = `<p>${endereco}</p>`,
        contatoCard = `<p class="tel">${telefone}</p>`;
      linkMapCard = `<a href="${mapa}">Ver no google maps</a>`;

      li.innerHTML += `<div>${tituloCard}${subtituloCard}</div>`;
      li.innerHTML += `<div>${enderecoCard}${contatoCard}</div>`;
      // li.innerHTML += linkMapCard;
      li.innerHTML += `<iframe src="${mapa}" frameborder="0"></iframe>`;

      ul.appendChild(li);
    }
  });
}

iniciar();
