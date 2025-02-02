// app.js
let synth = window.speechSynthesis;
let voices = [];
let currentUtterance = null;

const descriptions = {
    nature: [
        {
            scene: "Floresta à Noite",
            description: "Você está em uma floresta densa. O ar é frio e úmido, com o cheiro de terra molhada...",
        }
    ],
    objects: [
        {
            scene: "Xícara de Café",
            description: "Uma xícara de porcelana branca, ainda quente ao toque...",
        }
    ],
    memories: [
        {
            scene: "Praia da Infância",
            description: "Areia fina e quente sob seus pés. O mar azul-turquesa quebra em ondas suaves...",
        }
    ]
};

function populateVoices() {
    voices = synth.getVoices().filter(v => v.lang.startsWith('pt'));
    const voiceSelect = document.getElementById('voiceSelect');
    
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = voice.name + ' (' + voice.lang + ')';
        voiceSelect.appendChild(option);
    });
}

function generateNewDescription() {
    const categories = Object.keys(descriptions);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const scene = descriptions[randomCategory][Math.floor(Math.random() * descriptions[randomCategory].length)];
    
    document.getElementById("sceneTitle").textContent = scene.scene;
    document.getElementById("textDescription").textContent = scene.description;
    
    if (currentUtterance) {
        synth.cancel();
    }
    
    currentUtterance = new SpeechSynthesisUtterance(scene.description);
    currentUtterance.voice = voices[document.getElementById('voiceSelect').value] || voices[0];
    currentUtterance.rate = 0.9;
    
    // Simula a barra de progresso
    currentUtterance.onstart = () => {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.duration = currentUtterance.text.length / 180; // Estimativa de duração
    };
    
    synth.speak(currentUtterance);
}

function changeVoice() {
    if (currentUtterance) {
        synth.cancel();
        generateNewDescription();
    }
}

function updateProgress() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (synth.speaking) {
        audioPlayer.currentTime = (Date.now() - startTime) / 1000;
    }
}

// Inicialização
window.onload = () => {
    populateVoices();
    synth.onvoiceschanged = populateVoices;
};
