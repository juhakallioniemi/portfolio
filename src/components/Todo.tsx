import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import axios from "axios";
import { timingSafeEqual } from "crypto";

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
    activeIndex: number;
}

export class Todo extends React.Component<TodoProps, TodoState> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: [],
            tasks: [],
            newTitle: "",
            newTask: "",
            activeIndex: null
        };
    }

    async getTodos() {
        try {
            const response = await axios.get("/todo");
            let todos: Todos[] = [...this.state.todos];

            if (response.data.length > 0) {
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

            if (response.data.length > 0) {
                for (let i in response.data) {
                    tasks.push(response.data[i]);
                }

                this.setState({
                    tasks: tasks
                });
            }
        });
    }

    componentDidMount() {
        this.getTodos();
    }

    async addTodo(title: string) {
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteButton(id: number): JSX.Element {
        return (
            <button
                type="button"
                className="close delete"
                title="Delete todo!"
                onClick={() => this.deleteTodo(id)}
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
                    todos: todos
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    editTodo(e: any, todoIndex: any) {
        let activeElementType: string = document.activeElement.getAttribute(
            "type"
        );

        for (let i = 0; i < this.state.todos.length; i++) {
            let el = document.getElementsByClassName("new-task")[
                i
            ] as HTMLElement;

            if (activeElementType !== "text") {
                if (i === todoIndex) {
                    this.setState({
                        activeIndex: todoIndex
                    });
                } else {
                    this.setState({
                        newTask: ""
                    });
                }
            }
        }
        let el = document.getElementsByClassName("new-task")[
            todoIndex
        ] as HTMLElement;
        return <input type="text"></input>;
    }

    addTask(e: any) {}

    todosRender(todos: Todos[], tasks: Tasks[]): JSX.Element {
        return (
            <div className="todos">
                {todos.map(({ id, title }, todoIndex) => (
                    <div
                        className="todo"
                        key={todoIndex}
                        title="Click ... to add a new task!"
                    >
                        <h5 className="todo-title">{title}</h5>
                        {this.deleteButton(id)}
                        <ul className="todo-tasks">
                            {tasks.map(({ task, todo_id }, taskIndex) =>
                                todo_id === id ? (
                                    <li className="task" key={taskIndex}>
                                        {task}
                                    </li>
                                ) : null
                            )}
                            <li>
                                {this.state.activeIndex === todoIndex ? (
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
                                            onClick={(e: any) =>
                                                this.addTask(e)
                                            }
                                        >
                                            Add
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="link-look-alike new-task"
                                        style={{ float: "left" }}
                                        onClick={(e: any) =>
                                            this.editTodo(e, todoIndex)
                                        }
                                    >
                                        ...
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.todosRender(this.state.todos, this.state.tasks)}

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
            </React.Fragment>
        );
    }
}
