JSON APIs and AJAX:

-Json (JavaScript Object Notation): é um formato de dados leves e de fácil leitura, que é comumente utilizado para a comunicação de dados entre um servidor e um cliente web. É frequentemente utilizado para transmitir dados estruturados, como configurações, listas de produtos, resultados de consultas de banco de dados e muito mais.

-APIs (Application Programming Interface) baseada em JSON: é um conjunto de rotas ou endpoints em um servidor web que aceita requisições HTTP e retorna dados formatados em JSON;

-AJAX (Asynchronous JavaScript and XML): é uma abordagem de desenvolvimento web que permite atualizações de página assíncronas, permite que partes de uma página web sejam atualizadas sem precisar recarregar a página inteira.
Isso é feito utilizando a API XMLHttpRequest (XHR) em JavaScript para enviar e receber dados do servidor sem interromper a experiência do usuário na página;

-Gerencie "Click Events" com javascript utilizando a propriedade "onclick":
Queremos que nosso código execute apenas quando nossa página terminar de carregar. 
Para este propósito, podemos inserir um evento Javascript ao documento chamado "DOMContentLoaded". 

Vejamos o código:
document.addEventListener('DOMContentLoaded', function() {

});

Podemos implementar eventos dentro de nossa função DOMContentLoaded.
Por exemplo, podemos implementar um "onclick" evento que será acionado quando o usuário "clicar" em nosso <button> de id="getMessage", adicionando o seguinte código dentro de nossa função:

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getMessage').onclick = function(){

    };
});

-Acesse JSON através do método XMLHttpRequest do Javascript:
Com base no exemplo acima, poderiamos incluir um comando para alterar o conteúdo de algum elemento através do evento "onclick". Contudo, podemos também requisitar "data" de fontes externas. É ai quem entram as APIs.
Vale lembrar que as APIs são ferramentas que computadores usam para se comunicar. 
A maioria das APIs transferem dados no formato JSON.
A sintax de um JSON é muito similar à do Javascript, Json possuem objetos (propriedades) e seus respectivos valores adicionados entre {}
Essas propriedades e valores são frequentemente associados a "key-value pairs".
Entretanto, JSON transmitida por APIs são enviadas em 'bytes' e nosso aplicativo recebe isso como uma 'string'. Esses podem ser convertidos a objetos Javascript, mas não são objetoc Javascript por padrão.
O método JSON.parse analisa a string e constroi o objecto JavaScript descrito;

Vejamos um exemplo de requisição JSON de uma API "Cat Photo" do freeCodeCamp:

const req = new XMLHttpRequest();
req.open("GET",'/json/cats.json',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json);
};

Analisaremos item por item:
XMLHttpRequest - este objeto javascript tem um número de propriedades e metodos que são utilizados para transferir dados. Primeiramente, uma instância do objeto XMLHttpRequest é criada e gravada na variável "req"; 
open - Após, o metodo open inicializa a requisição. O exemplo acima está requisitando dados de uma API, portanto, é uma requisição GET. O segundo argumento para nosso 'open' é o URL de nossa API que estamos requisitando os dados. O terceiro argumento é um 'boolean', onde 'true' torna a requisição asincrona.
send - O método 'send' envia a requisição. 
onload - finalmente, o "event handler" 'onload' analisa o dado retornado e aplica o metodo JSON.stringify para converter o objeto JavaScript em uma string. A string então é inseridas como mensagem de text.

Logo, poderíamos também adicionar a requisição dentro de nosso evento onclick acima mencionado, para que a requisição fosse efetuada assim que o usuário acionasse o evento:

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getMessage').onclick = function(){

        const req = new XMLHttpRequest();
        req.open("GET", '/json/cats.json', true);
        req.send();
        req.onload = function(){
            const json = JSON.parse(req.responseText);
            document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json);
        }
    };
});

-Obtenha o JSON através do método 'fetch' do Javascript:
Outra forma de realizarmos a requisição externa de dados é através do metodo 'fetch()';
É equivalente ao XMLHttpRequest, mas sua sintax é considerada mais simples.

Vejamos exemplo:
    fetch('/json/cats.json')
    .then(response => response.json())
    .then(data => {
         document.getElementById('message').innerHTML = JSON.stringify(data);
  })

Analisaremos linha por linha:
-A primeira linha faz a requisição. Então, fetch(URL) faz a requisição 'get' ao URL indicado. O método retorna uma 'promise'.
-Retornada a 'promise', se a requisição foi bem sucedida, o método 'then' é executado, o qual pega a resposta e converte ao formato JSON.
-O método 'then' também retorna uma promise, a qual é gerenciada pelo próximo método 'then'. 
O argumento contido no segundo método 'then' é o objeto JSON que desejamos;
-No exemplo, agora, nosso código seleciona o elemento que vai receber a data através de 'document.getElementById()'. Então, modifica o HTML original do código inserindo a string criado do objeto JSON retornado de nossa requisição.

-Analisando o formato padrão de uma JSON:
O primeiro e último caracteres geralmente são []
Isso significa que o dado é retornado através de uma array
O segundo caracter (também o penultimo) são {}, o que inicia um objeto. Podendo existir vários objetos.
Vejamos como exemplo o JSON Cat Photo obtido junto ao freecodeCamp:

[{"id":0,"imageLink":"https://s3.amazonaws.com/freecodecamp/funny-cat.jpg","altText":"A white cat wearing a green, helmet shaped melon on its head. ","codeNames":["Juggernaut","Mrs. Wallace","Buttercup"]},{"id":1,"imageLink":"https://s3.amazonaws.com/freecodecamp/grumpy-cat.jpg","altText":"A white cat with blue eyes, looking very grumpy. ","codeNames":["Oscar","Scrooge","Tyrion"]},{"id":2,"imageLink":"https://s3.amazonaws.com/freecodecamp/mischievous-cat.jpg","altText":"A ginger cat with one eye closed and mouth in a grin-like expression. Looking very mischievous. ","codeNames":["The Doctor","Loki","Joker"]}]

Conforme acima mencionado, objetos possuem "key-value pairs", que são separados por ','. No exemplo acima, o primeiro objeto possui "id": 0 - onde id é a nossa "key" e "0" o seu valor. Da mesma forma, existem "keys" para 'imageLink', 'altText' e 'codeNames'. Cada objeto (no exemplo acima temos 3) possui os mesmos 'keys', contudo, com valores diferentes.

Vale destacar que, levando como base o primeiro objeto de nosso exemplo, em nosso "key-value pair" - "codeNames":["Juggernaut","Mrs. Wallace","Buttercup"], 'codeNames' é nossa key e seu valor é composto por uma array de 3 strings. Array usa [] para acessar um item específico. Objetos usam tanto [] quanto 'dot notatin' para acessar valores;

Por exemplo:

console.log(json[0].altText);
The console would display the string A white cat wearing a green helmet shaped melon on its head.


-Convertendo 'Json Data' para HTML:
Levando como base o exemplo acima - JSON Cat Photo, podemos utilizar o método 'forEach' para criar um loop através dos dados e modificar os elementos de nosso HTML.
Para tanto, primeiro temos que declarar uma variável como - let html = "";
Então, podemos criar o nosso loop através de nosso JSON, adicionando HTML:

Exemplo:
let html = "";
json.forEach(function(val) {
  const keys = Object.keys(val);
  html += "<div class = 'cat'>";
  keys.forEach(function(key) {
    html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
  });
  html += "</div><br>";
});

-Renderizando imagens da fonte de dados:
Durante nosso loop sobre os objetos, podemos utilizar a "imageLink" para exibir imagens em um elemento <img>
Exemplo:

html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";

-Obtenha dados de GeoLocalização para encontrar as coordenadas GPS do usuário:
Todo navegador tem um sistema nativo que pode nos fornecer esta informação.
O navegador irá obter a atual longitude e latitude do usuário.
Para isso será exibido um 'pop-up' para que o usuário permite o navegador obter tais informações.
O código para realizar este tipo de requisição é:

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('data').innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
  });
}

First, it checks if the navigator.geolocation object exists. If it does, the getCurrentPosition method on that object is called, which initiates an asynchronous request for the user's position. If the request is successful, the callback function in the method runs. This function accesses the position object's values for latitude and longitude using dot notation and updates the HTML.

-Post Data with the JavaScript XMLHttpRequest Method:
Nos exemplos anteriores vimos como receber dados de uma fonte externa. Podemos também enviar dados à fonte externa, desde que a fonte suporte requisições AJAX e tenhamos o URL.

JavaScript's XMLHttpRequest method is also used to post data to a server. Here's an example:
const xhr = new XMLHttpRequest();
xhr.open('POST', url, true);
xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 201){
    const serverResponse = JSON.parse(xhr.response);
    document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
  }
};
const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' });
xhr.send(body);

You've seen several of these methods before. Here the open method initializes the request as a POST to the given URL of the external resource, and passes true as the third parameter - indicating to perform the operation asynchronously.
The setRequestHeader method sets the value of an HTTP request header, which contains information about the sender and the request. It must be called after the open method, but before the send method. The two parameters are the name of the header and the value to set as the body of that header.
Next, the onreadystatechange event listener handles a change in the state of the request. A readyState of 4 means the operation is complete, and a status of 201 means it was a successful request. Therefore, the document's HTML can be updated.
Finally, the send method sends the request with the body value. The body consists of a userName and a suffix key.

