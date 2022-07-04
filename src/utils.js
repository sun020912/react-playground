import { LoremIpsum } from "lorem-ipsum";

export const loremTodo = new LoremIpsum();

export const extractPageNum = (url) => url.split(`?page=`)[1];
