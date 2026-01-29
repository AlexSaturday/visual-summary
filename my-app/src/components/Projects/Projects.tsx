import React from 'react';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects: React.FC = () => {
    return (
        <section className="projects">
            <h2 className='projects__title'>Проекты и идеи</h2>
            <ul className='projects__list'>
                {projects.map((project) => (
                    <li key={project.id} className='projects__item'>
                        <strong>{project.title}</strong> - {project.description}{" "}
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                [Ссылка]
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Projects;