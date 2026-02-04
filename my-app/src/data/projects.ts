import type { Day } from "./days.ts";

export type Projects = {
    title: string;
    description: string;
    id: number;
    link?: string;
    days: Day[];
};

export const projects: Projects[] = [
    { id: 1, title: "Проект №1", description: "Описание проекта №1", days:[    {
        id: 1,
        day: "2024-01-01",  
        title: "Первый день",
        plan: "План на первый день",
        result: "Результат первого дня",
        status: "planned"
    },
    {
        id: 2,
        day: "2024-01-02",  
        title: "Второй день",
        plan: "План на второй день",
        result: "Результат второго дня",
        status: "planned"
    }] },
    { id: 2, title: "Проект №2", description: "Описание проекта №2", days:[    {
        id: 2,
        day: "2024-01-02",  
        title: "Второй день",
        plan: "План на второй день",
        result: "Результат второго дня",
        status: "planned"
    }] },
    { id: 3, title: "Проект №3", description: "Описание проекта №3", days:[    {
        id: 3,
        day: "2024-01-03",  
        title: "Третий день",
        plan: "План на третий день",
        result: "Результат третьего дня",
        status: "planned"
    }] },
    { id: 4, title: "Проект №4", description: "Описание проекта №4", days:[    {
        id: 4,
        day: "2024-01-04",  
        title: "Четвертый день",
        plan: "План на четвертый день",
        result: "Результат четвертого дня",
        status: "planned"
    }] },
    { id: 5, title: "Проект №5", description: "Описание проекта №5", days:[    {
        id: 5,
        day: "2024-01-05",  
        title: "Пятый день",
        plan: "План на пятый день",
        result: "Результат пятого дня",
        status: "planned"
    }] },
    { id: 6, title: "Проект №6", description: "Описание проекта №6", days: [] },
    { id: 7, title: "Проект №7", description: "Описание проекта №7", days: [] },
    { id: 8, title: "Проект №8", description: "Описание проекта №8", days: [] },
    { id: 9, title: "Проект №9", description: "Описание проекта №9", days: [] },
    { id: 10, title: "Проект №10", description: "Описание проекта №10", days: [] },
    { id: 11, title: "Проект №11", description: "Описание проекта №11", days: [] },
    { id: 12, title: "Проект №12", description: "Описание проекта №12", days: [] },
    { id: 13, title: "Проект №13", description: "Описание проекта №13", days: [] },
    { id: 14, title: "Проект №14", description: "Описание проекта №14", days: [] },
  ];