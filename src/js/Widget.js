/* eslint-disable max-len */
export default class Widget {
  constructor(parent) {
    this.parent = parent;
    this.eventSource = new EventSource('https://eleven-one.herokuapp.com/sse');
    this.arrOfEvents = {
      action: 'Идёт перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать',
      freekick: 'Нарушение правил, будет штрафной удар',
      freekickIcon: '<img class="img" src="https://img.icons8.com/ios-glyphs/30/000000/exclamation-mark.png">',
      goal: 'Отличный удар! И Г-О-Л!',
      goalIcon: '<img class="img" src="https://img.icons8.com/metro/26/000000/football2.png"></img>',
    };
  }

  create() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.eventSource.addEventListener('open', () => {
      console.log('connection open');
    });

    this.eventSource.addEventListener('error', (event) => {
      console.log('something went wrong');
      console.log(event);
    });

    this.eventSource.addEventListener('action', (event) => {
      console.info(event);
      const arr = this.splitStringPoint(event.data);
      this.makeEventCard(arr[arr.length - 1], this.arrOfEvents.action);

      if (this.parent.childElementCount < (this.splitStringPoint(event.data).length) / 2) {
        this.differents = (this.splitStringPoint(event.data).length) / 2 - this.parent.childElementCount;
        this.makeStory(arr, this.differents);
      }
    });

    this.eventSource.addEventListener('freekick', (event) => {
      const arr = this.splitStringPoint(event.data);
      this.makeEventCard(arr[arr.length - 1], this.arrOfEvents.freekick, this.arrOfEvents.freekickIcon);

      if (this.parent.childElementCount < (this.splitStringPoint(event.data).length) / 2) {
        this.differents = (this.splitStringPoint(event.data).length) / 2 - this.parent.childElementCount;
        this.makeStory(arr, this.differents);
      }
    });

    this.eventSource.addEventListener('goal', (event) => {
      const arr = this.splitStringPoint(event.data);
      this.makeEventCard(arr[arr.length - 1], this.arrOfEvents.goal, this.arrOfEvents.goalIcon);

      if (this.parent.childElementCount < (this.splitStringPoint(event.data).length) / 2) {
        this.differents = (this.splitStringPoint(event.data).length) / 2 - this.parent.childElementCount;
        this.makeStory(arr, this.differents);
      }
    });
  }

  makeEventCard(time, eventText, icn) {
    let iconOf = icn;
    if (!iconOf) {
      iconOf = '';
    }
    const divEl = document.createElement('div');
    divEl.className = 'gameEvent';
    divEl.innerHTML = `
    <span class="date">${time}</span>
    ${iconOf}
    <span class="event">${eventText}</span>`;

    this.parent.appendChild(divEl);
  }

  makeStory(arr, diffCount) { // массив и кол-во пропущенных
    // console.log('________');
    // console.log(`my arr from server: ${this.splitStringPoint(event.data).length / 2}`);
    // console.log(`already have: ${this.parent.childElementCount}`);
    // console.log(`this.differents: ${this.differents}`);
    // console.log('________');

    // console.log(`пропустили ${diffCount} записей`);
    const divEl = document.createElement('div');
    divEl.className = 'gameStory';
    let iconOf = '';
    for (let i = 0; i <= diffCount; i += 2) {
      if (arr[i] === 'freekick') {
        iconOf = this.arrOfEvents.freekickIcon;
      } else if (arr[i] === 'goal') {
        iconOf = this.arrOfEvents.goalIcon;
      } else if (arr[i] === 'action') {
        iconOf = '';
      }

      const divElLoc = document.createElement('div');
      divElLoc.className = 'gameEvent';
      divElLoc.innerHTML = `
      <span class="date">${arr[i + 1]}</span>
      ${iconOf}
      <span class="event">${this.arrOfEvents[arr[i]]}</span>`;

      divEl.appendChild(divElLoc);
    }
    this.parent.insertBefore(divEl, this.parent.firstChild);
  }

  splitStringPoint(stringToSplit) {
    const arrayOfStrings = stringToSplit.split(',');
    return arrayOfStrings;
  }
}