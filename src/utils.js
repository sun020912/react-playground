import { LoremIpsum } from "lorem-ipsum";
import store from "./store";
import { basicColors } from "./config";

export const loremTodo = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 2,
  },
});

export const extractPageNum = (url) => url.split(`?page=`)[1];
