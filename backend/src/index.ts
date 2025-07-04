import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Quiz Builder API is running!");
});

app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

app.get(
  "/quizzes/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const quizId = parseInt(req.params.id);

    try {
      const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: { questions: true },
      });

      if (!quiz) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }

      const parsedQuiz = {
        ...quiz,
        questions: quiz.questions.map((q: any) => ({
          ...q,
          options: JSON.parse(q.options || "[]"),
          answer:
            q.type === "checkbox" ? JSON.parse(q.answer || "[]") : q.answer,
        })),
      };

      res.json(parsedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  }
);

app.post("/quizzes", async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            text: q.text,
            options: JSON.stringify(q.options || []),
            answer:
              q.type === "checkbox" ? JSON.stringify(q.answer || []) : q.answer,
          })),
        },
      },
      include: { questions: true },
    });

    res.status(201).json(createdQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

app.delete("/quizzes/:id", async (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id);

  try {
    await prisma.question.deleteMany({ where: { quizId } });

    await prisma.quiz.delete({ where: { id: quizId } });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
