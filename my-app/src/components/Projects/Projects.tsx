import React from 'react';
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline';
import type { Projects } from '../../data/projects';
import { projects } from '../../data/projects';
import './Projects.css';



const Projects: React.FC = () => {
    const [activeProject, setActiveProject] = React.useState<Projects|null>(null);
    
    return (
        <section className="projects">
            <h2 className='projects__title'>{activeProject ? activeProject.title : 'Проекты'}</h2>
            { !activeProject ? (
            <div className='projects__grid'>
                {projects.map((project) => (
                    <div key={project.id} 
                        className='projects__card'
                        onClick={() => setActiveProject(project)}
                        >
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                [Ссылка]
                            </a>
                        )}
                    </div>
                ))}
            </div>
            ): 
            <ProjectTimeline
               onBack={() => setActiveProject(null)}
               projects={activeProject}
             />}
        </section>
    );
};

export default Projects;