import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to the Quiz Builder</h1>
        <p className={styles.subtitle}>
          Create, manage, and explore quizzes with ease. Whether you’re a
          teacher, a student, or a quiz enthusiast — this tool is built for you.
        </p>
        <div className={styles.buttons}>
          <Link href="/create" className={styles.talkButton}>
            Start Creating
          </Link>
          <Link href="/quizzes" className={styles.portfolioButton}>
            Browse Quizzes →
          </Link>
        </div>
      </section>

      <section className={styles.helpSection}>
        <h2 className={styles.sectionTitle}>What can you do here?</h2>
        <p className={styles.description}>
          The Quiz Builder helps you build custom quizzes with multiple types of
          questions. Organize learning, challenge friends, or prepare for exams
          — all in one place.
        </p>
        <div className={styles.services}>
          <div className={styles.card}>
            <h3>Create Quizzes</h3>
            <p>
              Set up quizzes with various question types: boolean, input,
              checkbox.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Manage Questions</h3>
            <p>
              Easily add, edit or remove questions to tailor your quiz to your
              audience.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Share and Solve</h3>
            <p>
              Send quizzes to others or use them yourself to practice and learn.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Track Your Content</h3>
            <p>
              See all your quizzes in one place and keep control over your
              content.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
