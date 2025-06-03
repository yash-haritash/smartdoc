const HF_QA_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

export async function answerQuestion(context, question) {
  const response = await fetch("https://api-inference.huggingface.co/models/deepset/roberta-base-squad2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HF_QA_API_TOKEN}`,
    },
    body: JSON.stringify({
      inputs: { context, question },
      parameters: { top_k: 3, return_all_scores: true }
    }),
  });


  if (!response.ok) {
    return `Error: Model unavailable or API error (${response.status})`;
  }

  const data = await response.json();

  if (data.error) {
    return `Error: ${data.error}`;
  }

  // If multiple answers are returned, join them for a more complete response
  if (Array.isArray(data) && data.length > 0 && data[0].answer) {
    // Filter out empty answers and join unique ones
    const answers = [...new Set(data.map(a => a.answer).filter(Boolean))];
    return answers.join(' / ');
  }

  return data.answer || "No answer found.";
}
