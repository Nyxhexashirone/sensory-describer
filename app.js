// Banco de dados de descrições (exemplo: descriptions/nature.json)
const descriptions = {
    nature: [
        {
            scene: "Floresta à Noite",
            description: "Você está em uma floresta densa. O ar é frio e úmido, com o cheiro de terra molhada. O luar filtra-se pelas folhas, criando padrões prateados no chão...",
        }
    ],
    objects: [
        {
            scene: "Xícara de Café",
            description: "Uma xícara de porcelana branca, ainda quente ao toque. O café escuro em seu interior reflete a luz suave da manhã, com um leve aroma de canela...",
        }
    ],
    memories: [
        {
            scene: "Praia da Infância",
            description: "Areia fina e quente sob seus pés. O mar azul-turquesa quebra em ondas suaves, e o cheiro de protetor solar mistura-se ao aroma de coco...",
        }
    ]
};

function generateDescription(category) {
    const scene = descriptions[category][Math.floor(Math.random() * descriptions[category].length)];
    document.getElementById("sceneTitle").textContent = scene.scene;
    document.getElementById("textDescription").textContent = scene.description;
    synthesizeSpeech(scene.description);
}

function synthesizeSpeech(text) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Para áudios anteriores
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; 
    speechSynthesis.speak(utterance);
}
