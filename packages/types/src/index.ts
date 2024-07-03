export type Workspace = {
    name: string
    version: string
  }

export interface SideBarProps {
    isDarkMode: boolean;
    onToggle: () => void;
  }

export interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
  }

export interface CaseStudyElement {
    id: number;
    type: 'text' | 'photo';
  }