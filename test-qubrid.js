import fetch from 'node-fetch';

const API_KEY = "k_991ae49103d0.fnuMeNIRFXExdsuk_Vio9gXyhtDcStLEOvkVzFWOJlwLgXmpffWxHw";
const URL = "https://platform.qubrid.com/api/v1/qubridai/chat/completions";

const models = [
    "mistralai/Mistral-7B-Instruct-v0.3",
    "meta-llama/Llama-3-8b-Instruct",
    "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "nvidia/Llama-3.1-405B-Instruct-Turbo"
];

async function testModels() {
    for (const model of models) {
        console.log(`\n🔍 Testing model: ${model}`);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: "user", content: "Hi" }],
                    max_tokens: 10,
                    stream: false
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ SUCCESS for ${model}!`);
                console.log("Full Data:", JSON.stringify(data, null, 2));
            } else {
                const err = await response.text();
                console.error(`❌ FAILED for ${model}:`, response.status, err);
            }
        } catch (e) {
            console.error(`💥 ERROR for ${model}:`, e.message);
        }
    }
}

testModels();
