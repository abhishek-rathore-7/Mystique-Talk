/**
 * Array of fun emojis.
 */
export const funEmojis = [
  "👾",
  "⭐",
  "🌟",
  "🎉",
  "🎊",
  "🎈",
  "🎁",
  "🎂",
  "🎄",
  "🎃",
  "🎗",
  "🎟",
  "🎫",
  "🎖",
  "🏆",
  "🏅",
  "🥇",
  "🥈",
  "🥉",
  "⚽",
  "🏀",
  "🏈",
  "⚾",
  "🎾",
  "🏐",
  "🏉",
  "🎱",
  "🏓",
  "🏸",
  "🥅",
  "🏒",
  "🏑",
  "🏏",
  "⛳",
  "🏹",
  "🎣",
  "🥊",
  "🥋",
  "🎽",
  "⛸",
  "🥌",
  "🛷",
  "🎿",
  "⛷",
  "🏂",
  "🏋️",
  "🤼",
  "🤸",
  "🤺",
  "⛹️",
  "🤾",
  "🏌️",
  "🏇",
  "🧘",
];

/**
 * Generates a random emoji from the fun emojis array.
 * @returns {string} - A randomly selected emoji.
 */
export const getRandomEmoji = () => {
  return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};
