//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
let tweets = [];


//EVENTOS
eventListeners()

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML()
    })
}


//FUNCIONES
function agregarTweet(e) {
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
        
    if(tweet === ''){
        mostrarError('No hay ningún tweet enviado');
        return;
    }         
    
    //Objeto para el tweet
    const tweetObj = {
        id : Date.now(), //Milisegundos desde 1/1/1970, lo usaré de ID único
        tweet : tweet //Podría dejarlo somo tweet, ya que key y value son iguales
    }

    //Agregando el tweet al array tweets
    tweets = [...tweets, tweetObj];
    
    //Crea HTML en "Mis Tweets"
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    //Insertando el error en el contenidos
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        contenido.removeChild(contenido.lastChild)
    }, 3000);
}

    //Muestra un listado con los tweets escritos
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0){
        tweets.forEach(tweet => {
            
            //Crear un botón para eliminar los tweets
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X'
            btnEliminar.classList.add('borrar-tweet')
            
            //Crear el HMTL
            const li = document.createElement('LI');
            li.textContent = tweet.tweet;

            //Insertar btnEliminar en HTML
            listaTweets.appendChild(btnEliminar)

            //Insertar texto en HMTL
            listaTweets.appendChild(li);

            //Agregar función al btnEliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

        });
    };

    if (tweets.length === 0){
        const emptyList = document.createElement('DIV');
        emptyList.textContent = 'Your to do list is currently empty';
        emptyList.classList.add('emptyTaskList');
        formulario.appendChild(emptyList);
    } else {
        formulario.removeChild(formulario.lastChild)
    }

    sincronizarStorage();
}

    //Limpiar HTML
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    };
};

    //Eliminar Tweet con btnEliminar
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
};

    //Agregar tweets al local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
};


