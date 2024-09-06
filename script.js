const schedule = {
    "Monday": [
        ["Физика", "Кабинет 21", "Шаталова Ю.В."],
        ["Биология", "Кабинет 20", "Андреева С.И."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Русский", "Кабинет 14", "Попова Е.В."],
        ["Физ-ра", "Спортзал", "Шаталова Н.Е."],
        ["Ин.яз.", "Кабинет 203", "Ивлева Т.О."],
        ["РВ", "Кабинет 301", "Лаврова Г.Н."]
    ],
    "Tuesday": [
        ["География", "Кабинет 18", "Изюмцева О.И."],
        ["Химия", "Кабинет 20", "Андреева С.И."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Литература", "Кабинет 14", "Попова Е.В."],
        ["Геометрия", "Кабинет 16", "Горовенко М.А."],
        ["Основы Пед.", "Кабинет 501", "Маркина Г.В."],
        ["Ин.яз.", "Кабинет 203", "Ивлева Т.О."]
    ],
    "Wednesday": [
        ["Физика", "Кабинет 21", "Шаталова Ю.В."],
        ["Обществознание", "Кабинет 12", "Иванова Е.В."],
        ["Обществознание", "Кабинет 12", "Иванова Е.В."],
        ["История", "Кабинет 12", "Иванова Е.В."],
        ["Информатика", "Кабинет 17", "Якименко С.А."],
        ["Алгебра", "Кабинет 19", "Горовенко М.А."],
        ["Литература", "Кабинет 14", "Попова Е.В."]
    ],
    "Thursday": [
        ["Геометрия", "Кабинет 16", "Горовенко М.А."],
        ["Литература", "Кабинет 14", "Попова Е.В."],
        ["Мои горизонты", "Спортзал", "Лаврова Г.Н."],
        ["Русский", "Кабинет 14", "Попова Е.В."],
        ["Физ-ра", "Спортзал", "Шаталова Н.Е."],
        ["Ин.яз.", "Кабинет 203", "Ивлева Т.О."],
        ["Информатика", "Кабинет 17", "Якименко С.А."]
    ],
    "Friday": [
        ["Психология", "Кабинет 501", "Севостьянова Е.Ю."],
        ["Обществознание", "Кабинет 12", "Иванова Е.В."],
        ["ОБЗР", "Кабинет 103", "Селезнев А.В."],
        ["Обществознание", "Кабинет 102", "Иванова Е.В."],
        ["История", "Кабинет 12", "Иванова Е.В."],
        ["Алгебра", "Кабинет 16", "Горовенко М.А."],
        ["Вероятность и статистика", "Кабинет 16", "Горовенко М.А."]
    ]
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

function getCurrentLessonIndex() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < lessonTimes.length; i++) {
        const [start, end] = lessonTimes[i].split(' - ');
        const [startHour, startMinute] = start.split(':').map(Number);
        const startMinutes = startHour * 60 + startMinute;

        if (currentMinutes + 10 >= startMinutes && currentMinutes < startMinutes) {
            return i;
        }
    }
    return -1;
}

function loadSchedule() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const todayName = days[today];
    const todaySchedule = schedule[todayName] || [];

    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';

    const currentLessonIndex = getCurrentLessonIndex();

    todaySchedule.forEach((lesson, index) => {
        const row = document.createElement('tr');

        if (index === currentLessonIndex) {
            row.style.backgroundColor = 'lightgreen';
        } else if (index < currentLessonIndex) {
            row.style.backgroundColor = 'lightcoral';
        }
        
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

        scheduleBody.appendChild(row);
    });
}

loadSchedule();