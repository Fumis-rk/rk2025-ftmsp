
const urlParams = new URLSearchParams(window.location.search);
const nome = decodeURIComponent(urlParams.get("nome"));
const categoria = decodeURIComponent(urlParams.get("categoria"));

const url = "https://raw.githubusercontent.com/Fumis-rk/rk2025-ftmsp/main/RK_FTMSP_site%20-%20P%C3%A1gina1.csv";

async function carregarAtleta() {
    const resposta = await fetch(url);
    const texto = await resposta.text();
    const linhas = texto.split("\n");
    const cabecalho = linhas[0].split(",");

    const dados = linhas.slice(1).map(l => {
        const valores = l.split(",");
        const entrada = {};
        cabecalho.forEach((chave, i) => entrada[chave.trim()] = valores[i]);
        return entrada;
    });

    const atleta = dados.find(d => d["Nome Atleta"] === nome && d["Categoria"] === categoria);

    if (atleta) {
        document.getElementById("nomeAtleta").textContent = atleta["Nome Atleta"];
        document.getElementById("detalhesAtleta").textContent = `Categoria: ${atleta["Categoria"]} | Clube: ${atleta["Clube"]} | Pontuação Total: ${atleta["Pontuação Total"]}`;

        const etapas = Object.keys(atleta).filter(k => k.startsWith("Etapa"));
        const tbody = document.querySelector("#etapasTable tbody");

        etapas.forEach(etapa => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${etapa}</td><td>${atleta[etapa]}</td>`;
            tbody.appendChild(tr);
        });
    }
}

carregarAtleta();
