export const matchSimilarity = (input: string, answer: string): number => {
  let correctCount = 0;

  const a = input.toLowerCase();
  const b = answer.toLowerCase();

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) {
      correctCount++;
    }
  }

  return correctCount / b.length;
};
export const highlightCorrectChars = (
  input: string,
  answer: string
): string => {
  let html = "";

  for (let i = 0; i < answer.length; i++) {
    if (input[i] === answer[i]) {
      html += `<span style="color:green;font-weight:bold">${answer[i]}</span>`;
    } else {
      html += `<span>${answer[i]}</span>`;
    }
  }

  return html;
};
