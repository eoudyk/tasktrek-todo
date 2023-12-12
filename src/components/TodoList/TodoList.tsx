import { useState, FormEvent } from "react";
import "../TodoList/TodoList.css";
import EditIcon from "../../assets/icons8-edit.svg";
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
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

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

  //   Editing
  const openEditModal = (index: number) => {
    setEditingTaskIndex(index);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditingTaskIndex(null);
  };

  const handleEditSubmit = (editedTask: Task) => {
    if (editingTaskIndex !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === editingTaskIndex ? { ...editedTask } : task
        )
      );
      closeEditModal();
    }
  };
  return (
    <main className="main">
      <div className="add-task__container">
        <form id="add-task-form" onSubmit={handleSubmit}>
          <h2 className="add-task__heading">Add a task </h2>
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
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
              <option value="Errands">Errands</option>
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
          <button className="submit__button" type="submit">
            Add task
          </button>
        </form>
      </div>
      {/* Display the tasks below the form */}
      <div className="tasks-list">
        <h2 className="tasks-list__title">Task List</h2>
        <ul className="task-item">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onClick={() => handleComplete(index)}
                />
                <span>
                  Category: {task.category}
                  <br />
                  Title: {task.title}
                  <br /> Description: {task.description} <br />
                  Due Date: {task.duedate}
                  <br /> Time: {task.time} minutes.
                  <br />
                </span>
                <button
                  className="modify__button"
                  onClick={() => openEditModal(index)}
                >
                  <img
                    className="edit__icon"
                    src={EditIcon}
                    alt="edit button"
                  />
                </button>
                <button
                  className="modify__button"
                  onClick={() => handleDelete(index)}
                >
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
      {/* Editing: */}
      {isEditModalVisible && editingTaskIndex !== null && (
        <div className="edit-modal">
          <h2>Edit Task</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* category */}
            <div className="edit-task__category">
              <label className="edit-task__category-label" htmlFor="edit-cate">
                Pick a category:
              </label>
              <select
                id="edit-cate"
                name="edit-category"
                value={tasks[editingTaskIndex]?.category || ""}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task, i) =>
                      i === editingTaskIndex
                        ? { ...task, category: e.target.value }
                        : task
                    )
                  )
                }
              >
                <option value=""></option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="School">School</option>
                <option value="Errands">Errands</option>
              </select>
            </div>
            {/* task title */}
            <div className="edit-task__title">
              <label className="edit-task__title-label">Title</label>
              <input
                className="edit-task__title-input"
                name="title"
                placeholder="Edit the title of your task"
                value={tasks[editingTaskIndex]?.title || ""}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task, i) =>
                      i === editingTaskIndex
                        ? { ...task, title: e.target.value }
                        : task
                    )
                  )
                }
              />
            </div>
            {/* description */}
            <div className="edit-task__description">
              <label className="edit-task__description-label">
                Description
              </label>
              <input
                className="edit-task__description-input"
                name="description"
                placeholder="Edit the description"
                value={tasks[editingTaskIndex]?.description || ""}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task, i) =>
                      i === editingTaskIndex
                        ? { ...task, description: e.target.value }
                        : task
                    )
                  )
                }
              />
            </div>
            {/* due date */}
            <div className="edit-task__duedate">
              <label className="edit-task__duedate-label">Due date</label>
              <input
                type="date"
                id="edit-duedate"
                className="edit-task__duedate-input"
                name="duedate"
                value={tasks[editingTaskIndex]?.duedate || ""}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task, i) =>
                      i === editingTaskIndex
                        ? { ...task, duedate: e.target.value }
                        : task
                    )
                  )
                }
              />
            </div>
            {/* completion time */}
            <div className="edit-task__time">
              <label className="edit-task__time-label">
                Estimated completion time
              </label>
              <input
                className="edit-task__time-input"
                name="time"
                placeholder="Number of minutes"
                value={tasks[editingTaskIndex]?.time || ""}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task, i) =>
                      i === editingTaskIndex
                        ? {
                            ...task,
                            time: parseInt(e.target.value) || undefined,
                          }
                        : task
                    )
                  )
                }
              ></input>
            </div>
            <button
              className="submit__button"
              type="submit"
              onClick={() => handleEditSubmit(tasks[editingTaskIndex])}
            >
              Save Changes
            </button>

            <button className="submit__button" onClick={closeEditModal}>
              Close
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default TodoList;
