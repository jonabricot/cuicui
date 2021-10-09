type QuestionOptions = {
  wait?: number;
  timing?: number;
}

export class Question{
  wait = 3000;
  timing = 5000;
  mode;
  title;
  response;

  constructor(title, response, {wait, timing}: QuestionOptions = {}) {
    this.title = title;
    this.response = response;

    if (wait) {
      this.wait = wait;
    }

    if (timing) {
      this.timing = timing;
    }
  }

  verify(response) {
    return response === this.response
  }

  serialize(): any {
    return {
      title: this.title,
      mode: this.mode,
      wait: this.wait,
      timing: this.timing,
    }
  }
}