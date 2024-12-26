$(document).ready(function () {
    let timerInterval;
    let isBreak = false;

    const alarmSound = $('#alarm-sound')[0];

    // Start Timer Button
    $('#start-timer').on('click', function () {
        const studyTime = parseInt($('#study-time').val()) * 60;
        const breakTime = parseInt($('#break-time').val()) * 60;

        if (!studyTime || !breakTime) {
            alert('Please enter both study and break times.');
            return;
        }

        startPomodoro(studyTime, breakTime);
    });

    // Stop Timer Button
    $('#stop-timer').on('click', function () {
        stopPomodoro();
    });

    function startPomodoro(studyTime, breakTime) {
        let time = isBreak ? breakTime : studyTime;
        updateTimerDisplay(time);

        timerInterval = setInterval(() => {
            time--;
            updateTimerDisplay(time);

            if (time <= 0) {
                clearInterval(timerInterval);
                alarmSound.play();

                if (isBreak) {
                    showNotification('Time to Study!', 'blue');
                } else {
                    showNotification('Time for a Break!', 'green');
                }

                isBreak = !isBreak;
                $('#timer-label').text(isBreak ? 'Break Time' : 'Study Time');
                startPomodoro(studyTime, breakTime);
            }
        }, 1000);
    }

    function stopPomodoro() {
        clearInterval(timerInterval);
        $('#timer-label').text('Timer Stopped');
        $('#time').text('00:00');
    }

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        $('#time').text(`${minutes}:${remainingSeconds.toString().padStart(2, '0')}`);
    }

    // Show Notification
    function showNotification(message, color) {
        const notification = $('<div></div>')
            .text(message)
            .css({
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '15px 25px',
                backgroundColor: color,
                color: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                fontSize: '16px',
                fontWeight: 'bold',
            });

        $('body').append(notification);

        // Remove Notification after 5 seconds
        setTimeout(() => {
            notification.fadeOut(500, () => {
                notification.remove();
            });
        }, 5000);
    }
});
$('#add-todo').on('click', function () {
    const task = $('#todo-input').val().trim();

    if (task) {
        const listItem = $('<li></li>').text(task);

        // Action Buttons
        const completeButton = $('<button>Complete</button>').addClass('complete-btn');
        const deleteButton = $('<button>Delete</button>').addClass('delete-btn');

        // Append Buttons to List Item
        listItem.append(completeButton, deleteButton);

        // Add Event Listeners to Buttons
        completeButton.on('click', function () {
            listItem.toggleClass('completed');
        });

        deleteButton.on('click', function () {
            listItem.remove();
        });

        // Append to To-Do List
        $('#todo-list').append(listItem);

        // Clear Input Field
        $('#todo-input').val('');
    } else {
        alert('Please enter a task!');
    }
});