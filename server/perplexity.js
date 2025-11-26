export async function callPerplexity(prompt, systemInstruction, apiKey) {
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Perplexity API Error:", response.status, errorText);
        throw new Error(`Perplexity API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Perplexity Response:", JSON.stringify(data, null, 2));

    // Extract the content from the first choice
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
        throw new Error("No content received from Perplexity");
    }

    return content;
  } catch (err) {
    console.error("Perplexity Call Failed:", err);
    throw err;
  }
}
