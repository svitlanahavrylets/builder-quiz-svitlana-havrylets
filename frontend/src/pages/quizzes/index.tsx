import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/create.module.css";

interface Question {
  id: number;
  type: string;
  text: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete quiz");

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Could not delete quiz:", error);
      alert("Could not delete quiz.");
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className={styles.viewLink}>
          ← Back
        </Link>
      </div>
      <h1 className={styles.title}>Quiz List</h1>

      {loading && <p>Loading...</p>}

      {!loading && quizzes.length === 0 && <p>No quizzes found.</p>}

      <div className={styles.quizList}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className={styles.quizCard}>
            <h2 className={styles.quizTitle}>{quiz.title}</h2>
            <p className={styles.quizMeta}>
              Number of questions: {quiz.questions.length}
            </p>
            <div className={styles.quizActions}>
              <Link href={`/quizzes/${quiz.id}`} className={styles.viewLink}>
                View Quiz →
              </Link>
              <button
                className={styles.deleteButton}
                onClick={() => deleteQuiz(quiz.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
