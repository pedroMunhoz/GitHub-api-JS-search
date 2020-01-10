const app = document.getElementById('app');

var quant = localStorage.getItem('contador') || 0;
var saved = localStorage.getItem('usuarios');

if (saved) {
    app.innerHTML = saved;
}

document.body.setAttribute('style', "margin: 0; background-size: cover;");
document.body.setAttribute('bgcolor', '#444');
app.setAttribute('style', 'background: #333; display: flex; flex-direction: row;align-items: center; justify-content: center');

var user = '';

var inputElement = document.createElement('input');
inputElement.setAttribute('placeholder', 'Usuario');
inputElement.setAttribute('style', "width: 100%; margin-bottom: 10px; padding: 12px 20px; box-sizing: border-box;background-color: #333;color: white; border: 2px #333;border-radius: 4px; background-image: url('searchicon.png'); background-repeat: no-repeat; background-position: 10px 10px; padding-left: 40px; background-size: 20px 20px");
var btnElement = document.createElement('button');
btnElement.textContent = 'Pesquisar';

var divInput = document.createElement('div');
divInput.setAttribute('style', 'margin: 10px; display: flex; flex-direction: column; justify-content:center; align-items: center;');
document.body.appendChild(divInput);

divInput.appendChild(inputElement);
divInput.appendChild(btnElement);

btnElement.onclick = function() {
    user = inputElement.value;

    axios.get('https://api.github.com/users/' + user)
    .then(function(response) {
        quant = parseInt(quant) + 1;

        if(quant > 3) {
            app.removeChild(document.getElementById(quant-3));
        }

        var div = document.createElement('div');
        var imgElement = document.createElement('IMG');
        var linkElement = document.createElement('a');
        var headerDiv = document.createElement('div');
        var nameDiv = document.createElement('div');

        linkElement.setAttribute('id', quant);
        inputElement.setAttribute('width', '100%');
        linkElement.setAttribute('href', 'http://github.com/' + user);
        linkElement.setAttribute('style', 'text-decoration:none;');
        
        linkElement.appendChild(div);
        app.appendChild(linkElement);
        div.appendChild(headerDiv);
        div.appendChild(nameDiv);
        div.appendChild(imgElement);

        div.setAttribute('style', 'margin: 10px; background: #222; display: flex; flex-direction: column; justify-content:center; align-items: center;');
        headerDiv.setAttribute('style', "margin: 10px; justify-content:center; align-items: center; color:#EEE; font-weight: bold; font-size: 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;")
        nameDiv.setAttribute('style', 'margin-bottom: 15px; color:#BBB')
        document.body.setAttribute('background', '#333');

        var img = response.data.avatar_url;
        var text = response.data.login;
        var name = response.data.name;

        imgElement.setAttribute('src', img);
        imgElement.setAttribute('margin', 'auto');
        nameDiv.textContent = '@' + text;
        headerDiv.textContent = name;

        localStorage.setItem('usuarios', document.getElementById('app').innerHTML);
        localStorage.setItem('contador', quant);
    })
    .catch(function(error) {
        alert('Usuário ' + user + ' não encontrado');
    })
 }