//-----------------Validação do CEP informado-----------------//

function limpa_formulario_cep() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
}
else {
    //se CEP não for encontrado
    limpa_formulario_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//deixa apenas dígitos no CEP
var cep = valor.replace(/\D/g, '');

if (cep != "") {

    var validacep = /^[0-9]{8}$/;


    if(validacep.test(cep)) {

        // campos "..." durante consulta webservice
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";

        //cria elemento js.
        var script = document.createElement('script');

        //sincroniza com callback
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //insere script no documento e carrega conteúdo
        document.body.appendChild(script);

    }
    else {
        //se o cep for inválido
        limpa_formulario_cep();
        alert("Formato de CEP inválido.");
    }
}
else {
    //limpar formulário em caso de CEP sem valor
    limpa_formulario_cep();
}
};
