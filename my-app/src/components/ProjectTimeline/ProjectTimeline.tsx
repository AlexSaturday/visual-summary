import React from "react";
import type { Projects_t } from '../../data/projects';
import type { Editing } from '../Projects/Projects';
import './ProjectTimeline.css';
import type { Day } from "../../data/days";

type ProjectTimelineProps = {
    onBack: () => void;
    project: Projects_t;
    editing: Editing;
    setEditing: (value: Editing) => void;
    tempValue: string;
    setTempValue: (value: string) => void;
    save: () => void;
    addDay: () => void;
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({onBack,
     project,
     editing,
     setEditing,
     tempValue,
     setTempValue,
     save,
     addDay
    }) => {
        const startEditDay = (projectId: string, day: Day, field: 'title'|'plan'|'result', e: React.MouseEvent) => {
            e.preventDefault();
            setEditing({ type: 'day', projectId, dayId: day.id, field });
            setTempValue(day[field]);
        }
        return (
            <div className='project-timeline'>
                <button className="project-timeline__back-button"
                onClick={onBack}>Назад</button>
                <div className='project-timeline__grid'>
                    {project.days.map(day => {
                        const isEditingTitle =
                            editing?.type === 'day' &&
                            editing.projectId === project.id &&
                            editing.dayId === day.id &&
                            editing.field === 'title';

                        const isEditingPlan =
                            editing?.type === 'day' &&
                            editing.projectId === project.id &&
                            editing.dayId === day.id &&
                            editing.field === 'plan';

                        return (
                            <div key={day.id} className='project-timeline__day-card'>
                                <strong>{day.day}</strong>

                            {isEditingTitle ? (
                                <input
                                    autoFocus
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    onBlur={save}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.currentTarget.blur();
                                        if (e.key === 'Escape') setEditing(null);
                                    }}
                                />
                            ) : ( 
                                <h4 
                                    onContextMenu={(e) => startEditDay(project.id, day, 'title', e)}
                                >
                                    {day.title}
                                </h4>
                            )}

                            {isEditingPlan ? (
                                <textarea
                                    autoFocus
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    onBlur={save}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.currentTarget.blur();
                                        if (e.key === 'Escape') setEditing(null);
                                    }}
                                />
                            ) : ( 
                                <h4 
                                    onContextMenu={(e) => startEditDay(project.id, day, 'plan', e)}
                                >
                                    {day.plan}
                                </h4>
                            )}


                            </div>
                        );
                    })}
                </div>
                <button className='project-timeline__add-day-button' onClick={addDay}>Добавить день</button>
            </div>
        );
};

export default ProjectTimeline;
