import React from "react";
import type { Projects } from '../../data/projects';
import './ProjectTimeline.css';

type ProjectTimelineProps = {
    onBack: () => void;
    projects: Projects;
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({onBack, projects}) => {
    return (
        <div className='project-timeline'>
            <button className="project-timeline__back-button"
            onClick={onBack}>Back</button>
            <div className='project-timeline__grid'>
            {projects.days.map((day) => (
                <div key={day.id} className='project-timeline__day'>
                    <strong>{day.day}</strong>: {day.title}
                    <p>{day.plan}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ProjectTimeline;
