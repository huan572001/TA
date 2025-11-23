import React, { useState } from "react";
import { matchSimilarity, highlightCorrectChars } from "./utils";

interface WordItemProps {
  eng: string; // tiếng Anh gốc (để phát âm)
  vie: string; // tiếng Việt gốc
  question: string; // từ hiển thị
  answer: string; // đáp án cần kiểm tra
}

const WordItem: React.FC<WordItemProps> = ({ eng, vie, question, answer }) => {
  const [input, setInput] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  // Chấm điểm theo % ký tự đúng
  const score = matchSimilarity(input, answer);

  // Phát âm: nếu đang ở chế độ EN→VI thì phát âm tiếng Anh
  // Nếu đang ở VI→EN thì phát âm tiếng Việt không có ý nghĩa nên mình phát âm tiếng Anh
  const speakWord = () => {
    const utter = new SpeechSynthesisUtterance(eng);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };

  return (
    <div
      style={{ marginBottom: 20, padding: 10, borderBottom: "1px solid #ddd" }}
    >
      {/* Từ hiển thị (question) */}
      <h3>{question}</h3>

      {/* Nút phát âm */}
      <button onClick={speakWord}>🔊 Nghe phát âm</button>

      {/* Input nhập đáp án */}
      <input
        type="text"
        placeholder="Nhập câu trả lời..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowResult(false);
        }}
        style={{ marginLeft: 10 }}
      />

      <button
        onClick={() => {
          speakWord();
          setShowResult(true);
        }}
        style={{ marginLeft: 10 }}
      >
        Kiểm tra
      </button>

      {/* Kết quả */}
      {showResult && (
        <div style={{ marginTop: 10 }}>
          {score >= 0.7 ? (
            <p style={{ color: "green" }}>
              ✔ Đúng ({Math.round(score * 100)}%)
            </p>
          ) : (
            <p style={{ color: "red" }}>❌ Sai ({Math.round(score * 100)}%)</p>
          )}

          <p
            dangerouslySetInnerHTML={{
              __html: highlightCorrectChars(input, answer),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WordItem;
