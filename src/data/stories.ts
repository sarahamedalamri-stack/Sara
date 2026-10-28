import { Story } from '../types';
import { STORIES_1_TO_5 } from './stories/story1_to_5';
import { STORIES_6_TO_10 } from './stories/story6_to_10';
import { STORIES_11_TO_15 } from './stories/story11_to_15';

export const HERO_IMAGE = '/src/assets/images/hero_reading_heroes_1793198944746.jpg';

// All 15 complete, original illustrated stories with full questions and games
export const STORIES: Story[] = [
  ...STORIES_1_TO_5,
  ...STORIES_6_TO_10,
  ...STORIES_11_TO_15,
];

export const getStoryById = (id: string): Story | undefined => {
  return STORIES.find((s) => s.id === id);
};
