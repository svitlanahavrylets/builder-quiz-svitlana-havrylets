import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/create.module.css";
import Link from "next/link";

type Question = {
  id: number;
  type: string;
  text: string;
  options?: string[];
  answer?: string | string[];
};

type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

type FetchedQuestion = {
  id: number;
  type: string;
  text: string;
  options?: string;
  answer?: string;
};

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  function safeParseArray(str: string | undefined): string[] {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const parsed = {
            ...data,
            questions: data.questions.map(
              (q: FetchedQuestion): Question => ({
                ...q,
                options: safeParseArray(q.options),
                answer:
                  typeof q.answer === "string" && q.answer.startsWith("[")
                    ? JSON.parse(q.answer)
                    : q.answer,
              })
            ),
          };
          setQuiz(parsed);
        })
        .catch((err) => console.error("Failed to load quiz:", err));
    }
  }, [id]);

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/quizzes" className={styles.viewLink}>
          ← Back
        </Link>
      </div>
      <h1 className={styles.title}>{quiz.title}</h1>
      <div className={styles.questionList}>
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className={styles.questionBlock}>
            <p className={styles.label}>
              <strong>{idx + 1}.</strong> {q.text}
            </p>

            <p>
              <em>Type:</em>{" "}
              {q.type === "boolean"
                ? "Yes / No"
                : q.type === "input"
                  ? "Text input"
                  : "Multiple choice"}
            </p>

            {q.type === "checkbox" && q.options && (
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>
                    {opt}{" "}
                    {Array.isArray(q.answer) && q.answer.includes(String(i))
                      ? "✅"
                      : ""}
                  </li>
                ))}
              </ul>
            )}

            {q.type === "boolean" && (
              <p>Correct answer: {q.answer === "true" ? "Yes" : "No"}</p>
            )}

            {q.type === "input" && <p>Correct answer: {q.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
