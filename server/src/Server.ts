import { WebSocketServer } from 'ws'
import {Player} from "./Player";
import {Message} from "./Message";
import {QuestionChoices} from "./question/QuestionChoices";
import {QuestionChoice} from "./question/QuestionChoice";
import {QuestionFree} from "./question/QuestionFree";

export class Server {
  settings;
  players = [];
  questions = [];
  questionIndex = null;
  endOfTimeTimer = null;

  constructor(settings = { port: 8080 }) {
    this.settings = settings;
    this.questions = [
      new QuestionChoices('Answer the question!', ['Oui', 'Non', 'Peut-être'], [1, 2]),
      new QuestionChoice('Answer the new question!', ['Oui', 'Non', 'c mor'], 2),
      new QuestionFree('Favourite banana', 'yellow'),
    ];
  }

  start() {
    const server = new WebSocketServer(this.settings);

    server.on('connection', connection => {
      let player = new Player(connection);
      this.players.push(player);

      this.broadcastPlayerList();

      connection.on('message', data => {
        const message = new Message(data).receive();

        if (message.type === 'nickname') {
          player.setName(message.data);
          this.broadcastPlayerList();

          player.send({type: 'player', data: player.serialize()});

          if (this.getCurrentQuestion()) {
            const questionData = this.getCurrentQuestionMessage();
            player.send({...questionData, data: {...questionData.data, skipWaiting: true}});
          }
        }

        if (message.type === 'response') {
          player.setResponse(this.questionIndex, message.data);

          const playersWithoutResponses = this.players.filter(player => !player.hasResponse(this.questionIndex));
          if (playersWithoutResponses.length === 0) {
            // all players have submitted responses. Notify the admin ?
          }
        }

        if (message.type === 'next') {
          this.broadcastNextQuestion();
        }

        if (message.type === 'show_correct_answers') {
          this.broadcastEndOfTime()
        }

        if (message.type === 'reset') {
          this.questionIndex = null;
          this.broadcast(this.getCurrentQuestionMessage())
        }
      });

      connection.on('close', () => {
        this.players = this.players.filter(playerLoop => player.id !== playerLoop.id);
        this.broadcastPlayerList();
      })
    })
  }

  broadcastEndOfTime() {
    this.broadcast({type: 'end_of_time'});

    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      this.broadcast({type: 'correct_response', data: currentQuestion.response});
    }
  }

  broadcastNextQuestion() {
    if (this.questionIndex === null) {
      this.questionIndex = 0;
    }
    else {
      this.questionIndex += 1;
    }

    this.broadcast(this.getCurrentQuestionMessage())
  }

  getCurrentQuestionMessage() {
    const currentQuestion = this.getCurrentQuestion();
    return {type: 'question', data: currentQuestion ? currentQuestion.serialize() : null}
  }

  getCurrentQuestion() {
    return this.questions[this.questionIndex]
  }

  broadcast(message) {
    this.players.forEach(player => player.send(message))
  }

  getSerializedPlayers() {
    return this.players.map(player => player.serialize())
  }

  broadcastPlayerList() {
    this.broadcast(this.getPlayerListMessage())
  }

  getPlayerListMessage() {
    return {type: 'players', data: this.getSerializedPlayers()}
  }
}