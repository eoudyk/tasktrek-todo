import { useState, FormEvent } from "react";
import "../TodoList/TodoList.css";

const TodoList: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duedate, setDueDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [time, setTime] = useState<number | undefined>();
  //   const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value) || undefined)}
            ></input>
          </div>
          <button type="submit" form="add-task">
            Add task
          </button>
        </form>
      </div>
    </>
  );
};

export default TodoList;
