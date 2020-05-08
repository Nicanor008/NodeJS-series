const Todo = require("../todo/todo_model");

exports.getAnalytics = (req, res) => {
  Todo.find().then((data) => {
    if (data.length === 0) {
      return res.status(404).json({
        message: "Sorry Champ, No items available to generate analytics",
      });
    }
    let totalTodo = [];
    let totalGoals = [];
    let totalReminders = [];
    let todoCompletedItems = [];
    let todoUncompletedItems = [];
    let goalComplete = [];
    let goalUncomplete = [];
    let reminderComplete = [];
    let reminderUncomplete = [];
    let todoCompleteDuration = 0;
    let todoUncompleteDuration = 0;
    let goalCompleteDuration = 0;
    let goalUncompleteDuration = 0;
    let reminderCompleteDuration = 0;
    let reminderUncompleteDuration = 0;

    data.filter((filteredData) => {
      // todo
      if (filteredData.category === "todo") {
        totalTodo.push(filteredData);
      }

      //   goals
      if (filteredData.category === "goal") {
        totalGoals.push(filteredData);
      }

      //   reminder
      if (filteredData.category === "reminder") {
        totalReminders.push(filteredData);
      }
    });

    totalTodo.filter((d) => {
      if (d.completed) {
        todoUncompleteDuration += d.duration;
        todoCompletedItems.push(d);
      } else {
        todoCompleteDuration += d.duration;
        todoUncompletedItems.push(d);
      }
    });

    totalGoals.filter((d) => {
      if (d.completed) {
        goalCompleteDuration += d.duration
        goalComplete.push(d);
      } else {
        goalUncompleteDuration += d.duration
        goalUncomplete.push(d);
      }
    });

    totalReminders.filter((d) => {
      if (d.completed) {
        reminderCompleteDuration += d.duration
        reminderComplete.push(d);
      } else {
        reminderUncompleteDuration += d.duration
        reminderUncomplete.push(d);
      }
    });
    return res.status(200).json({
      message: "Awesome, here is your Analytics data",
      totalItems: data.length,
      todo: {
        totalTodo: totalTodo.length,
          totalCompletedTodo: todoCompletedItems.length,
          totalCompleteTodoDuration: `${todoCompleteDuration} hours`,
          todoUncompleteTodoDuration: `${todoUncompleteDuration} hours`,
          totalUncompletedTodo: todoUncompletedItems.length,
      },
      goals: {
        totalGoals: totalGoals.length,
        totalCompletedGoals: goalComplete.length,
        goalCompleteDuration: `${goalCompleteDuration} hours`,
        totalUncompletedGoals: goalUncomplete.length,
        goalUncompleteDuration: `${goalUncompleteDuration} hours`,
      },
      reminder: {
        totalReminders: totalReminders.length,
        totalCompletedReminder: reminderComplete.length,
        reminderCompleteDuration: `${reminderCompleteDuration} hours`,
        totalUncompletedReminder: reminderUncomplete.length,
        reminderUncompleteDuration: `${reminderUncompleteDuration} hours`,
      },
    });
  });
};
