import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AdminDashboard = ({ data }) => {
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    };

    const authData = useContext(AuthContext);
    let [employeeName, setEmployeeName] = useState("");
    let [category, setCategory] = useState("");
    let [date, setDate] = useState("");
    let [taskTitle, setTaskTitle] = useState("");
    let [taskDescription, setTaskDescription] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        const newTaskDetails = {
            active: false,
            newTask: true,
            completed: false,
            failed: false,
            taskTitle,
            taskDescription,
            date,
            category,
        };

        const employee = authData.employees.find(
            (emp) => emp.firstName === employeeName
        );

        if (employee) {
            const isDuplicate = employee.tasks.some((task) => {
                return (
                    task.taskTitle === newTaskDetails.taskTitle &&
                    task.taskDescription === newTaskDetails.taskDescription &&
                    task.date === newTaskDetails.date &&
                    task.category === newTaskDetails.category
                );
            });

            if (!isDuplicate) {
                employee.tasks.push(newTaskDetails);

                if (!employee.taskCounts) {
                    employee.taskCounts = { active: 0, completed: 0, failed: 0, newTask: 0 };
                }
                employee.taskCounts.newTask = (employee.taskCounts.newTask || 0) + 1;

                console.log("New task added:", newTaskDetails);
            } else {
                console.log("Duplicate task detected. Task not added.");
            }
        } else {
            console.log("Employee not found.");
        }

        setTaskTitle("");
        setTaskDescription("");
        setDate("");
        setCategory("");
        setEmployeeName("");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                    padding: "1rem",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        padding: "2rem",
                        boxSizing: "border-box",
                    }}
                >
                    <h1 style={{ textAlign: "center", color: "#007bff", fontSize: "2rem" }}>
                        Admin Dashboard
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            gap: "2rem",
                            marginBottom: "2rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#e9ecef",
                                borderRadius: "8px",
                                padding: "1.5rem",
                                flex: "1",
                                minWidth: "280px",
                                boxSizing: "border-box",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                <h2 style={{ fontSize: "1.2rem" }}>Hello, {authData.admin[0].firstName}</h2>
                                <button
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "4px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            </div>

                            <form
                                onSubmit={submitHandler}
                                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                            >
                                <div>
                                    <label>Task Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter the task title..."
                                        value={taskTitle}
                                        onChange={(event) => setTaskTitle(event.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Assign To</label>
                                    <input
                                        type="text"
                                        value={employeeName}
                                        onChange={(event) => setEmployeeName(event.target.value)}
                                        placeholder="Enter assignee's name..."
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task category..."
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            backgroundColor: "lightgreen",
                                            width: "100%",
                                            padding: "5px",
                                            margin: "0.6rem 0rem",
                                        }}
                                    >
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            style={{
                                backgroundColor: "#e9ecef",
                                borderRadius: "8px",
                                padding: "1.5rem",
                                flex: "1",
                                minWidth: "280px",
                                maxWidth: "500px",
                                boxSizing: "border-box",
                            }}
                        >
                            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Description</h2>
                            <textarea
                                value={taskDescription}
                                onChange={(event) => setTaskDescription(event.target.value)}
                                placeholder="Enter the task description here..."
                                style={{
                                    width: "100%",
                                    height: "18.4rem",
                                    backgroundColor: "#fff",
                                    padding: "1rem",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    resize: "none",
                                    overflowY: "auto",
                                }}
                            ></textarea>
                        </div>
                    </div>

                    {authData && authData.employees && authData.employees.length > 0 ? (
                        <div
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                                padding: "1rem",
                                border: "1px solid #dee2e6",
                                borderRadius: "8px",
                                backgroundColor: "#f1f3f5",
                                marginBottom: "2rem",
                            }}
                        >
                            {authData.employees.map((employee, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: "#cce5ff",
                                        borderRadius: "8px",
                                        padding: "1rem",
                                        border: "1px solid #b8daff",
                                        color: "#004085",
                                        textAlign: "left",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <b style={{ color: "red" }}>Employee-{index + 1}</b>
                                    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                                        <p>
                                            <b>Name:</b> {employee.firstName || "N/A"}
                                        </p>
                                        <p>
                                            <b>New Tasks:</b> {employee.taskCounts?.newTask || "N/A"}
                                        </p>
                                        <p>
                                            <b>Active Tasks:</b> {employee.taskCounts?.active || "N/A"}
                                        </p>
                                        <p>
                                            <b>Failed:</b> {employee.taskCounts?.failed || "N/A"}
                                        </p>
                                        <p>
                                            <b>Completed:</b> {employee.taskCounts?.completed || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tasks available</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .form-container {
                        display: block;
                    }
                    .task-description-container {
                        margin-top: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
