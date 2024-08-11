export interface ProjectData {
  title: string;
  description: string;
  image: string;
  hub: string;
  category: string;
  type: string;
  beneficiaries: string;
  about: { // Change this to match the ProjectAboutData type
    projectTitle: string,
    projectDescription: string,
    projectLink: string,
    projectImage: string,
    projectObjDescription: string,
    projectObjImage: string,
    projectName1: string,
    projectName1Description: string,
    projectName1Image: string,
    projectName2: string,
    projectName2Description: string,
    projectName2Image: string,
    theme: string,
  },
  published: boolean;
  featured: boolean;
}