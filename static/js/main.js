 let isResizing = false;
    const sidebar = document.getElementById('sidebar');
    const resizer = document.getElementById('resizer');

    resizer.addEventListener('mousedown', (event) => {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    function handleMouseMove(event) {
        if (!isResizing) return;
        const newWidth = event.clientX;
        sidebar.style.width = `${newWidth}px`;
        document.getElementById('content').style.marginLeft = `${newWidth + 5}px`;
    }

    document.getElementById('taskBank').addEventListener('click', function(e) {
        e.preventDefault();
        const levels = document.getElementById('levels');
        if (levels.style.display === "none") {
            levels.style.display = "block";
        } else {
            levels.style.display = "none";
        }
    });

    document.querySelectorAll('.toggle-lessons').forEach(button => toggleLessonsListener(button));
    document.querySelectorAll('.move-up').forEach(button => moveUpListener(button));
    document.querySelectorAll('.move-down').forEach(button => moveDownListener(button));
    document.querySelectorAll('.add-row').forEach(button => addRowListener(button));
    document.querySelectorAll('.delete-row').forEach(button => deleteRowListener(button));

    document.querySelectorAll('.move-up-lesson').forEach(button => moveUpLessonListener(button));
    document.querySelectorAll('.move-down-lesson').forEach(button => moveDownLessonListener(button));
    document.querySelectorAll('.add-row-lesson').forEach(button => addLessonListener(button));
    document.querySelectorAll('.delete-row-lesson').forEach(button => deleteLessonListener(button));

    function moveUpListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            let prevItem = item.previousElementSibling;
            if (prevItem) {
                item.parentNode.insertBefore(item, prevItem);
            }
        });
    }

    function moveDownListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            let nextItem = item.nextElementSibling;
            if (nextItem) {
                item.parentNode.insertBefore(nextItem, item);
            }
        });
    }

    function addRowListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;

            let newItem = document.createElement('div');
            newItem.className = "menu-item submenu-item";
            newItem.innerHTML = `
                <button class="toggle-lessons">&#8658;</button>
                <span class="menu-label">New Level</span>
                <button class="move-up">&#8593;</button>
                <button class="move-down">&#8595;</button>
                <button class="delete-row">&#x2715;</button>
                <div id="lessons">
                    <button class="add-row">&#43;</button>
                </div>
            `;

            item.parentNode.insertBefore(newItem, item.nextSibling);

            toggleLessonsListener(newItem.querySelector('.toggle-lessons'));
            makeEditable(newItem.querySelector('.menu-label'));
            addRowListener(newItem.querySelector('.add-row'));
            deleteRowListener(newItem.querySelector('.delete-row'));
            moveUpListener(newItem.querySelector('.move-up'));
            moveDownListener(newItem.querySelector('.move-down'));
            addLessonListener(newItem.querySelector('#lessons .add-row-lesson'));
        });
    }

    function deleteRowListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            item.parentNode.removeChild(item);
        });
    }

    function makeEditable(label) {
        label.addEventListener('dblclick', function() {
            this.setAttribute('contenteditable', 'true');
            this.focus();
        });

        label.addEventListener('blur', function() {
            this.setAttribute('contenteditable', 'false');
        });
    }

    function toggleLessonsListener(button) {
        button.addEventListener('click', function() {
            const lessons = this.parentElement.querySelector('#lessons');
            if (lessons.style.display === 'none' || !lessons.style.display) {
                lessons.style.display = 'block';
                this.innerHTML = "&#8659;";  // символ вниз
            } else {
                lessons.style.display = 'none';
                this.innerHTML = "&#8658;";  // символ вправо
            }
        });
    }

    function createLesson() {
        let lesson = document.createElement('div');
        lesson.className = "menu-item submenu-item lesson-item";
        lesson.innerHTML = `
            <span class="lesson-label">New Lesson</span>
            <button class="move-up-lesson">&#8593;</button>
            <button class="move-down-lesson">&#8595;</button>
            <button class="add-row-lesson">&#43;</button>
            <button class="delete-row-lesson">&#x2715;</button>
        `;

        makeEditable(lesson.querySelector('.lesson-label'));
        addLessonListener(lesson.querySelector('.add-row-lesson'));
        deleteLessonListener(lesson.querySelector('.delete-row-lesson'));
        moveUpLessonListener(lesson.querySelector('.move-up-lesson'));
        moveDownLessonListener(lesson.querySelector('.move-down-lesson'));

        return lesson;
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function addLessonListener(button) {
        button.addEventListener('click', function() {
            let lessonContainer = this.parentElement;
            let newLesson = createLesson();
            insertAfter(lessonContainer, newLesson);
        });
    }

    function deleteLessonListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            item.parentNode.removeChild(item);
        });
    }

    function moveUpLessonListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            let prevItem = item.previousElementSibling;
            if (prevItem) {
                item.parentNode.insertBefore(item, prevItem);
            }
        });
    }

    function moveDownLessonListener(button) {
        button.addEventListener('click', function() {
            let item = this.parentElement;
            let nextItem = item.nextElementSibling;
            if (nextItem) {
                item.parentNode.insertBefore(nextItem, item);
            }
        });
    }

    document.querySelectorAll('.menu-label').forEach(makeEditable);
    document.querySelectorAll('.lesson-label').forEach(makeEditable);
