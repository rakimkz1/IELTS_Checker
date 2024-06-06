const apiKey = "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";
const urlKey = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById("promptInput");
const generateButton = document.getElementById("generateButton");
const resultText = document.getElementById("resultText");

const generate = async () => {
    try {
        const response = await fetch(urlKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Evaluate the IElTS writing essay that the user enters according to the criteria: 'Coherence and cohesion', 'Lexical resource' and 'Grammatical range and accuracy' from one to ten. Strictly in numerical form." },
                    { role: "user", content: promptInput.value }
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            resultText.innerHTML = data.choices[0].message.content;
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Error:", error);
        resultText.innerHTML = "An error occurred. Please try again later.";
    }
};

generateButton.addEventListener("click", generate);
