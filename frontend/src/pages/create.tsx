import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/create.module.css";
import Link from "next/link";

const questionTypes = ["boolean", "input", "checkbox"] as const;

const quizSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  questions: z
    .array(
      z.object({
        type: z.enum(questionTypes),
        text: z.string().min(1, "This field is required"),
        options: z.array(z.string()).optional(),
        answer: z.union([z.string(), z.array(z.string())]).optional(),
      })
    )
    .min(1, "At least one question is required"),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function CreateQuizPage() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [{ type: "boolean", text: "", options: [], answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Failed to save the quiz");
      alert("Quiz saved successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting the quiz:", error);
      alert("Failed to save the quiz.");
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className={styles.viewLink}>
          ← Back
        </Link>
      </div>
      <h1 className={styles.title}>Create New Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label className={styles.label}>Quiz Title</label>
          <input {...register("title")} className={styles.input} />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.questionList}>
          {fields.map((field, index) => {
            const type = watch(`questions.${index}.type`);
            return (
              <div key={field.id} className={styles.questionBlock}>
                <label className={styles.label}>Question Type</label>
                <select
                  {...register(`questions.${index}.type`)}
                  className={styles.select}
                >
                  <option value="boolean">Boolean</option>
                  <option value="input">Input</option>
                  <option value="checkbox">Checkbox</option>
                </select>

                <label className={styles.label}>Question Text</label>
                <input
                  {...register(`questions.${index}.text`)}
                  className={styles.input}
                />
                {errors.questions?.[index]?.text && (
                  <p className={styles.error}>
                    {errors.questions[index].text?.message}
                  </p>
                )}

                {type === "input" && (
                  <>
                    <label className={styles.label}>Correct Answer</label>
                    <input
                      {...register(`questions.${index}.answer`)}
                      className={styles.input}
                    />
                  </>
                )}

                {type === "boolean" && (
                  <div className={styles.optionGroup}>
                    <label className={styles.label}>
                      Select the correct answer
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="true"
                        {...register(`questions.${index}.answer`)}
                      />{" "}
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="false"
                        {...register(`questions.${index}.answer`)}
                      />{" "}
                      False
                    </label>
                  </div>
                )}

                {type === "checkbox" && (
                  <div className={styles.optionGroup}>
                    <label className={styles.label}>Options</label>
                    {[0, 1, 2].map((optIdx) => (
                      <div key={optIdx}>
                        <input
                          {...register(`questions.${index}.options.${optIdx}`)}
                          className={styles.input}
                          placeholder={`Option ${optIdx + 1}`}
                        />
                        <label>
                          <input
                            type="checkbox"
                            value={optIdx}
                            {...register(`questions.${index}.answer`)}
                          />
                          Correct
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={styles.removeButton}
                >
                  ✖
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            append({ type: "boolean", text: "", options: [], answer: "" })
          }
          className={styles.addButton}
        >
          Add Question
        </button>

        <div>
          <button type="submit" className={styles.submitButton}>
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
}
