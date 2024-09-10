const schedule = {
    "Monday": [
        ["Физика", "Кабинет 15", "Шаталова Ю.В."],
        ["Биология", "Кабинет 20", "Андреева С.И."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Русский", "Кабинет 10", "Попова Е.В."],
        ["Физ-ра", "Спортзал", "Шаталова Н.Е."],
        ["Ин.яз.", "Кабинет 21", "Ивлева Т.О."],
        ["РВ", "Кабинет 13", "Лаврова Г.Н."]
    ],
    "Tuesday": [
        ["География", "Кабинет 18", "Изюмцева О.И."],
        ["Химия", "Кабинет 20", "Андреева С.И."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Литература", "Кабинет 21", "Попова Е.В."],
        ["Геометрия", "Кабинет 16", "Горовенко М.А."],
        ["Основы Пед.", "Кабинет 13", "Маркина Г.В."],
        ["Ин.яз.", "Кабинет *", "Ивлева Т.О."]
    ],
    "Wednesday": [
        ["Физика", "Кабинет 21", "Шаталова Ю.В."],
        ["Обществознание", "Кабинет 16", "Иванова Е.В."],
        ["Обществознание", "Кабинет 21", "Иванова Е.В."],
        ["История", "Кабинет 21", "Иванова Е.В."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Алгебра", "Кабинет 16", "Горовенко М.А."],
        ["Литература", "Кабинет 11", "Попова Е.В."]
    ],
    "Thursday": [
        ["Геометрия", "Кабинет 16", "Горовенко М.А."],
        ["Литература", "Кабинет 15", "Попова Е.В."],
        ["Мои горизонты", "13", "Лаврова Г.Н."],
        ["Русский", "Кабинет 15", "Попова Е.В."],
        ["Физ-ра", "Спортзал", "Шаталова Н.Е."],
        ["Ин.яз.", "Кабинет 21", "Ивлева Т.О."],
        ["Информатика", "Кабинет 17", "Якименко С.А."]
    ],
    "Friday": [
        ["Психология", "Кабинет 14", "Севостьянова Е.Ю."],
        ["Обществознание", "Кабинет 12", "Иванова Е.В."],
        ["Физика", "Кабинет 13", "Селезнев А.В."],
        ["Обществознание", "Кабинет 14", "Иванова Е.В."],
        ["История", "Кабинет 12", "Иванова Е.В."],
        ["Алгебра", "Кабинет 16", "Горовенко М.А."],
        ["Вероятность и статистика", "Кабинет 16", "Горовенко М.А."]
    ]
};

const homework = {
    "Monday": {},
    "Tuesday": {},
    "Wednesday": {},
    "Thursday": {},
    "Friday": {}
};

const lessonTimes = [
    "08:00 - 08:40",
    "08:50 - 09:30",
    "09:40 - 10:20",
    "10:30 - 11:10",
    "11:20 - 12:00",
    "12:10 - 12:50",
    "13:00 - 13:40"
];

const adminPassword = 'admin123'; // Пароль для добавления домашнего задания

let currentDayIndex = new Date().getDay() - 1; // Понедельник = 0

function getDayName(index) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return days[index];
}

function loadSchedule() {
    const todayName = getDayName(currentDayIndex);
    const todaySchedule = schedule[todayName] || [];
    const scheduleBody = document.getElementById('schedule-body');
    const dayOfWeek = document.getElementById('day-of-week');
    scheduleBody.innerHTML = '';

    dayOfWeek.textContent = `Сегодня: ${todayName}`;

    todaySchedule.forEach((lesson, index) => {
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = lessonTimes[index];
        row.appendChild(timeCell);

        lesson.forEach(detail => {
            const cell = document.createElement('td');
            cell.textContent = detail;
            row.appendChild(cell);
        });

        const homeworkCell = document.createElement('td');
        const homeworkText = homework[todayName][index + 1] || '';
        homeworkCell.textContent = homeworkText;
        row.appendChild(homeworkCell);

        scheduleBody.appendChild(row);
    });
}

function previousDay() {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        loadSchedule();
    }
}

function nextDay() {
    if (currentDayIndex < 4) {
        currentDayIndex++;
        loadSchedule();
    }
}

function showHomeworkDialog() {
    document.getElementById('homework-dialog').style.display = 'block';
}

function hideHomeworkDialog() {
    document.getElementById('homework-dialog').style.display = 'none';
}

function addHomework() {
    const password = document.getElementById('password').value;
    const day = document.getElementById('homework-day').value;
    const lessonNumber = parseInt(document.getElementById('homework-lesson').value);
    const text = document.getElementById('homework-text').value;

    if (password === adminPassword) {
        if (!homework[day]) {
            homework[day] = {};
        }

        homework[day][lessonNumber] = text;

        hideHomeworkDialog();
        loadSchedule();
    } else {
        alert('Неверный пароль! Пожалуйста, попробуйте снова.');
    }
}

loadSchedule();
