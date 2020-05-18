// This file is for all kinds of miscellaneous helper functions that could
// be useful throughout the entire app, even if just in two places

// If you see any repetitve helper functions that would fit into here,
// add it. If you write a function that you think has a general enough
// purpose to go here, add it.

// Shorten returns a shortened string truncated by charLimit, and an ellipse
// is added to the end if the text gets trimmed at all
export const shorten = (text, charLimit) => {
  if (!text) return '';
  else if (text.length > charLimit) {
    let end = charLimit;
    const avoidChars = [' ', ',', '.', '!'];
    while (avoidChars.includes(text.charAt(end)) && end >= charLimit - 10) {
      end--;
    }
    return `${text.substring(0, end)}...`;
  } else return text;
};

// Add more above this line...
