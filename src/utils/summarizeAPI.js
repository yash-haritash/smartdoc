const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

export async function summarizeText(text) {
  // Calculate summary length relative to input
  const wordCount = text.split(/\s+/).length;
  const max_length = Math.max(60, Math.floor(wordCount * 0.6));
  const min_length = Math.max(20, Math.floor(wordCount * 0.3));

  const response = await fetch("https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HF_API_TOKEN}`,
    },
    body: JSON.stringify({ inputs: text, parameters: { min_length, max_length } }),
  });

  const data = await response.json();

  // Check for errors
  if (data.error) {
    return `Error: ${data.error}`;
  }

  return data[0]?.summary_text || "Unable to summarize.";
}
