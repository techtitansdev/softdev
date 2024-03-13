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

export interface FundingData {
  title: string;
  project: string;
  description: string;
  image: string;
  hub: string;
  category: string;
  type: string;
  beneficiaries: string;
  about: string;
  goal: string;
  date: string;
  milestones: Milestone[]; // Define the milestone type here
}