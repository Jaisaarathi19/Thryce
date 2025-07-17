import { Dispatch, SetStateAction } from 'react';

export interface PageProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}