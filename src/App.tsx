import React, { useEffect, useState } from "react";
import WordItem from "./WordItem";

interface RowData {
  english: string;
  vietnamese: string;
}

const PAGE_SIZE = 10;

const App: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [mode, setMode] = useState<"en-vi" | "vi-en">("en-vi");

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1VaEOqYEkIrjreK6CDxP6UChYJrWjPk0l2v8GASPlbok/gviz/tq?tqx=out:json"
    )
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47, text.length - 2));

        const data = json.table.rows.map((row: any) => ({
          english: row.c[1]?.v ?? "",
          vietnamese: row.c[3]?.v ?? "",
        }));

        setRows(data);
      });
  }, []);

  // Tính trang hiện tại
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = rows.slice(start, end);

  // Tổng số trang
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);

  return (
    <div style={{ padding: 20 }}>
      <h1>Bài học từ vựng</h1>

      {/* MODE SWITCH */}
      <button
        onClick={() => setMode(mode === "en-vi" ? "vi-en" : "en-vi")}
        style={{
          padding: "6px 12px",
          marginBottom: 10,
          background: "#007bff",
          color: "white",
        }}
      >
        Chuyển chế độ: {mode === "en-vi" ? "EN → VI" : "VI → EN"}
      </button>

      {/* LIST WORDS */}
      {pageData.map((item, index) => {
        const question = mode === "en-vi" ? item.english : item.vietnamese;
        const answer = mode === "en-vi" ? item.vietnamese : item.english;

        return (
          <WordItem
            key={index}
            eng={item.english}
            vie={item.vietnamese}
            question={question}
            answer={answer}
          />
        );
      })}

      {/* PAGINATION BUTTONS */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{ marginRight: 10 }}
        >
          ⬅ Trang trước
        </button>

        <span>
          Trang {page + 1} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          style={{ marginLeft: 10 }}
        >
          Trang sau ➡
        </button>
      </div>
    </div>
  );
};

export default App;
