import { Request, Response } from "express";
import { prisma } from "../prisma";

// Получить все проекты
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { days: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения проектов" });
  }
};

// Создать проект
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, link } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        link,
      },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания проекта" });
  }
};