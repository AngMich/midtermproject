$(document).ready(function () {
  let tasks = [];

  function updateTaskCounters() {//function that updates the counter of the tasks
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;

    $('#totalTasks').text(totalTasks);
    $('#pendingTasks').text(pendingTasks);
    $('#completedTasks').text(completedTasks);
  }

  function renderTasks(filteredTasks = tasks) {//this function filters the task table
    const taskList = $('#taskList');
    taskList.empty();

    filteredTasks.forEach((task, index) => {
      const row = `
        <tr data-index="${index}">
          <td>${task.name}</td>
          <td>${task.description}</td>
          <td>${task.dueDate || '-'}</td>
          <td>${task.priority}</td>
          <td>${task.status}</td>
          <td>
            ${task.status === 'Pending' ? `<button class="btn btn-success btn-sm complete-task">Complete</button>` : ''}
            <button class="btn btn-danger btn-sm delete-task">Delete</button>
          </td>
        </tr>
      `;
      taskList.append(row);
    });

    updateTaskCounters();
  }

  $('#taskName').change(function () {//if statments for handeling the other and ticket taks
      if ($(this).val() === 'Other') {
        $('#customTaskDiv').show();
        $('#customTaskName').prop('required', true);
      } 
      if($(this).val() === 'Buy Tickets for Next Game'){
          $('#dueDateDiv').show();
          $('#dueDate').prop('required', true);
      }
      if ($(this).val() !== 'Buy Tickets for Next Game'){
          $('#dueDateDiv').hide();
          $('#dueDate').prop('required', false);
      }
      if($(this).val() !== 'Other'){
          $('#customTaskDiv').hide();
          $('#customTaskName').prop('required', false);
      }
  });

  $('#taskForm').submit(function (e) {//submits the task
    e.preventDefault();

    const taskName = $('#taskName').val();
    const taskDescription = $('#taskDescription').val();
    const dueDate = $('#dueDate').val();
    const taskPriority = $('#taskPriority').val();

    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate: dueDate,
      priority: taskPriority,
      status: 'Pending'
    };

    tasks.push(newTask);
    renderTasks();

    this.reset();
  });

  $('#taskList').on('click', '.complete-task', function () {//button to make a task complete 
    const taskIndex = $(this).closest('tr').data('index');
    tasks[taskIndex].status = 'Completed';
    renderTasks();
  });

  $('#taskList').on('click', '.delete-task', function () {//button to delete a task
    const taskIndex = $(this).closest('tr').data('index');
    tasks.splice(taskIndex, 1);
    renderTasks();
  });

  $('#filterStatus').change(function () {//filters the task by status
    const filter = $(this).val();

    if (filter === 'all') {
      renderTasks();
    } else {
      const filteredTasks = tasks.filter(task => task.status === (filter === 'completed' ? 'Completed' : 'Pending'));
      renderTasks(filteredTasks);
    }
  });

  $('#sortTasks').change(function () {//sorts by and or due date
    const sortBy = $(this).val();

    const sortedTasks = [...tasks];

    if (sortBy === 'dueDate') {
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'taskName') {
      sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderTasks(sortedTasks);
  });
});
