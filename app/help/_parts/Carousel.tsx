import { useEffect, useState } from 'react';

const STORIES = [
  { quote: 'The Ridgeback survived a full night of Hebridean wind and we woke up dry. Returning the spare pegs was painless too.', by: 'Maren, Isle of Skye' },
  { quote: 'Fernwick fixed a snapped pole zip in a week and sent a handwritten note. I have never had that from a gear shop.', by: 'Tobias, Black Forest' },
  { quote: 'Sizing chart nailed my boots first time. Forty kilometres of the Tatras and not one blister.', by: 'Ines, Zakopane' },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  // MISC-001: rotates every 3s, no pause/stop control, no labelling or live-region handling
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % STORIES.length), 3000);
    return () => clearInterval(timer);
  }, []);
  const story = STORIES[index];
  return (
    <div className="stories" data-pet-issue="MISC-001">
      <p className="story-quote">&ldquo;{story.quote}&rdquo;</p>
      <p className="story-by">{story.by}</p>
    </div>
  );
}
