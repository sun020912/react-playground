import { LoremIpsum } from "lorem-ipsum";

export const loremTodo = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 2,
  },
});
