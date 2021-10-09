import {Question} from "./Question";

export class QuestionChoice extends Question{
  choices = [];
  mode = 'choice';

  constructor(title, choices, response, options = {}) {
    super(title, response, options);
    this.choices = choices
  }

  serialize() {
    return {
      ...super.serialize(),
      choices: this.choices,
    }
  }
}