const apiKey = "sk-proj-LDDez18jJobR87m3vJYYT3BlbkFJKdfRvbl8WaEc82NhKi3m";
const urlKey = "https://api.openai.com/v1/chat/completions"

const promptInput = document.getElementById("promptInput");
const generateButton = document.getElementById("generateButton");
const resultText = document.getElementById("resultText");

const generate = async () =>{
    try{
        const response = await fetch(urlKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "You have to check the user's IELTS writing essay and predict how many points this essay would score in a real check. Print only the points. For example, 6.5"},
                    {role: "user", content: promptInput.value}],
            }),
        });
        const data =await response.json();
        resultText.innerHTML = data.choices[0].message.content;
    }
    catch (error){
        console.log("error:", error);
    }
}
generateButton.addEventListener("click",generate);