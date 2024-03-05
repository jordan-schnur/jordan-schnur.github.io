import { Component } from '@angular/core';
import {Project, projects} from "./project";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'js-projects',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = projects;

  selectedTags: Set<string> = new Set();
  filteredProjects: Project[] = this.projects;
  uniqueTags: string[] = [];

  toggleTag(tag: string) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    this.filterProjects();
  }

  filterProjects() {
    if (this.selectedTags.size === 0) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.tags.some(tag => this.selectedTags.has(tag))
      );
    }
  }

  openModal(project: Project) {
    // Logic to open a modal with project details
  }

  getUniqueTags() {
    if (this.uniqueTags.length > 0) {
      return this.uniqueTags;
    }

    this.projects.forEach(project => {
      project.tags.forEach(tag => {
        if (!this.uniqueTags.includes(tag)) {
          this.uniqueTags.push(tag);
        }
      });
    });

    return this.uniqueTags;
  }

  selectAllTags() {
    this.selectedTags.clear();
    this.filterProjects();
  }

  shouldBeVisible(project: Project) {
    return this.filteredProjects.includes(project);
  }
}
