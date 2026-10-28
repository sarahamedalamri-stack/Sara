/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveScreen, Story } from './types';
import { STORIES } from './data/stories';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LibraryView } from './components/LibraryView';
import { StoryReader } from './components/StoryReader';
import { GameQuiz } from './components/games/GameQuiz';
import { GameOrdering } from './components/games/GameOrdering';
import { GameRiddles } from './components/games/GameRiddles';
import { GameCelebration } from './components/games/GameCelebration';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  // Story-specific score tracking for the active game session
  const [quizScore, setQuizScore] = useState<number>(0);
  const [riddlesScore, setRiddlesScore] = useState<number>(0);

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setActiveScreen('story');
  };

  // Game 1 (تحدي الفهم) -> Game 2 (رتّب الأحداث)
  const handleCompleteQuiz = (earnedStars: number) => {
    setQuizScore(earnedStars);
    setTotalStars((prev) => prev + earnedStars);
    setActiveScreen('game-order');
  };

  // Game 2 (رتّب الأحداث) -> Game 3 (اكتشف السر)
  const handleCompleteOrdering = (earnedStars: number) => {
    setTotalStars((prev) => prev + earnedStars);
    setActiveScreen('game-riddles');
  };

  // Game 3 (اكتشف السر) -> Celebration & Certificate
  const handleCompleteRiddles = (earnedStars: number) => {
    setRiddlesScore(earnedStars);
    setTotalStars((prev) => prev + earnedStars);
    if (!completedStories.includes(selectedStory.id)) {
      setCompletedStories((prev) => [...prev, selectedStory.id]);
    }
    setActiveScreen('celebration');
  };

  // Replay current story from games or story view
  const handleReplayStory = () => {
    setActiveScreen('game-quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F0] text-[#26345C] font-['Readex_Pro',sans-serif]">
      {/* Universal Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        totalStars={totalStars}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Interactive Screen */}
      <main className="flex-1 flex flex-col">
        {activeScreen === 'home' && (
          <HomePage
            onStartAdventure={() => setActiveScreen('library')}
            storiesCount={STORIES.length}
          />
        )}

        {activeScreen === 'library' && (
          <LibraryView
            stories={STORIES}
            onSelectStory={handleSelectStory}
            completedStories={completedStories}
          />
        )}

        {activeScreen === 'story' && (
          <StoryReader
            story={selectedStory}
            onBackToLibrary={() => setActiveScreen('library')}
            onStartGames={() => setActiveScreen('game-quiz')}
          />
        )}

        {activeScreen === 'game-quiz' && (
          <GameQuiz
            questions={selectedStory.quizQuestions}
            onCompleteGame={handleCompleteQuiz}
            onBackToStory={() => setActiveScreen('story')}
          />
        )}

        {activeScreen === 'game-order' && (
          <GameOrdering
            items={selectedStory.orderingItems}
            onCompleteGame={handleCompleteOrdering}
            onBackToStory={() => setActiveScreen('story')}
          />
        )}

        {activeScreen === 'game-riddles' && (
          <GameRiddles
            riddles={selectedStory.riddleQuestions}
            onCompleteGame={handleCompleteRiddles}
            onBackToStory={() => setActiveScreen('story')}
          />
        )}

        {activeScreen === 'celebration' && (
          <GameCelebration
            storyTitle={selectedStory.title}
            totalStars={totalStars}
            quizScore={quizScore}
            maxQuiz={selectedStory.quizQuestions.length}
            riddlesScore={riddlesScore}
            maxRiddles={selectedStory.riddleQuestions.length}
            onReplay={handleReplayStory}
            onBackToLibrary={() => setActiveScreen('library')}
          />
        )}
      </main>

      {/* Bottom Footer with verified copyright & designer attribution */}
      <Footer />
    </div>
  );
}
