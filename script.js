function limparDiv(){
    const div = document.querySelector(".info");
    div.innerHTML = "";
}

//valida campo da página 
function validaForm(){
    var conteudo = document.getElementById("pagina").value;
    if(conteudo == "" || conteudo <= 0 || /[^A-Za-z\d]/.test(conteudo)){
        alert('Por favor, preencha com o número da página (maior que zero)');
        document.getElementById("pagina").focus();
        return false
    }
}

function rasparPagCarro(documento){
    //mostra conteúdo da div .info da página selecionada 
    limparDiv();
    validaForm();
    rasparCarro(documento);
}

function rasparCarro(documento){
    //mostra conteúdo da div .info
    var divsCarro = documento.querySelectorAll(".product");
    var div = document.querySelector(".info");
    divsCarro.forEach(df => {
        div.appendChild(df);
    });
}

function mandarReq(site,rasp){
    //O retorno do fetch eh uma promise
    //O retorno do then/catch tb eh uma promise
    fetch(site)
             .then(resp => resp.text())
             .then(str => {
                 var domp = new DOMParser();
                 var documento = domp.parseFromString(str,"text/html");
                 rasp(documento);
             })
             .catch(e => document.write(e));
}

function principal(){

        mandarReq("https://cors-anywhere.herokuapp.com/http://www.carmaxsantos.com.br/estoque/1",rasparCarro);

        document.querySelector("#btnCar")
        .addEventListener("click", function(){
            var digitado = document.querySelector("#pagina").value;
            mandarReq("https://cors-anywhere.herokuapp.com/http://www.carmaxsantos.com.br/estoque/" + digitado,rasparPagCarro);
        });
}
