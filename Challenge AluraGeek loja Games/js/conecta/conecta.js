//criar função requisição get(traga os dados)
const listaProdutos = async () => {
    try {
        const resposta = await fetch ("http://localhost:3000/produtos");
        const dadosConferidos = await resposta.json();
        return dadosConferidos;
        
    } catch (error) {
        console.log('Erro ao buscar lista de produtos')
    }
};

// Requisicao POST (busca/retorna dados)
const criarProduto = async (nome, preco, imagem) => {
  try {
    const resposta = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {nome, preco, imagem }),
    });

    const dadosConferidos = await resposta.json();
    console.log("Solicitação POST feita com sucesso:", dadosConferidos);
    return dadosConferidos;
  } catch (error) {
    console.log("Erro na solicitação POST", error);
  }
};

const deletarProduto = async (id) => {
  try {
    const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Produto com id ${id} deletado com sucesso`);
  } catch (error) {
    console.error("Erro na solicitação de excluir:", error);
  }
};

export const listaProdutosApi = {
    listaProdutos, criarProduto, deletarProduto
};

