
const API_KEY = "AIzaSyCpbuo-et027HDi09surhgdsHvtxSGrzJQ";
const MODEL_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';
    recognition.start();
    recognition.onresult = function(event) {
        const userInput = event.results[0][0].transcript;
        document.getElementById('userText').innerText = "आपने पूछा: " + userInput;
        fetchResponse(userInput);
    };
}

function fetchResponse(text) {
    fetch(MODEL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: text }]
            }]
        })
    })
    .then(res => res.json())
    .then(data => {
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "उत्तर नहीं मिला";
        document.getElementById('botResponse').innerText = "AI जवाब: " + reply;
        speakHindi(reply);
    })
    .catch(err => {
        document.getElementById('botResponse').innerText = "त्रुटि: " + err.message;
    });
}

function speakHindi(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    speechSynthesis.speak(utterance);
}
