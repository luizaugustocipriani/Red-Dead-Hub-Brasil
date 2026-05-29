const dados = {
  "personagens": [
    {
      "id": 1,
      "nome": "Arthur Morgan",
      "descricao": "O braço direito da gangue Van der Linde e um combatente implacável.",
      "conteudo": "Arthur é um homem prático, leal e complexo, criado por Dutch desde a sua juventude. Suas decisões ao longo do enredo definem sua jornada de redenção e moldam o destino de todos que o cercam no acampamento.",
      "afiliacao": "Gangue Van der Linde",
      "destaque": true,
      "data_cadastro": "2026-05-29",
      "imagem_principal": "img/arthur_main.jpg",
      "elementos_vinculados": [
        {
          "id": 101,
          "nome": "Revólver de Boiadeiro",
          "descricao": "Sua arma curta customizada mais icônica e confiável.",
          "imagem": "img/vaqueiro.jpg"
        },
        {
          "id": 102,
          "nome": "Cavalo Puro Sangue Árabe",
          "descricao": "Lendária montaria encontrada nas terras geladas do Lago Isabella.",
          "imagem": "img/cavalo.jpg"
        },
        {
          "id": 103,
          "nome": "Olho da Morte (Dead Eye)",
          "descricao": "Habilidade incomparável de desacelerar o tempo em combate intenso.",
          "imagem": "img/olho_da_morte.jpg"
        }
      ]
    },
    {
      "id": 2,
      "nome": "John Marston",
      "descricao": "O protegido que busca proteger seu próprio futuro e sua jovem família.",
      "conteudo": "John cresceu sob a tutela de Dutch, mas se vê dividido entre as obrigações morais com os foragidos e o dever de se tornar um pai e marido de verdade para Jack e Abigail.",
      "afiliacao": "Gangue Van der Linde",
      "destaque": false,
      "data_cadastro": "2026-05-28",
      "imagem_principal": "img/john_main.jpg",
      "elementos_vinculados": [
        {
          "id": 201,
          "nome": "Rifle de Repetição Lancaster",
          "descricao": "Arma de longo alcance perfeita para emboscadas nos desfiladeiros.",
          "imagem": "img/lancaster.jpg"
        },
        {
          "id": 202,
          "nome": "Equipamentos do Armadilheiro",
          "descricao": "Coldres e cartucheiras confeccionadas com peles perfeitas.",
          "imagem": "img/coldres.jpg"
        }
      ]
    },
    {
      "id": 3,
      "nome": "Dutch van der Linde",
      "descricao": "O líder carismático, idealista e visionário de todo o bando.",
      "conteudo": "Um homem que se enxerga como um Robin Hood moderno, liderando uma cruzada utópica contra o avanço da civilization e as amarras do governo. Sua ambição é o motor da gangue.",
      "afiliacao": "Líder da Gangue",
      "destaque": true,
      "data_cadastro": "2026-05-27",
      "imagem_principal": "img/dutch_main.jpg",
      "elementos_vinculados": [
        {
          "id": 301,
          "nome": "Revólveres Schofield Duplos",
          "descricao": "Par de revólveres gravados com acabamentos em ouro e madrepérola.",
          "imagem": "img/revolver_dutch.jpg"
        },
        {
          "id": 302,
          "nome": "Anotações e Planos",
          "descricao": "Seus cadernos cheios de ideias para alcançar uma vida de liberdade.",
          "imagem": "img/diario_john.jpg"
        }
      ]
    }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("container-carrossel") || document.getElementById("container-cards")) {
        renderizarPaginaPrincipal();
    }
    if (document.getElementById("detalhe-item-geral")) {
        renderizarPaginaDetalhes();
    }

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const nomeInput = form.querySelector("input[type='text']");
            const nomeForagido = nomeInput ? nomeInput.value : "Parceiro";
            alert(`🤠 Abaixe as armas, ${nomeForagido}! Sua mensagem foi enviada com sucesso para o Saloon. Responderemos em breve!`);
            form.reset(); 
        });
    }  

    const artigosDicas = document.querySelectorAll("article");
    artigosDicas.forEach(article => {
        article.addEventListener("mouseenter", function () {
            this.style.borderColor = "var(--red-bright)"; 
        });
        article.addEventListener("mouseleave", function () {
            this.style.borderColor = "var(--red-primary)"; 
        });
    });
});

function renderizarPaginaPrincipal() {
    const containerCarrossel = document.getElementById("container-carrossel");
    const containerCards = document.getElementById("container-cards");
    const itensDestaque = dados.personagens.filter(p => p.destaque);
    
    if (containerCarrossel) {
        let carrosselHTML = "";
        itensDestaque.forEach((p, index) => {
            let activeClass = index === 0 ? "active" : "";
            carrosselHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${p.imagem_principal}" class="d-block w-100 carousel-img-custom" alt="${p.nome}">
                    <div class="carousel-caption carousel-caption-blur">
                        <h3 class="text-danger-custom font-cinzel">${p.nome}</h3>
                        <p class="d-none d-md-block">${p.descricao}</p>
                        <a href="detalhe.html?id=${p.id}" class="btn btn-danger-custom btn-sm px-3 mt-2">Ver Ficha do Pistoleiro</a>
                    </div>
                </div>
            `;
        });
        containerCarrossel.innerHTML = carrosselHTML;
    }
    
    if (containerCards) {
        let cardsHTML = "";
        dados.personagens.forEach(p => {
            cardsHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <article class="feature-box h-100 d-flex flex-column" style="background-color: var(--bg-card); border-left: 5px solid var(--red-primary);">
                        <img src="${p.imagem_principal}" alt="${p.nome}" class="img-fluid rounded mb-3" style="height: 250px; object-fit: cover;">
                        <h4 class="text-danger-custom font-cinzel text-center">${p.nome}</h4>
                        <p class="text-muted text-center small mb-2">Filiação: ${p.afiliacao}</p>
                        <p class="text-truncate-custom flex-grow-1">${p.descricao}</p>
                        <div class="text-center mt-3">
                            <a href="detalhe.html?id=${p.id}" class="btn btn-danger-custom w-100">Ver Ficha Completa</a>
                        </div>
                    </article>
                </div>
            `;
        });
        containerCards.innerHTML = cardsHTML;
    }
}

function renderizarPaginaDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const idParam = parseInt(params.get("id"));
    const personagem = dados.personagens.find(p => p.id === idParam);
    
    const containerGeral = document.getElementById("detalhe-item-geral");
    const containerVinculados = document.getElementById("detalhe-itens-vinculados");
    
    if (!personagem) {
        if (containerGeral) {
            containerGeral.innerHTML = `<div class="alert alert-danger text-center w-100">Registro não encontrado nos arquivos criminais do Oeste!</div>`;
        }
        return;
    }
    
    document.title = `${personagem.nome} - Detalhes`;
    
    if (containerGeral) {
        containerGeral.innerHTML = `
            <div class="row align-items-center bg-card-custom p-4 rounded border-danger-custom shadow-lg">
                <div class="col-12 col-md-5 mb-4 mb-md-0 text-center">
                    <img src="${personagem.imagem_principal}" alt="${personagem.nome}" class="img-fluid rounded border-danger-custom shadow" style="max-height: 400px; object-fit: cover;">
                </div>
                <div class="col-12 col-md-7">
                    <h2 class="text-danger-custom font-cinzel mb-2 text-start" style="min-height: auto; justify-content: flex-start;">${personagem.nome}</h2>
                    <span class="badge bg-danger mb-3 px-3 py-2">${personagem.afiliacao}</span>
                    <p class="lead text-white fw-bold mb-3">${personagem.descricao}</p>
                    <p class="text-light text-justify">${personagem.conteudo}</p>
                    <hr class="border-secondary">
                    <p class="small text-muted m-0">Catalogado em: ${personagem.data_cadastro} | ID Oficial: #${personagem.id}</p>
                </div>
            </div>
        `;
    }
    
    if (containerVinculados) {
        let vinculadosHTML = "";
        personagem.elementos_vinculados.forEach(item => {
            vinculadosHTML += `
                <div class="col-12 col-md-4">
                    <div class="bg-card-custom h-100 p-3 rounded border-danger-custom text-center shadow d-flex flex-column">
                        <img src="${item.imagem}" alt="${item.nome}" class="img-fluid rounded mb-3" style="height: 180px; object-fit: cover;">
                        <h5 class="text-danger-custom font-cinzel">${item.nome}</h5>
                        <p class="small text-light m-0 mt-2">${item.descricao}</p>
                    </div>
                </div>
            `;
        });
        containerVinculados.innerHTML = vinculadosHTML;
    }
}