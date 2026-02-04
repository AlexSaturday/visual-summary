
export type Day = {
    id: number;
    day: string;
    title: string;
    plan: string;
    result: string;
    status: 'planned' | 'completed' | 'skipped';
};

export const days: Day[] = [
    {
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
    },
    {
        id: 3,
        day: "2024-01-03",
        title: "Третий день",
        plan: "План на третий день",
        result: "Результат третьего дня",
        status: "planned"
    },
    {
        id: 4,
        day: "2024-01-04",
        title: "Четвертый день",
        plan: "План на четвертый день",
        result: "Результат четвертого дня",
        status: "planned"
    },
    {
        id: 5,
        day: "2024-01-05",
        title: "Пятый день",
        plan: "План на пятый день",
        result: "Результат пятого дня",
        status: "planned"
    },
    {
        id: 6,
        day: "2024-01-06",
        title: "Шестой день",
        plan: "План на шестой день",
        result: "Результат шестого дня",
        status: "planned"
    },
    {
        id: 7,
        day: "2024-01-07",
        title: "Седьмой день",
        plan: "План на седьмой день",
        result: "Результат седьмого дня",
        status: "planned"
    },
    {
        id: 8,
        day: "2024-01-08",
        title: "Восьмой день",
        plan: "План на восьмой день",
        result: "Результат восьмого дня",
        status: "planned"
    },
];