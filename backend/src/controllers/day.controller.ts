import { Request, Response } from "express";
import { prisma } from "../prisma";



// Получить все дни для конкретного проекта
export const getDays = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (Array.isArray(projectId)) {
        return res.status(400).json({ error: "Неверный projectId" });
      }
    
    const days = await prisma.day.findMany({
      where: { projectId },
      orderBy: { dayNumber: "asc" },
    });
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения дней" });
  }
};

// Создать новый день для проекта
export const createDay = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (Array.isArray(projectId)) {
        return res.status(400).json({ error: "Неверный projectId" });
      }
      
    const { title, plan, result, status } = req.body;

    // Определяем следующий dayNumber
    const lastDay = await prisma.day.findFirst({
      where: { projectId },
      orderBy: { dayNumber: "desc" },
    });
    const dayNumber = lastDay ? lastDay.dayNumber + 1 : 1;

    const day = await prisma.day.create({
      data: {
        projectId,
        dayNumber,
        dayLabel: `День ${dayNumber}`,
        title,
        plan,
        result,
        status,
      },
    });
    res.json(day);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания дня" });
  }
};

// Обновить день
export const updateDay = async (req: Request, res: Response) => {
  try {
    const { dayId } = req.params;
    const { title, plan, result, status } = req.body;

    const day = await prisma.day.update({
      where: { id: Number(dayId) },
      data: { title, plan, result, status },
    });

    res.json(day);
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления дня" });
  }
};

// Удалить день
export const deleteDay = async (req: Request, res: Response) => {
  try {
    const { dayId } = req.params;

    await prisma.day.delete({
      where: { id: Number(dayId) },
    });

    res.json({ message: "День удалён" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления дня" });
  }
};