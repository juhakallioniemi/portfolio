import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import axios from "axios";

interface TodoProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

interface TodoState {
    todos: Todos[];
    tasks: Tasks[];
    newTitle: string;
    newTask: string;
    editingIndex: number;
    isSaveVisible: boolean;
    isAdmin: boolean;
}

export class Todo extends React.Component<TodoProps, TodoState> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: null,
            tasks: [],
            newTitle: "",
            newTask: "",
            editingIndex: null,
            isSaveVisible: false,
            isAdmin: false
        };
    }

    componentDidMount() {
        let loginInfo: LoginInfo = JSON.parse(
            localStorage.getItem("loginInfo")
        );
        if (loginInfo && loginInfo.username === "admin") {
            this.setState({
                isAdmin: true
            });
        }

        this.getTodos();
    }

    async getTodos() {
        try {
            const response = await axios.get("/todo");
            let todos: Todos[] = [];

            if (response.data) {
                for (let i in response.data) {
                    todos.push(response.data[i]);
                }

                this.setState({
                    todos: todos
                });
            }
            this.getTasksFromTodos();
        } catch (error) {
            console.log(error);
        }
    }

    getTasksFromTodos() {
        this.state.todos.forEach(async todo => {
            const response = await axios.get(
                `${"/todo/" + todo.id + "/tasks"}`
            );

            let tasks: Tasks[] = [...this.state.tasks];

            if (response.data) {
                for (let i in response.data) {
                    tasks.push(response.data[i]);
                }

                this.setState({
                    tasks: tasks
                });
            }
        });
    }

    async addTodo(title: string) {
        if (title === "") title = "...";

        try {
            const response = await axios.post("/todo", {
                title: title
            });
            let { data } = response;

            let newTodo: Todos = {
                id: data.insertId,
                title: title
            };

            let todos: Todos[] = [...this.state.todos];

            if (data.affectedRows === 1) {
                todos.push(newTodo);

                this.setState({
                    todos: todos
                });

                this.addTodoTask(newTodo.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    editTodo(todoIndex: number) {
        if (todoIndex !== this.state.editingIndex) {
            this.setState({
                editingIndex: todoIndex
            });
        } else {
            this.setState({
                editingIndex: null
            });
        }
    }

    deleteButton(id: number, type: string): JSX.Element {
        return (
            <button
                type="button"
                className="close delete"
                title="Delete todo!"
                onClick={() =>
                    type === "todo" ? this.deleteTodo(id) : this.deleteTask(id)
                }
            >
                <span>&times;</span>
            </button>
        );
    }

    async deleteTodo(id: number) {
        try {
            const response = await axios.delete("/todo", {
                params: {
                    id: id
                }
            });

            let { data } = response;

            let todos: Todos[] = [...this.state.todos];

            if (data.affectedRows >= 1) {
                var index = todos
                    .map(t => {
                        return t.id;
                    })
                    .indexOf(id);
                todos.splice(index, 1);

                this.setState({
                    todos: todos,
                    editingIndex: null
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id: number) {
        try {
            const response = await axios.delete("/todo/tasks", {
                params: {
                    id: id
                }
            });

            let { data } = response;

            let tasks: Tasks[] = [...this.state.tasks];

            if (data.affectedRows >= 1) {
                var index = tasks
                    .map(t => {
                        return t.id;
                    })
                    .indexOf(id);
                tasks.splice(index, 1);

                this.setState({
                    tasks: tasks
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addTodoTask(todo_id: number) {
        let initializedTask: string = "...";

        try {
            const response = await axios.post(
                `${"/todo/" + todo_id + "/tasks"}`,
                {
                    task: this.state.newTask || initializedTask,
                    todo_id: todo_id
                }
            );

            let { data } = response;

            let tasks: Tasks[] = [...this.state.tasks];

            let newTask: Tasks = {
                id: data.insertId,
                task: this.state.newTask || initializedTask,
                todo_id: todo_id
            };

            if (data.affectedRows === 1) {
                tasks.push(newTask);

                this.setState({
                    tasks: tasks,
                    newTask: ""
                });
            }
        } catch (error) {
            console.log(error);
        }

        return true;
    }

    handleTodoTitleChange(value: any, todoIndex: number) {
        let todos: Todos[] = [...this.state.todos];
        todos[todoIndex].title = value;
        todos[todoIndex].hasUnsavedChanges = true;
        this.setState({
            todos: todos,
            isSaveVisible: true
        });
    }

    handleTodoTaskChange(value: any, taskIndex: number) {
        let tasks: Tasks[] = [...this.state.tasks];
        tasks[taskIndex].task = value;
        tasks[taskIndex].hasUnsavedChanges = true;
        this.setState({
            tasks: tasks,
            isSaveVisible: true
        });
    }

    async saveUnsavedChanges() {
        let unsavedTodos: Todos[] = this.state.todos.filter(
            t => t.hasUnsavedChanges
        );
        let unsavedTasks: Tasks[] = this.state.tasks.filter(
            t => t.hasUnsavedChanges
        );

        try {
            unsavedTodos.forEach(async todo => {
                const response = await axios.put(`${"/todo/" + todo.id}`, {
                    params: {
                        id: todo.id
                    },
                    title: todo.title
                });
            });

            unsavedTasks.forEach(async task => {
                const response = await axios.put(
                    `${"/todo/" + task.todo_id + "/tasks/" + task.id}`,
                    {
                        params: {
                            id: task.id,
                            todo_id: task.todo_id
                        },
                        task: task.task
                    }
                );
            });
        } catch (error) {
            console.log(error);
        }

        this.setState({
            editingIndex: null,
            isSaveVisible: false
        });
    }

    resetTodoList() {
        window.location.reload(false);
    }

    tasksRender(
        task: string,
        todo_id: number,
        id: number,
        taskIndex: number,
        todoIndex: number,
        task_id: number
    ): JSX.Element {
        if (todo_id === id) {
            let elementValue: any = null;
            if (this.state.editingIndex === todoIndex) {
                elementValue = (
                    <React.Fragment>
                        <input
                            type="text"
                            value={this.state.tasks[taskIndex].task}
                            onChange={(e: any) =>
                                this.handleTodoTaskChange(
                                    e.target.value,
                                    taskIndex
                                )
                            }
                            className="task-edit"
                        ></input>
                        {this.deleteButton(task_id, "task")}
                    </React.Fragment>
                );
            } else {
                elementValue = task;
            }
            return (
                <li className="task" key={taskIndex}>
                    {elementValue}
                </li>
            );
        } else {
            return null;
        }
    }

    todosRender(todos: Todos[], tasks: Tasks[]): JSX.Element {
        return (
            <div className="todos">
                {todos.map(({ id, title }, todoIndex) => (
                    <div className="todo" key={todoIndex}>
                        <div className="wrapper">
                            {todoIndex === this.state.editingIndex ? (
                                <input
                                    type="text"
                                    value={this.state.todos[todoIndex].title}
                                    onChange={(e: any) =>
                                        this.handleTodoTitleChange(
                                            e.target.value,
                                            todoIndex
                                        )
                                    }
                                    className="todo-edit"
                                ></input>
                            ) : (
                                <h5 className="todo-title">{title}</h5>
                            )}
                            {this.state.isAdmin ? (
                                <React.Fragment>
                                    <button
                                        className="todo-edit-button link-look-alike"
                                        onClick={(e: any) =>
                                            this.editTodo(todoIndex)
                                        }
                                    >
                                        {todoIndex === this.state.editingIndex
                                            ? "close"
                                            : "edit"}
                                    </button>
                                    {this.state.editingIndex === todoIndex
                                        ? this.deleteButton(id, "todo")
                                        : null}
                                </React.Fragment>
                            ) : null}
                        </div>
                        <ul className="todo-tasks">
                            {tasks.map(
                                ({ id: task_id, task, todo_id }, taskIndex) =>
                                    this.tasksRender(
                                        task,
                                        todo_id,
                                        id,
                                        taskIndex,
                                        todoIndex,
                                        task_id
                                    )
                            )}
                            {this.state.editingIndex === todoIndex ? (
                                <li>
                                    <div className="new-task">
                                        <input
                                            type="text"
                                            value={this.state.newTask}
                                            onChange={(e: any) =>
                                                this.setState({
                                                    newTask: e.target.value
                                                })
                                            }
                                        ></input>
                                        <button
                                            className="add-task-button"
                                            onClick={() => this.addTodoTask(id)}
                                        >
                                            Add task
                                        </button>
                                    </div>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                ))}
                {this.state.isAdmin && !this.state.editingIndex ? (
                    <div className="add-todo">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Todo title"
                            value={this.state.newTitle}
                            onChange={(e: any) =>
                                this.setState({
                                    newTitle: e.target.value
                                })
                            }
                        ></input>
                        <button
                            type="button"
                            className="button"
                            onClick={() => this.addTodo(this.state.newTitle)}
                        >
                            Add todo
                        </button>
                    </div>
                ) : null}

                {this.state.isSaveVisible ? (
                    <div className="save-changes">
                        <button
                            type="button"
                            className="button"
                            onClick={() => this.saveUnsavedChanges()}
                        >
                            Save changes
                        </button>
                        <button
                            type="button"
                            className="reset"
                            onClick={() => this.resetTodoList()}
                        >
                            Reset
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }

    render() {
        if (!this.state.todos) {
            return <div>Loading...</div>;
        } else if (!this.state.todos.length && !this.state.isAdmin) {
            return (
                <div className="no-content">
                    {this.props.t("main.noContent")}
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    {this.todosRender(this.state.todos, this.state.tasks)}
                </React.Fragment>
            );
        }
    }
}
