// Returns a path string for a random recipe id
export default function getRandomRecipePath(max = 20) {
  const id = Math.floor(Math.random() * max) + 1;
  return `/recipe/${id}`;
}
