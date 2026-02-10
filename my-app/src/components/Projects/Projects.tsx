import React from 'react';
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline';
import type { Projects } from '../../data/projects';
// import { projects } from '../../data/projects';
import './Projects.css';
//import { days } from '../../data/days';
import type { Day } from '../../data/days';

export type Editing = 
    | null
    | { type: 'project'; id: string; field: 'title' | 'description' }
    | { type: 'day'; projectId: string; dayId: number; field: 'title' | 'plan' | 'result' };

const Projects: React.FC = () => {

    const [projects, setProjects] = React.useState<Projects[]>(() => {
        const saved = localStorage.getItem('projects');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeProjectId, setActiveProjectId] = React.useState<string|null>(null);
    const [isCreated, setIsCreated] = React.useState(false);
    const [daysCount, setDaysCount] = React.useState(7);
    const [editing, setEditing] = React.useState<Editing>(null);
    const [tempValue, setTempValue] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const activeProject = projects.find(proj => proj.id === activeProjectId) ?? null;

    const createDays = (count: number): Day[] => 
        Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            day: `День ${i + 1}`,
            title: 'Название дня',
            plan: 'План дня',
            result: 'Результат дня',
            status: 'planned'
    }));

    const startCreateProject = () => {
        setDaysCount(7); 
        setIsCreated(true);
    }

    const confirmCreateProject = () => {
        const newProject = {
            id: crypto.randomUUID(),
            title: `Новый проект ${projects.length + 1}`,
            description: 'Описание проекта',
            link: 'ссылка',
            days: createDays(daysCount)
        };
        setProjects(prev => [...prev, newProject]);
        setActiveProjectId(newProject.id);
        setIsCreated(false);
    };


    const startEditProject = (
            e: React.MouseEvent,
            project: Projects,
            field: 'title'|'description' 
        ) => {
        e.stopPropagation();
        e.preventDefault();

        setEditing({
            type: 'project',
            id: project.id,
            field
        });

        setTempValue(project[field]);
    }

    const save = () => {
        if (!editing) return;

        setProjects(prev => 
            prev.map(proj => {      
                if (editing.type === 'project' && proj.id === editing.id) {
                    return { ...proj, [editing.field]: tempValue };
                }

                if (editing.type === 'day' && proj.id === editing.projectId) {
                    return {
                        ...proj,
                        days: proj.days.map(day => {
                            if (day.id === editing.dayId) {
                                return { ...day, [editing.field]: tempValue };
                            }
                            return day;
                        })
                    };
                }

                return proj;
            })
        );
        cancelEditing();
    }


    const cancelEditing = () => {
        setEditing(null);
        setTempValue('');
    };

    const handleProjectClick = (projectId: string) => {
        if (editing) return; // Блокируем смену проекта при редактировании
        setActiveProjectId(projectId);
    }
    
    return (
        <section className="projects">
            <button className='projects__add-button' onClick={startCreateProject}>Добавить проект</button>

            <h2 className='projects__title'>{activeProject ? activeProject.title : 'Проекты'}</h2>
            { !activeProject ? (
                <div className='projects__grid'>
                    {projects.map((project) => {
                            const isEditingTitle =
                                editing?.type === 'project' &&
                                editing.id === project.id &&
                                editing.field === 'title';

                            const isEditingDescription =
                                editing?.type === 'project' &&
                                editing.id === project.id &&
                                editing.field === 'description';
                    
                        return (
                            <div 
                                key={project.id} 
                                className='projects__card'
                                onClick={() => handleProjectClick(project.id)}
                                >
                                {isEditingTitle ? ( 
                                    <input 
                                        autoFocus
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        onBlur={save}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') save();
                                            if (e.key === 'Escape') cancelEditing();
                                        }}
                                    />
                                ) : (
                                    <strong
                                        onContextMenu={(e) => startEditProject(e, project, 'title')}
                                    >
                                        {project.title}
                                    </strong>
                                )}
                                {isEditingDescription ? (
                                    <textarea
                                        autoFocus
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        onBlur={save}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') save();
                                            if (e.key === 'Escape') cancelEditing();
                                        }}
                                    />
                                ) : (
                                    <p
                                        onContextMenu={(e) => startEditProject(e, project, 'description')}
                                    >
                                        {project.description}
                                    </p>
                                )}
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        [Ссылка]
                                    </a>
                                )}
                            </div>
                        )
                    })}
                </div>
                ): (
                    <ProjectTimeline
                    onBack={() => setActiveProjectId(null)}
                    project={activeProject}
                    editing={editing}
                    setEditing={setEditing}
                    tempValue={tempValue}
                    setTempValue={setTempValue}
                    save={save}
                    />
                )
            }
            { isCreated && (
                <div className="modal-overlay" onClick={() => setIsCreated(false)}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Новый проект</h3>

                        <label className="modal__label">
                            Количество дней
                            <input
                                type="number"
                                min={1}
                                value={daysCount}
                                onChange={(e) => setDaysCount(Number(e.target.value))}
                            />
                        </label>

                        <div className="modal__actions">
                            <button onClick={confirmCreateProject}>
                                Создать
                            </button>
                            <button onClick={() => setIsCreated(false)}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
)}
        </section>
    );
};

export default Projects;