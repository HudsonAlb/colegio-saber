export function Icon({ type }: { type: string }) {
  const emojiMap: Record<string, string> = {
    'Star': '⭐',
    'Tick': '🎯',
    'Users': '👫',
    'Typing Comment': '💬',
    'Right Arrow': '➔',
    'Notification': '🔔',
    'Shopping': '🎒'
  };

  return (
    <span className="flex items-center justify-center text-3xl opacity-90 drop-shadow-sm select-none" aria-hidden="true">
      {emojiMap[type] || '✨'}
    </span>
  );
}
