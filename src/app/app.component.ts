import {Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {AboutComponent} from "./about/about.component";
import {ExperienceComponent} from "./experience/experience.component";
import {ProjectsComponent} from "./projects/projects.component";
import {EducationComponent} from "./education/education.component";
import {SkillsComponent} from "./skills/skills.component";
import {FooterComponent} from "./footer/footer.component";
import {isPlatformBrowser} from "@angular/common";
import {debounceTime, fromEvent} from "rxjs";

@Component({
  selector: 'js-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AboutComponent, ExperienceComponent, ProjectsComponent, EducationComponent, SkillsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jordan-resume-website';

  activeSection: string = 'about';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.doScrollLogic();
      fromEvent(window, 'scroll')
        .pipe(debounceTime(10)) // Adjust debounce time as needed
        .subscribe(() => this.onWindowScroll());
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.doScrollLogic()
  }

  doScrollLogic() {
    const sections = ['about', 'experience', 'projects', 'education', 'skills'];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && this.isElementInViewport(element)) {
        this.activeSection = section;
        break;
      }
    }
  }

  private isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const threshold = 10; // You can adjust this value as needed

    // Check if the top of the element is within the threshold of the viewport's top
    return (
      rect.top >= -threshold &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.bottom >= -threshold
    );
  }
}
