import React from 'react';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects: React.FC = () => {
    return (
        <section className="projects">
            <h2 className='projects__title'>Проекты и идеи</h2>
            <div className='projects__grid'>
                {projects.map((project) => (
                    <div key={project.id} className='projects__card'>
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
        </section>
    );
};

export default Projects;