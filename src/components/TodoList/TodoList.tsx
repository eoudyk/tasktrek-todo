import { useState, FormEvent } from "react";
import "../TodoList/TodoList.css";
// import EditIcon from "../../assets/icons8-edit.svg";
import DeleteIcon from "../../assets/icons8-delete.svg";

interface Task {
  title: string;
  description: string;
  duedate: string;
  category: string;
  time: number | undefined;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duedate, setDueDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [time, setTime] = useState<number | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Create a new task object
    const newTask: Task = {
      title,
      description,
      duedate,
      category,
      time,
      completed: false, // Initially set as not completed
    };

    // Add the new task to the tasks array
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Clear the form fields
    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("");
    setTime(undefined);
  };

  // Function to handle task completion
  const handleComplete = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //  Fuction to handle task deletion, underscore as convention to indicate variable is intentionally not being used
  const handleDelete = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="add-task__container">
        <form id="add-task-form" onSubmit={handleSubmit}>
          <div className="add-task__heading">Add a task </div>
          {/* category */}
          <div className="add-task__category">
            <label className="add-task__category-label" htmlFor="cate">
              Pick a category:
            </label>
            <select
              id="cate"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=""></option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="school">School</option>
              <option value="errands">Errands</option>
            </select>
          </div>
          {/* task title */}
          <div className="add-task__title">
            <label className="add-task__title-label">Title</label>
            <input
              className="add-task__title-input"
              name="title"
              placeholder="Add a title to your task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* description */}
          <div className="add-task__description">
            <label className="add-task__description-label">Description</label>
            <input
              className="add-task__description-input"
              name="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* due date */}
          <div className="add-task__duedate">
            <label className="add-task__duedate-label">Due date</label>
            <input
              type="date"
              id="duedate"
              className="add-task__duedate-input"
              name="duedate"
              placeholder="Pick a due date"
              value={duedate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="add-task__time">
            <label className="add-task__time-label">
              Estimated completion time
            </label>
            <input
              className="add-task__time-input"
              name="time"
              placeholder="Number of minutes"
              value={time || ""}
              onChange={(e) => setTime(parseInt(e.target.value) || undefined)}
            ></input>
          </div>
          <button type="submit">Add task</button>
        </form>
      </div>
      {/* Display the tasks below the form */}
      <div className="tasks-list">
        <h2 className="tasks-list__title">Task List</h2>
        <ul className="task-item">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "completed" : ""}
              onClick={() => handleComplete(index)}
            >
              <label>
                <input type="checkbox" />
                <span>
                  Category: {task.category} Title: {task.title}, Description:{" "}
                  {task.description}, Due Date: {task.duedate}, Time:{" "}
                  {task.time}
                </span>
                {/* <button>
                  <img
                    className="edit__icon"
                    src={EditIcon}
                    alt="edit button"
                  />
                </button> */}
                <button onClick={() => handleDelete(index)}>
                  <img
                    className="delete__icon"
                    src={DeleteIcon}
                    alt="delete button"
                  />
                </button>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
