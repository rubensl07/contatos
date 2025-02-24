const url = 'http://localhost:8000'
const link = `${url}`


export async function getContatos() {
    const endpoint = `${link}/contatos`;
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
}


export async function postContato(dados) {
    try {
        const endpoint = `${link}/contatos`
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        const data = await response.json()        
        return data
    } catch (error) {
        console.error("Erro:", error)
        throw error;
    }

}

export async function deleteContato(dados) {
    try {
        const endpoint = `${link}/contatos`;
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error('Falha ao excluir o contato');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function editarContato(dados) {
    try {
        const endpoint = `${link}/contatos`;
        const response = await fetch(endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar o contato');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}