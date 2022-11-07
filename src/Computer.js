const MissionUtils = require("@woowacourse/mission-utils");

class Computer {
  constructor() {
    this.answer;
  }

  generateDifferRandomNumArr(numOfDigits) {
    const DIFFER_RANDOM_NUM_ARR = [];
    let randomNum;
    while (DIFFER_RANDOM_NUM_ARR.length < numOfDigits) {
      randomNum = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!DIFFER_RANDOM_NUM_ARR.includes(randomNum)) {
        DIFFER_RANDOM_NUM_ARR.push(randomNum);
      }
    }
    return DIFFER_RANDOM_NUM_ARR;
  }

  getHintOfAnswer(result) {
    this.isPlaying = true;
    if (result.ball === 0 && result.strike === 0) {
      MissionUtils.Console.print("낫싱");
      return this.isPlaying;
    }
    if (result.ball === 0 && result.strike === 3) {
      MissionUtils.Console.print("3스트라이크");
      MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      this.isPlaying = false;
      return this.isPlaying;
    }
    if (result.ball > 0 && result.strike === 0) {
      MissionUtils.Console.print(`${result.ball}볼`);
      return this.isPlaying;
    }
    if (result.ball === 0 && result.strike > 0) {
      MissionUtils.Console.print(`${result.strike}스트라이크`);
      return this.isPlaying;
    }
    MissionUtils.Console.print(`${result.ball}볼 ${result.strike}스트라이크`);
    return this.isPlaying;
  }

  scoreUserInput(answerArr, userInputArr) {
    let result = { ball: 0, strike: 0 };
    const LENTH_OF_ARRAY = 3;

    if (!userInputArr.some((num) => answerArr.includes(num))) {
      return result;
    }
    if (userInputArr.every((num) => answerArr.includes(num))) {
      for (let i = 0; i < LENTH_OF_ARRAY; i++) {
        if (answerArr[i] === userInputArr[i]) {
          result.strike += 1;
        }
        if (answerArr[i] !== userInputArr[i]) {
          result.ball += 1;
        }
      }
      return result;
    }
    for (let i = 0; i < LENTH_OF_ARRAY; i++) {
      if (answerArr[i] === userInputArr[i]) {
        result.strike += 1;
      }
      if (
        answerArr[i] !== userInputArr[i] &&
        answerArr.includes(userInputArr[i])
      ) {
        result.ball += 1;
      }
    }
    return result;
  }
}

module.exports = Computer;
