export class Projects implements IProjectCards {
    appName: string;
    appDescription: string;
    projectIcon: ProjectIcon;

    constructor(projects: Projects) {
        this.appName = projects.appName;
        this.appDescription = projects.appDescription;
        this.projectIcon = projects.projectIcon;
    }
}

export interface IProjectCards {
    appName: string;
    appDescription: string;
    projectIcon: ProjectIcon;
}

export interface ProjectIcon {
    altText: string;
    svgSrc: string;
}