import { IOperators } from "../types";

export const OPERATORS = {
  bool: { equals: "Equals", notEquals: "Not Equals" },
  text: {
    equals: "Equals",
    notEquals: "Not Equals",
    likes: "Likes",
    notLikes: "Not Likes",
    containAll: "Contains All",
  },
  number: {
    equals: "Equals",
    gt: "Greater than",
    gte: "Greater than Equal",
    lt: "Less than",
    lte: "Less than Equal",
    between: "Between",
  },
  time: {
    between: "Between",
    gte: "Greater than Equal",
    lte: "Less than Equal",
    equals: "Equals",
  },
} as IOperators;
