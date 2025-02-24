'use strict'

import { getContatos, postContato, editarContato, deleteContato } from "./funcoes.js";
import { tratativaData, tratativaCelular, tratativaTelefone, validarContato, tratativaLimiteCaracteres } from "./tratativas.js";

async function carregarContatos() {
    try {
        const listaContatos = await getContatos();
        console.log(listaContatos);
        
        listaContatos.forEach(criarContatoElement);
    } catch (error) {
        console.error("Erro ao carregar contatos:", error);
        Swal.fire({
            title: "Erro",
            text: "Não foi possível carregar os contatos.",
            icon: "error"
        });
    }
}



function criarContatoElement(info){    
    const contact = document.createElement("div")
    contact.classList.add("contact")
    contact.id = `contact-${info.id}`;

    const hr = document.createElement('hr')
    const row = document.createElement('div')
    row.classList.add("align-items-center")
    const nome = document.createElement("p")
    nome.textContent=info.nome
    const nascimento = document.createElement("p")
    nascimento.textContent=info.data_nascimento.split('-').reverse().join('/')
    const email = document.createElement("p")
    email.textContent=info.email
    const celular = document.createElement("p")
    celular.textContent=info.celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
    const iconsField = document.createElement('div')
    iconsField.classList.add('iconsField', 'd-flex', 'align-items-center', 'h-100')
    const editIconDiv = document.createElement("div")
    editIconDiv.classList.add("h-100")
    editIconDiv.setAttribute('role',"button")
    editIconDiv.setAttribute('data-bs-toggle',"modal")
    editIconDiv.setAttribute('data-bs-target',"#modalEdicao")

    editIconDiv.addEventListener("click", () => {
        preencherModal(info);
    });

    
    const editIcon = document.createElement("img")
    editIcon.classList.add("h-50")
    editIcon.src='./src/editar.png'
    editIcon.alt="ícone editar"
    document.getElementById("contactList")
    const deleteIconDiv = document.createElement("div")
    deleteIconDiv.addEventListener("click",()=>deleteButtonPressed(info.id))
    deleteIconDiv.classList.add("h-100")
    deleteIconDiv.setAttribute('role',"button")
    const deleteIcon = document.createElement("img")
    deleteIcon.classList.add("h-50")
    deleteIcon.src = './src/excluir.png'
    deleteIcon.alt="ícone excluir"
    editIconDiv.replaceChildren(editIcon)
    deleteIconDiv.replaceChildren(deleteIcon)
    iconsField.replaceChildren(editIconDiv,deleteIconDiv)
    row.replaceChildren(nome,nascimento,email,celular,iconsField)
    contact.replaceChildren(hr,row)
    document.getElementById("contactList").appendChild(contact)
}
function preencherModal(info) {    
    document.getElementById("modalBotaoEdicao").setAttribute("data-id", info.id);
    document.getElementById("input-name").value = info.nome;
    document.getElementById("input-email").value = info.email;
    document.getElementById("input-nascimento").value = info.data_nascimento.split('-').reverse().join('/');
    document.getElementById("input-profissao").value = info.profissao;
    document.getElementById("input-telefone").value = info.telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    document.getElementById("input-celular").value = info.celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    document.getElementById("possuiWhatsappEdit").checked = info.possui_whatsapp==1?true:false;
    document.getElementById("notEmailEdit").checked = info.notificacoes_email==1?true:false;
    document.getElementById("notSmsEdit").checked = info.notificacoes_sms==1?true:false;
}
async function deleteButtonPressed(id) {
    const result = await deleteContato({ id });

    if (result) {
        const contactElement = document.querySelector(`#contact-${id}`);
        
        if (contactElement) {
            contactElement.remove();
        }
    } else {
        Swal.fire({
            title: "Erro",
            text: "Não foi possível excluir o contato.",
            icon: "error"
        });
    }
}
carregarContatos()

document.getElementById("data").addEventListener("focusin", (event) => {
    if (event.target.tagName === "INPUT") {
        event.target.parentElement.classList.add("foco");
    }
});

document.getElementById("data").addEventListener("focusout", (event) => {
    if (event.target.tagName === "INPUT") {
        event.target.parentElement.classList.remove("foco");
    }
});

document.getElementById('nome').addEventListener('input',(e)=>tratativaLimiteCaracteres(e,50))
document.getElementById('email').addEventListener('input',(e)=>tratativaLimiteCaracteres(e,100))
document.getElementById('profissao').addEventListener('input',(e)=>tratativaLimiteCaracteres(e,30))

document.getElementById('nascimento').addEventListener('input',(e)=>tratativaData(e))
document.getElementById('celular').addEventListener('input',(e)=>tratativaCelular(e))
document.getElementById('telefone').addEventListener('input',(e)=>tratativaTelefone(e))
document.getElementById('input-nascimento').addEventListener('input', (e)=>tratativaData(e));
document.getElementById('input-celular').addEventListener('input', (e)=>tratativaCelular(e));
document.getElementById('input-telefone').addEventListener('input', (e)=>tratativaTelefone(e));


document.getElementById('buttonCadastro').addEventListener('click',pressedCadastro)
async function pressedCadastro(){
    const nome = document.getElementById('nome').value
    const nascimento = document.getElementById('nascimento').value
    const email = document.getElementById('email').value
    const profissao = document.getElementById('profissao').value
    const telefone = document.getElementById('telefone').value
    const celular = document.getElementById('celular').value
    const checkPossuiWhatsapp = document.getElementById('possuiWhatsapp').checked
    const checkNotEmail = document.getElementById('notEmail').checked
    const checkNotSms = document.getElementById('notSms').checked


    const validacao = validarContato({nome,nascimento,email,telefone,celular,profissao});

    if(validacao.valido){
        const jsonContato = {
            nome,
            data_nascimento: nascimento.split('/').reverse().join('-'),
            email,
            profissao,
            telefone: telefone.replace(/\D/g, ''),
            celular: celular.replace(/\D/g, ''),
            possui_whatsapp: checkPossuiWhatsapp,
            notificacoes_email: checkNotEmail,
            notificacoes_sms: checkNotSms,
        }        
        const result = await postContato(jsonContato);
        if(result){
            console.log('Resposta enviada com sucesso!');
            criarContatoElement(jsonContato)
            Swal.fire({
                title: "Sucesso",
                text: "Contato cadastrado",
                icon: "success"
              });
        } else {
            console.error('Erro ao criar contato:', result);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro interno no servidor",
                icon: "error"
              });
        }
    } else {
        Swal.fire({
            title: "Dados inválidos",
            text: validacao.mensagem||"Dados inválidos",
            icon: "question"
          });
    }
}

document.getElementById("modalBotaoEdicao").addEventListener("click", async function () {
    const id = this.getAttribute("data-id");
    const nome = document.getElementById('input-name').value;
    const nascimento = document.getElementById('input-nascimento').value;
    const email = document.getElementById('input-email').value;
    const profissao = document.getElementById('input-profissao').value;
    const telefone = document.getElementById('input-telefone').value;
    const celular = document.getElementById('input-celular').value;
    const checkPossuiWhatsapp = document.getElementById('possuiWhatsappEdit').checked;
    const checkNotEmail = document.getElementById('notEmailEdit').checked;
    const checkNotSms = document.getElementById('notSmsEdit').checked;

    const validacao = validarContato({nome,nascimento,email,telefone,celular,profissao});

    if (validacao.valido) {
        const contatoAtualizado = {
            id,
            nome,
            data_nascimento: nascimento.split('/').reverse().join('-'),
            email,
            profissao,
            telefone: telefone.replace(/\D/g, ''),
            celular: celular.replace(/\D/g, ''),
            possui_whatsapp: checkPossuiWhatsapp,
            notificacoes_email: checkNotEmail,
            notificacoes_sms: checkNotSms
        };     
        console.log(contatoAtualizado);
           
        const result = await editarContato(contatoAtualizado);
        if (result) {
            console.log('Contato atualizado com sucesso!');
            Swal.fire({
                title: "Sucesso",
                text: "Contato atualizado",
                icon: "success"
            });
        } else {
            console.error('Erro ao atualizar contato:', result);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro interno no servidor",
                icon: "error"
            });
        }
    } else {
        Swal.fire({
            title: "Dados inválidos",
            text: validacao.mensagem || "Dados inválidos",
            icon: "warning"
        });
    }
});


