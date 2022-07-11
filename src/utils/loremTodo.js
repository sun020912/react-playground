import { LoremIpsum } from "lorem-ipsum";

const loremTodo = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 2,
  },
});

export default loremTodo;
