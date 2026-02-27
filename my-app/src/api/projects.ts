import { api } from "./client";
import type { Projects_t } from "../data/projects";

export const getProjects = () => api<Projects_t[]>("/projects");

export const createProject = (title: string, description: string, link?: string) =>
  api<Projects_t>("/projects", {
    method: "POST",
    body: JSON.stringify({ title, description, link }),
});

export const updateProject = (
    id: string,
    data: Partial<{
        title: string;
        description: string;
        link: string;
    }>
  ) => api(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
});

export const addDayToProject = (projectId: string) =>
    api(`/projects/${projectId}/days`, {
      method: "POST",
});
