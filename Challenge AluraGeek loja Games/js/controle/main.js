import { listaProdutosApi } from "../conecta/conecta.js";

const caixaProdutos = document.querySelector("[data-produtos]");
const formulario = document.querySelector("[data-formulario]");


// Cria estrutura HTML para ser renderizada dinâmicamente com JS
function criadorCard({nome, preco, imagem, id}) {
    const cardCriado = document.createElement("div");
    cardCriado.classList.add("card");

    cardCriado.innerHTML = `
            <div class="card-imagem">
              <img src="${imagem}" alt="${nome}" />
            </div>
            <h2 class="card-nome">${nome}</h2>
            <div class="card-elementos-baixo">
              <p class="card-preco">R$ ${preco}</p>
              <button class="card-lixeira" data-id="${id}">
                <img  src="imagens/lixeira.png" alt="Excluir"/>
              </button>              
            </div>
        
    `;

     // Evento de exclusão
    addDeleteEvent(cardCriado, id);

    return cardCriado;
}

// Evento de exclusão do produto
function addDeleteEvent(cardCriado, id) {
    const botaoDeletar = cardCriado.querySelector(".card-lixeira");
    botaoDeletar.addEventListener("click" , async () => {
        try {
            const excluirProduto = await listaProdutosApi.deletarProduto(id);
            cardCriado.remove();
        } catch (error) {
            console.log(`Erro ao excluir o produto id ${id}`);
        }
    });
}

// Renderiza os produtos no DOM
const renderProdutos = async () => {
    try {
        const listaProdutos = await listaProdutosApi.listaProdutos();
        listaProdutos.forEach((produto) => {
            const produtoCard = criadorCard(produto);
            caixaProdutos.appendChild(produtoCard);
        });
    } catch (error) {
        console.log('Erro ao renderizar produtos', error)
    }
};

// Evento de envío do formulário
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    
    if (nome === "" || preco === "" || imagem === "") {
        alert('Preencha todos os campos do formulário');
    } else {
        try {
            const novoProduto = await listaProdutosApi.criarProduto(
                nome,
                preco,
                imagem
            );

            const novoCard = criadorCard(novoProduto);
            caixaProdutos.appendChild(novoCard);
        } catch (error) {
            console.log('Erro ao criar produto', error);
        }
        formulario.reset();
    }
});

renderProdutos();



