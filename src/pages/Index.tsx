import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audioRef.current) {
      // Создаем аудио элемент - используем мощный военный марш
      audioRef.current = new Audio('https://archive.org/download/DerFuehrerTonaufnahmenSammelband/06%20-%20Das%20Deutschlandlied.mp3');
      audioRef.current.volume = 0.9;
      audioRef.current.loop = false;
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      audioRef.current.addEventListener('error', () => {
        // Fallback на другой аудио файл если основной не работает
        audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
        audioRef.current.volume = 0.9;
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Audio play failed:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
      
      {/* Главный контент */}
      <div className="relative z-10 text-center space-y-12">
        {/* Заголовок */}
        <div className="space-y-4">
          <h1 className="font-serif text-7xl md:text-8xl font-bold text-foreground tracking-wider">
            CASTELO
          </h1>
          <div className="w-24 h-0.5 bg-primary mx-auto"></div>
        </div>

        {/* Инструкция */}
        <div className="space-y-8">
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            нажми
          </p>

          {/* Кнопка воспроизведения */}
          <button
            onClick={handlePlayAudio}
            className="audio-button group relative"
            aria-label="Воспроизвести аудио"
          >
            {isPlaying ? (
              <Icon 
                name="Pause" 
                size={40} 
                className="text-primary-foreground" 
              />
            ) : (
              <Icon 
                name="Play" 
                size={40} 
                className="text-primary-foreground play-icon" 
              />
            )}
            
            {/* Эффект свечения */}
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping"></div>
          </button>
        </div>

        {/* Статус */}
        {isPlaying && (
          <div className="animate-fade-in">
            <p className="text-primary font-medium text-lg">
              ♪ Воспроизведение...
            </p>
          </div>
        )}
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-10 right-10 w-1 h-20 bg-primary/30 transform rotate-45"></div>
      <div className="absolute bottom-10 left-10 w-1 h-20 bg-primary/30 transform -rotate-45"></div>
      <div className="absolute top-1/4 left-20 w-2 h-2 bg-primary/50 rounded-full"></div>
      <div className="absolute bottom-1/4 right-20 w-2 h-2 bg-primary/50 rounded-full"></div>
    </div>
  );
};

export default Index;