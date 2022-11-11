// ================================
// START YOUR APP HERE
// ================================
const init = {
  monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10) ? '0' + num : num,
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }
    return index;
  },
  //todo
  inputBox: document.getElementById('input-box'),
  inputDate: document.getElementById('input-button'),
  inputList: document.getElementById('input-list'),
  delText: 'X',
  dataCnt: 1,
  todoList:[]
  
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.btn-cal.next');
const $btnPrev = document.querySelector('.btn-cal.prev');

/**
 * @param {number} date
 * @param {number} dayIn
*/
function loadDate (date, dayIn) {
  document.querySelector('.cal-date').textContent = date;
  document.querySelector('.cal-day').textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM (fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  let markToday;  // for marking today date
  
  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  document.querySelector('.cal-month').textContent = init.monList[mm];
  document.querySelector('.cal-year').textContent = yy;

  let trtd = '';
  let startCount;
  let countDay = 0;
  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += '<td>'
      } else {
        let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
        trtd += '<td class="day';
        trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"';
        trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
      }
      trtd += (startCount) ? ++countDay : '';
      if (countDay === lastDay.getDate()) { 
        startCount = 0; 
      }
      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  $calBody.innerHTML = trtd;
}

// /**
//  * @param {string} val
//  */
// function createNewList (val) {
//   let id = new Date().getTime() + '';
//   let yy = init.activeDate.getFullYear();
//   let mm = init.activeDate.getMonth() + 1;
//   let dd = init.activeDate.getDate();
//   const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

//   let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

//   let eventData = {};
//   eventData['date'] = date;
//   eventData['memo'] = val;
//   eventData['complete'] = false;
//   eventData['id'] = id;
//   init.event.push(eventData);
//   $todoList.appendChild(createLi(id, val, date));
// }

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));
 
var target = init.activeDate
$calBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('day')) {
    if (init.activeDTag) {
      init.activeDTag.classList.remove('day-active');
    }
    target = init.activeDate
    let day = Number(e.target.textContent);
    loadDate(day, e.target.cellIndex);
    e.target.classList.add('day-active');
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
    reshowingList();
  }
});


// todo
function reshowingList(){
    var keyValue = target.getFullYear() + '' + (target.getMonth()+1)+ '' + target.getDate();
    if(init.todoList[keyValue] === undefined){
        init.inputList.textContent = '';
        init.todoList[keyValue] = [];
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
    }else if(init.todoList[keyValue].length ===0){
        init.inputList.textContent = "";
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
    }else{
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
        var $div = document.createElement('div');
        for(var i = 0; i < init.todoList[keyValue].length; i++){
            var $div = document.createElement('div');
            $div.textContent = '-' + init.todoList[keyValue][i];
            var $btn = document.createElement('button');
            $btn.setAttribute('type', 'button'); 
            $btn.setAttribute('id', 'del-ata');
            $btn.setAttribute('id', init.dataCnt+keyValue);
            $btn.setAttribute('class', 'del-data');
            $btn.textContent = init.delText;
            init.inputList.appendChild($div);
            init.inputList.appendChild($btn);
            $div.addEventListener('click',checkList);
            $btn.addEventListener('click',deleteTodo);
            init.inputBox.value = '';
            function deleteTodo(){
                $div.remove();
                $btn.remove();
            }
        }
    }

}
init.inputDate.addEventListener('click',addTodoList);
function addTodoList(){
    var keyValue = target.getFullYear() + '' + (target.getMonth()+1) + '' + target.getDate();
    init.todoList[keyValue] = [];

    var $div = document.createElement('div');
    $div.textContent = '-' + init.inputBox.value;
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button'); 
    $btn.setAttribute('id', 'del-ata');
    $btn.setAttribute('id', init.dataCnt+keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = init.delText;
    init.inputList.appendChild($div);
    init.inputList.appendChild($btn);
    init.todoList[keyValue].push(init.inputBox.value);
    init.dataCnt++;
    init.inputBox.value = '';
    $div.addEventListener('click',checkList);
    $btn.addEventListener('click',deleteTodo);
    function deleteTodo(){
        $div.remove();
        $btn.remove();
    }
    console.log(init.todoList);
}
function checkList(e){
    e.currentTarget.classList.add('checked');
}
