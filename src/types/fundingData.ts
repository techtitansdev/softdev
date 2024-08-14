interface Milestone {
  id: string;
  milestone: string;
  value: number;
  unit: string;
  description: string;
  created: Date;
  updated: Date;
  fundraiserId: string;
}

export interface ProjectAbout {
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

export interface FundingData {
  donors: number;
  funds: number;
  title: string;
  project: string;
  description: string;
  image: string;
  hub: string;
  category: string;
  type: string;
  beneficiaries: string;
  about: ProjectAbout;
  goal: string;
  date: string;
  published: boolean;
  milestones: Milestone[];
}
