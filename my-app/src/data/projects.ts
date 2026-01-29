export type Projects = {
    title: string;
    description: string;
    id: number;
    link?: string;
};

export const projects: Projects[] = [
    { id: 1, title: "Идея №1", description: "Небольшой эксперимент с интерфейсами." },
    { id: 2, title: "Программа №2", description: "Учебный проект на React + TypeScript." },
    { id: 3, title: "Игра №3", description: "Мини-игра с движком Phaser." },
  ];