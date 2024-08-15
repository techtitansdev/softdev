export interface ProjectData {
  title: string;
  description: string;
  image: string;
  imageId: string;
  hub: string;
  category: string;
  type: string;
  beneficiaries: string;
  about: ProjectAboutData;
  published: boolean;
  featured: boolean;
}

export interface ProjectAboutData {
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  projectImage: string;
  projectObjDescription: string;
  projectObjImage: string;
  projectName1: string;
  projectName1Description: string;
  projectName1Image: string;
  projectName2: string;
  projectName2Description: string;
  projectName2Image: string;
  theme: string;
}
