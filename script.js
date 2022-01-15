let musicas = [
    {titulo:'Call Out My Name', artista:'The Weeknd', src:'songs/CallOutMyName.mpeg',
    img:'imgs/CallOutMyName.jpg'},
    {titulo:'High Enough', artista:'K.Flay', src:'songs/HighEnough.mpeg',
    img:'imgs/HighEnough.jpg'},
    {titulo:'Black out Days', artista:'toastool', src:'songs/BlackOutDays.mpeg',
    img:'imgs/BlackOutDays.jpg'},
    {titulo:'Enemy', artista:'Imagine Dragons', src:'songs/enemy.mpeg',
    img:'imgs/enemy.jpg'},
    {titulo:'Save Your Tears', artista:'The Weeknd', src:'songs/SaveYourTears.mpeg',
    img:'imgs/SaveYourTears.jpg'},
    {titulo:'Natural', artista:'Imagine Dragons', src:'songs/natural.mpeg',
    img:'imgs/natural.jpg'},
    {titulo:'Eleanor Rigby', artista:'The Beatles', src:'songs/EleanorRigby.mpeg',
    img:'imgs/EleanorRigby.jpg'},
];

let musica = document.querySelector("audio");
let indexMusica = 0;

let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2")
let nomeArtista =  document.querySelector(".descricao i")

renderizarMusica(indexMusica);

// Capturando a duração da música
let duracaoMusica = document.querySelector(".fim");

/* ------------------- Eventos ---------------------- */

// Capturando o elemento play, e criando um evento
document.querySelector(".botao-play").addEventListener("click", tocarMusica);
// Capturando o elemento pause, e criando um vento
document.querySelector(".botao-pause").addEventListener("click", pausarMusica);
// Criando o evento de dar replay em uma música
document.querySelector(".replay").addEventListener("click", replay);
// Criando o evento de dar like em uma música
document.querySelector(".likeOff").addEventListener("click", darLike);
// Criando o evento de dar dislike em uma música
document.querySelector(".likeOn").addEventListener("click", darDislike);
// Criando o evento de atualizar a barra
musica.addEventListener("timeupdate", atualizarBarra);
// Criando o evento de voltar a música
document.querySelector(".voltar").addEventListener("click", () => {
    indexMusica--;
    if (indexMusica < 0){
        indexMusica = 6;
    }
    
    document.querySelector(".likeOff").style.display = "block";
    document.querySelector(".likeOn").style.display = "none";
    
    let barra = document.querySelector("progress");
    barra.style.width = "0%";
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block"
    renderizarMusica(indexMusica)
});
// Criando o evento de passar música
document.querySelector(".passar").addEventListener("click", () => {
    indexMusica++;
    if (indexMusica > 6){
        indexMusica = 0;
    }
    
    document.querySelector(".likeOff").style.display = "block";
    document.querySelector(".likeOn").style.display = "none";
    
    let barra = document.querySelector("progress");
    barra.style.width = "0%";
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
    renderizarMusica(indexMusica);
});

/* ------------------- Funções ---------------------- */

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    musica.addEventListener("loadeddata", () => {
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector(".botao-pause").style.display = "block";
    document.querySelector(".botao-play").style.display = "none"
}

function pausarMusica() {
    musica.pause();
    document.querySelector(".botao-play").style.display = "block";
    document.querySelector(".botao-pause").style.display = "none";
}

function atualizarBarra() {
    // Atualizando o tamanho da barra
    let barra = document.querySelector("progress");
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + "%";

    // Atualizando o tempo corrido da música
    let tempoDecorrido = document.querySelector(".inicio");
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function replay() {
    let barra = document.querySelector("progress");
    barra.style.width = "0%";
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
    renderizarMusica(indexMusica);
}

function darLike() {
    document.querySelector(".likeOff").style.display = "none";
    document.querySelector(".likeOn").style.display = "block";
}

function darDislike() {
    document.querySelector(".likeOff").style.display = "block";
    document.querySelector(".likeOn").style.display = "none";
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = `0${campoSegundos}`;
    }

    return `${campoMinutos}:${campoSegundos}`;
}
