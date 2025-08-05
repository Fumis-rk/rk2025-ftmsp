
const url = "https://raw.githubusercontent.com/Fumis-rk/rk2025-ftmsp/main/RK_FTMSP_site%20-%20P%C3%A1gina1.csv";

let dados = [];

async function carregarCSV() {
    const resposta = await fetch(url);
    const texto = await resposta.text();
    const linhas = texto.split("\n");
    const cabecalho = linhas[0].split(",");

    dados = linhas.slice(1).map(l => {
        const valores = l.split(",");
        const entrada = {};
        cabecalho.forEach((chave, i) => entrada[chave.trim()] = valores[i]);
        return entrada;
    });

    preencherCategorias();
}

function preencherCategorias() {
    const select = document.getElementById("categoriaSelect");
    const categorias = [...new Set(dados.map(d => d["Categoria"]))].sort();

    categorias.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });

    select.addEventListener("change", () => mostrarRanking(select.value));
    mostrarRanking(categorias[0]);
}

function mostrarRanking(categoria) {
    const tabela = document.querySelector("#rankingTable tbody");
    tabela.innerHTML = "";

    const filtrados = dados.filter(d => d["Categoria"] === categoria)
                           .sort((a, b) => parseInt(a["Colocação"]) - parseInt(b["Colocação"]));

    filtrados.forEach(atleta => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${atleta["Colocação"]}</td>
            <td><a href="atleta.html?nome=${encodeURIComponent(atleta["Nome Atleta"])}&categoria=${encodeURIComponent(atleta["Categoria"])}">${atleta["Nome Atleta"]}</a></td>
            <td>${atleta["Clube"]}</td>
            <td>${atleta["Pontuação Total"]}</td>
        `;
        tabela.appendChild(tr);
    });
}

carregarCSV();
