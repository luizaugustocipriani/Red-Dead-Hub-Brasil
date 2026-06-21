Markdown
# 🤠 Red Dead Hub Brasil

Plataforma interativa com guias, busca de personagens e sistema de favoritos sobre o universo de **Red Dead Redemption 2**. Desenvolvido como atividade prática para a disciplina de Desenvolvimento Web (Engenharia de Software - 1º Período).

---

## 🚀 Como Rodar o Projeto

Siga estes passos simples para executar o site no seu computador com todas as funcionalidades ativas:

### 1. Pré-requisitos
Você precisa ter o **Node.js** instalado. Baixe em: [nodejs.org](https://nodejs.org/)

### 2. Configuração e Inicialização

1. Abra a pasta principal do projeto (`Red-Dead-Hub-Brasil`) no seu VS Code.
2. Abra o terminal do VS Code e instale o servidor local:
   ```bash
   npm install json-server
Inicie o banco de dados com o comando:

Bash
npx json-server --watch db/db.json
⚠️ Atenção: Não feche o terminal! O servidor precisa ficar rodando para os personagens e favoritos aparecerem na tela.

3. Abrir o Site
Com o terminal rodando, abra o arquivo index.html no seu navegador (ou use a extensão Live Server do VS Code).

🛠️ Recursos Implementados
Design Temático: Identidade visual baseada no jogo com paleta escura e fontes personalizadas (Cinzel e Poppins).

Responsividade Completa: Interface adaptável para celulares, tablets e computadores via Bootstrap 5.

Busca em Tempo Real: Filtragem dinâmica de personagens por nome ou descrição.

Sistema de Favoritos: Salvamento, listagem e remoção de favoritos integrados diretamente com a API local (fetch/POST/DELETE).

🧰 Tecnologias
HTML5 (Estrutura Semântica)

CSS3 (Estilização Customizada)

Bootstrap 5 (Grid e Componentes)

JavaScript ES6+ (Manipulação do DOM e Consumo de API)

JSON Server (Simulação de Banco de Dados)

👤 Autor
Luiz Augusto — Aluno de Engenharia de Software (1º Período)