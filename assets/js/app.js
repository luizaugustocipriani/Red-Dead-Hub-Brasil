const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
    gerenciarMenuAutenticacao();

    if (document.getElementById("container-carrossel") || document.getElementById("container-cards")) {
        carregarDadosPrincipais();
        configurarBarraPesquisa();
    }
    if (document.getElementById("detalhe-item-geral")) {
        renderizarPaginaDetalhes();
    }
    if (document.getElementById("container-favoritos")) {
        renderizarPaginaFavoritos();
    }

    const form = document.querySelector("form");
    if (form && !form.closest('#form-login')) {
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

function gerenciarMenuAutenticacao() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    const btnAuth = document.getElementById("btn-auth");
    const menuFavoritos = document.getElementById("menu-favoritos");

    if (usuarioLogado) {
        if (btnAuth) {
            btnAuth.innerText = `Logout (${usuarioLogado.nome.split(' ')[0]})`;
            btnAuth.href = "#";
            btnAuth.addEventListener("click", function (e) {
                e.preventDefault();
                sessionStorage.removeItem("usuarioLogado");
                window.location.href = "index.html";
            });
        }
        if (menuFavoritos) menuFavoritos.classList.remove("d-none");
    }
}

async function carregarDadosPrincipais() {
    try {
        const responsePers = await fetch(`${API_URL}/personagens`);
        const personagens = await responsePers.json();
        
        let favoritos = [];
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        if (usuarioLogado) {
            const responseFav = await fetch(`${API_URL}/favoritos?usuarioId=${usuarioLogado.id}`);
            favoritos = await responseFav.json();
        }

        renderizarCarrossel(personagens.filter(p => p.destaque));
        renderizarCards(personagens, favoritos);
        window.todosPersonagens = personagens; 
        window.meusFavoritos = favoritos;
    } catch (error) {
        console.error("Erro ao carregar dados do JSON Server:", error);
    }
}

function renderizarCarrossel(itensDestaque) {
    const containerCarrossel = document.getElementById("container-carrossel");
    if (!containerCarrossel) return;

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
            </div>`;
    });
    containerCarrossel.innerHTML = carrosselHTML;
}

function renderizarCards(personagens, favoritos) {
    const containerCards = document.getElementById("container-cards");
    if (!containerCards) return;

    if (personagens.length === 0) {
        containerCards.innerHTML = `<div class="text-center text-muted my-4 w-100">Nenhum pistoleiro encontrado com esse critério de busca.</div>`;
        return;
    }

    let cardsHTML = "";
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    personagens.forEach(p => {
        const ehFavorito = favoritos.some(f => f.personagemId == p.id);
        const iconeCoracao = ehFavorito ? "❤️" : "🖤";

        cardsHTML += `
            <div class="col-12 col-md-4 mb-4">
                <article class="feature-box h-100 d-flex flex-column" style="background-color: var(--bg-card); border-left: 5px solid var(--red-primary); position: relative;">
                    ${usuarioLogado ? `<span class="btn-favoritar" style="position: absolute; top: 15px; right: 20px; font-size: 1.5rem; cursor: pointer; z-index: 10;" onclick="alternarFavorito('${p.id}')">${iconeCoracao}</span>` : ''}
                    <img src="${p.imagem_principal}" alt="${p.nome}" class="img-fluid rounded mb-3" style="height: 250px; object-fit: cover;">
                    <h4 class="text-danger-custom font-cinzel text-center">${p.nome}</h4>
                    <p class="text-muted text-center small mb-2">Filiação: ${p.afiliacao}</p>
                    <p class="text-truncate-custom flex-grow-1">${p.descricao}</p>
                    <div class="text-center mt-3">
                        <a href="detalhe.html?id=${p.id}" class="btn btn-danger-custom w-100">Ver Ficha Completa</a>
                    </div>
                </article>
            </div>`;
    });
    containerCards.innerHTML = cardsHTML;
}

function configurarBarraPesquisa() {
    const campoBusca = document.getElementById("campo-pesquisa");
    const btnLimpar = document.getElementById("btn-limpar-pesquisa");

    if (campoBusca) {
        campoBusca.addEventListener("input", function () {
            const termo = campoBusca.value.toLowerCase().trim();
            const filtrados = window.todosPersonagens.filter(p => 
                p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo)
            );
            renderizarCards(filtrados, window.meusFavoritos || []);
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function () {
            campoBusca.value = "";
            renderizarCards(window.todosPersonagens, window.meusFavoritos || []);
        });
    }
}

async function alternarFavorito(personagemId) {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) return;

    try {
        const res = await fetch(`${API_URL}/favoritos?usuarioId=${usuarioLogado.id}&personagemId=${personagemId}`);
        const favExistente = await res.json();

        if (favExistente.length > 0) {
            await fetch(`${API_URL}/favoritos/${favExistente[0].id}`, { method: "DELETE" });
        } else {
            await fetch(`${API_URL}/favoritos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId: usuarioLogado.id, personagemId: personagemId })
            });
        }
        carregarDadosPrincipais();
    } catch (error) {
        console.error("Erro ao gerenciar favoritos:", error);
    }
}

async function renderizarPaginaDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    
    const containerGeral = document.getElementById("detalhe-item-geral");
    const containerVinculados = document.getElementById("detalhe-itens-vinculados");
    
    try {
        const response = await fetch(`${API_URL}/personagens/${idParam}`);
        if (!response.ok) throw new Error();
        const personagem = await response.json();

        document.title = `${personagem.nome} - Detalhes`;
        
        if (containerGeral) {
            containerGeral.innerHTML = `
                <div class="row align-items-center bg-card-custom p-4 rounded border-danger-custom shadow-lg">
                    <div class="col-12 col-md-5 mb-4 mb-md-0 text-center">
                        <img src="${personagem.imagem_principal}" alt="${personagem.nome}" class="img-fluid rounded border-danger-custom shadow" style="max-height: 400px; object-fit: cover;">
                    </div>
                    <div class="col-12 col-md-7">
                        <h2 class="text-danger-custom font-cinzel mb-2 text-start">${personagem.nome}</h2>
                        <span class="badge bg-danger mb-3 px-3 py-2">${personagem.afiliacao}</span>
                        <p class="lead text-white fw-bold mb-3">${personagem.descricao}</p>
                        <p class="text-light text-justify">${personagem.conteudo}</p>
                        <hr class="border-secondary">
                        <p class="small text-muted m-0">Catalogado em: ${personagem.data_cadastro} | ID Oficial: #${personagem.id}</p>
                    </div>
                </div>`;
        }
        
        if (containerVinculados && personagem.elementos_vinculados) {
            let vinculadosHTML = "";
            personagem.elementos_vinculados.forEach(item => {
                vinculadosHTML += `
                    <div class="col-12 col-md-4">
                        <div class="bg-card-custom h-100 p-3 rounded border-danger-custom text-center shadow d-flex flex-column">
                            <img src="${item.imagem}" alt="${item.nome}" class="img-fluid rounded mb-3" style="height: 180px; object-fit: cover;">
                            <h5 class="text-danger-custom font-cinzel">${item.nome}</h5>
                            <p class="small text-light m-0 mt-2">${item.descricao}</p>
                        </div>
                    </div>`;
            });
            containerVinculados.innerHTML = vinculadosHTML;
        }
    } catch (e) {
        if (containerGeral) {
            containerGeral.innerHTML = `<div class="alert alert-danger text-center w-100">Registro não encontrado nos arquivos criminais do Oeste!</div>`;
        }
    }
}

async function renderizarPaginaFavoritos() {
    const container = document.getElementById("container-favoritos");
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (!usuarioLogado || !container) return;

    try {
        const responseFav = await fetch(`${API_URL}/favoritos?usuarioId=${usuarioLogado.id}`);
        const favoritos = await responseFav.json();
        
        if(favoritos.length === 0) {
            container.innerHTML = `<div class="text-center text-muted my-4 w-100">Você ainda não favoritou nenhum pistoleiro, parceiro.</div>`;
            return;
        }

        let cardsHTML = "";
        for (let fav of favoritos) {
            const resPers = await fetch(`${API_URL}/personagens/${fav.personagemId}`);
            if(resPers.ok) {
                const p = await resPers.json();
                cardsHTML += `
                    <div class="col-12 col-md-4 mb-4">
                        <article class="feature-box h-100 d-flex flex-column" style="background-color: var(--bg-card); border-left: 5px solid var(--red-primary);">
                            <img src="${p.imagem_principal}" alt="${p.nome}" class="img-fluid rounded mb-3" style="height: 250px; object-fit: cover;">
                            <h4 class="text-danger-custom font-cinzel text-center">${p.nome}</h4>
                            <p class="text-truncate-custom flex-grow-1">${p.descricao}</p>
                            <div class="text-center mt-3">
                                <a href="detalhe.html?id=${p.id}" class="btn btn-danger-custom w-100">Ver Ficha Completa</a>
                            </div>
                        </article>
                    </div>`;
            }
        }
        container.innerHTML = cardsHTML;
    } catch(err) {
        console.error(err);
    }
}