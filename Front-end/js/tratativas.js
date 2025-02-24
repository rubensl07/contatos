export function tratativaData(e){
    

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 8) {
        value = value.slice(0, 8); 
    }

    let formattedValue = "";
    if (value.length > 4) {
        formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
        formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
        formattedValue = value;
    }

    e.target.value = formattedValue;

}
export function tratativaCelular(e){

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) {
        value = value.slice(0, 11); 
    }

    let formattedValue = "";
    if (value.length > 6) {
        formattedValue = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
        formattedValue = `(${value.slice(0, 2)})${value.slice(2)}`;
    } else {
        formattedValue = value;
    }

    e.target.value = formattedValue;

}
export function tratativaTelefone(e){
let value = e.target.value.replace(/\D/g, "");

if (value.length > 10) {
    value = value.slice(0, 10);
}

let formattedValue = "";
if (value.length > 6) {
    formattedValue = `(${value.slice(0, 2)})${value.slice(2, 6)}-${value.slice(6)}`;
} else if (value.length > 2) {
    formattedValue = `(${value.slice(0, 2)})${value.slice(2)}`;
} else {
    formattedValue = value;
}

e.target.value = formattedValue;
}

export function tratativaLimiteCaracteres(e,limite) {
    e.target.value = e.target.value.slice(0, limite);
}


export function validarContato(contato) {
    if (!contato.nome || !contato.nascimento || !contato.email || !contato.telefone || !contato.celular) {
        return { valido: false, mensagem: "Todos os campos devem ser preenchidos" };
    }

    if (contato.nascimento) {
        const dataFormatada = contato.nascimento.split('/').reverse().join('-'); // Converte DD/MM/YYYY para YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (!regex.test(dataFormatada)) {
            return { valido: false, mensagem: "Data de nascimento inválida" };
        }

        const [ano, mes, dia] = dataFormatada.split("-").map(Number);
        const anoAtual = new Date().getFullYear();

        if (ano < 1900 || ano > anoAtual) {
            return { valido: false, mensagem: "Data de nascimento inválida" };
        }

        const dataObj = new Date(ano, mes - 1, dia);
        if (!(dataObj.getFullYear() === ano && dataObj.getMonth() === mes - 1 && dataObj.getDate() === dia)) {
            return { valido: false, mensagem: "Data de nascimento inválida" };
        }
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(contato.nome)) {
        return { valido: false, mensagem: "Nome não é válido" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.email)) {
        return { valido: false, mensagem: "Formato de e-mail não é válido" };
    }

    if (!/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/.test(contato.telefone)) {
        return { valido: false, mensagem: "Telefone não é válido" };
    }

    if (!/^(\+?\d{1,4})?\s?\(?\d{1,4}\)?\s?\d{4,5}-?\d{4,5}$/.test(contato.celular)) {
        return { valido: false, mensagem: "Celular não é válido" };
    }

    return { valido: true, mensagem: null};
}