import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { getProjects, createProject, updateProject, addDayToProject } from '../../api/projects';
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline';
import type { Projects_t } from '../../data/projects';
// import { projects } from '../../data/projects';
import './Projects.css';
//import { days } from '../../data/days';
import type { Day } from '../../data/days';





export type Editing = 
    | null
    | { type: 'project'; id: string; field: 'title' | 'description' }
    | { type: 'day'; projectId: string; dayId: number; field: 'title' | 'plan' | 'result' };

const Projects: React.FC = () => {

    const queryClient = useQueryClient();
    
    const {data: projects = [], isLoading, isError} = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    const createProjectMutation = useMutation({
        mutationFn: ({ title, description, link }: { title: string; description: string; link?: string }) =>
          createProject(title, description, link),
        onSuccess: () => {
          // обновляем кэш после успешного создания
          queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Projects_t> }) =>
          updateProject(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
    });
    
    const addDayMutation = useMutation({
        mutationFn: ({ projectId }: { projectId: string }) => addDayToProject(projectId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
    });



    const [activeProjectId, setActiveProjectId] = React.useState<string|null>(null);
    const [isCreating, setIsCreating] = React.useState(false);
    // const [daysCount, setDaysCount] = React.useState(7);
    const [editing, setEditing] = React.useState<Editing>(null);
    const [tempValue, setTempValue] = React.useState('');

    const activeProject = projects.find(proj => proj.id === activeProjectId) ?? null;

    // const createDays = (count: number): Day[] => 
    //     Array.from({ length: count }, (_, i) => ({
    //         id: i + 1,
    //         day: `День ${i + 1}`,
    //         title: 'Название дня',
    //         plan: 'План дня',
    //         result: 'Результат дня',
    //         status: 'planned'
    // }));

    const startCreateProject = () => {
        setIsCreating(true);
    }

    const confirmCreateProject = () => {
        createProjectMutation.mutate({
            title: `Новый проект ${projects.length + 1}`,
            description: 'Описание проекта',
            link: 'ссылка',
        });
        setIsCreating(false);
    };

    // const handleCreateProject = () => {
    //     createProjectMutation.mutate({ title: "Новый проект", description: "Описание", link: "ссылка" });
    // };

    // const addDayToProject = (projectId: string) => {
    //     setProjects(prev => 
    //         prev.map(proj => {
    //             if (proj.id === projectId) {
    //                 const newDay: Day = {
    //                     id: proj.days.length + 1,
    //                     day: `День ${proj.days.length + 1}`,
    //                     title: 'Название дня',
    //                     plan: 'План дня',
    //                     result: 'Результат дня',
    //                     status: 'planned'
    //                 };
    //                 return { ...proj, days: [...proj.days, newDay] };
    //             }
    //             return proj;
    //         })
    //     );
    // }

    const startEditProject = (
            e: React.MouseEvent,
            project: Projects_t,
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

        if (editing.type === 'project') {
            const { id, field } = editing;
            updateProjectMutation.mutate({ id, data: { [field]: tempValue } });
          }
        
        if (editing.type === 'day') {
            const { projectId, dayId, field } = editing;
            const dayUpdate: Partial<Day> = { [field]: tempValue };
            updateProjectMutation.mutate({
                id: projectId,
                data: {
                days: projects
                    .find(p => p.id === projectId)
                    ?.days.map(d => (d.id === dayId ? { ...d, ...dayUpdate } : d)),
                },
            });
        }
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

    if (isLoading) return <div>Загрузка проектов...</div>;
    if (isError) return <div>Ошибка загрузки проектов</div>;
    
    return (
        <section className="projects">
            

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
                    addDay={() => activeProject.id && addDayMutation.mutate({ projectId: activeProject.id })}
                    />
                )
            }
            { isCreating && (
                <div className="modal-overlay" onClick={() => setIsCreating(false)}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Новый проект</h3>

                        <div className="modal__actions">
                            <button onClick={confirmCreateProject}>
                                Создать
                            </button>
                            <button onClick={() => setIsCreating(false)}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
                
            )}
            {!activeProject && (
                <button className='projects__add-button' onClick={startCreateProject}>Добавить проект</button>
            )}
        </section>
    );
};

export default Projects;