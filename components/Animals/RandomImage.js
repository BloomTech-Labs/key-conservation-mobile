import animalData from '../../components/Animals/animalData';

export const randomImage = () => {
  //10 images in animalData by id starting at 1
  const chosen = Math.floor(Math.random() * 10);
  const chosenAnimal = animalData[chosen];
  const image = chosenAnimal.image;
  //   console.log(chosen, chosenAnimal);
  return image;
};
