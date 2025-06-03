const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

export async function summarizeText(text) {
  const response = await fetch("https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HF_API_TOKEN}`,
    },
    body: JSON.stringify({ inputs: text }),
  });

  const data = await response.json();

  // Check for errors
  if (data.error) {
    return `Error: ${data.error}`;
  }

  return data[0]?.summary_text || "Unable to summarize.";
}
