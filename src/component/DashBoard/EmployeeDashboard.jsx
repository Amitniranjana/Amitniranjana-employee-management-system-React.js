import React, { useState } from "react";

export default function EmployeeDashboard({ data: initialData }) {
    // Initialize state with the passed data
    const [data, setData] = useState(initialData);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser"); // Clear the logged-in user's data
        window.location.reload(); // Automatically reload the page
    };

    const markTaskAsCompleted = (taskIndex) => {
        setData((prevData) => {
            const updatedTasks = [...prevData.tasks];
            updatedTasks[taskIndex].completed = true;

            return {
                ...prevData,
                taskCounts: {
                    ...prevData.taskCounts,
                    completed: prevData.taskCounts.completed + 1,
                },
                tasks: updatedTasks,
            };
        });
    };

    const markTaskAsFailed = (taskIndex) => {
        setData((prevData) => {
            const updatedTasks = [...prevData.tasks];
            updatedTasks[taskIndex].failed = true;

            return {
                ...prevData,
                taskCounts: {
                    ...prevData.taskCounts,
                    failed: prevData.taskCounts.failed + 1,
                },
                tasks: updatedTasks,
            };
        });
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f0f2f5",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "90%",
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "2rem",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#007bff",
                        marginBottom: "1.5rem",
                    }}
                >
                    Employee Dashboard
                </h1>

                <div
                    style={{
                        backgroundColor: "#e9ecef",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        marginBottom: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#333" }}>
                        Hello, {data?.firstName || "user"}
                    </h2>
                    <button
                        style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                        }}
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#ffc107",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2rem", margin: 0, color: "#333" }}>
                            {data.taskCounts.newTask}
                        </h1>
                        <p style={{ fontWeight: "bold", margin: 0 }}>
                            <b>New Task</b>
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundColor: "#28a745",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2rem", margin: 0, color: "#fff" }}>
                            {data.taskCounts.completed}
                        </h1>
                        <p style={{ fontWeight: "bold", margin: 0, color: "#fff" }}>
                            <b>Completed</b>
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundColor: "#fd7e14",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2rem", margin: 0, color: "#fff" }}>
                            {data.taskCounts.active}
                        </h1>
                        <p style={{ fontWeight: "bold", margin: 0, color: "#fff" }}>
                            <b>Active</b>
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundColor: "#e83e8c",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2rem", margin: 0, color: "#fff" }}>
                            {data.taskCounts.failed}
                        </h1>
                        <p style={{ fontWeight: "bold", margin: 0, color: "#fff" }}>
                            Failed
                        </p>
                    </div>
                </div>

                {data.tasks.map((task, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: task.completed
                                ? "#d4edda"
                                : task.failed
                                ? "#f8d7da"
                                : "#cce5ff",
                            borderRadius: "8px",
                            padding: "1rem",
                            border: task.completed
                                ? "1px solid #c3e6cb"
                                : task.failed
                                ? "1px solid #f5c6cb"
                                : "1px solid #b8daff",
                            color: task.completed
                                ? "#155724"
                                : task.failed
                                ? "#721c24"
                                : "#004085",
                            textAlign: "left",
                            marginBottom: "1rem",
                        }}
                    >
                        <b>Task</b>
                        <div style={{ display: "flex", gap: "4rem" }}>
                            <p>
                                <b>Task Title:</b> {task.taskTitle}
                            </p>
                            <p>
                                <b>Task Date:</b> {task.taskDate}
                            </p>
                        </div>
                        <b>Task Description:</b> {task.taskDescription}
                        <br />
                        <div style={{ display: "flex", gap: "2rem" }}>
                            {!task.completed && !task.failed && (
                                <>
                                    <button
                                        style={{
                                            backgroundColor: "green",
                                            borderRadius: "5px",
                                            padding: "0.5rem",
                                            fontWeight: "500",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => markTaskAsCompleted(index)}
                                    >
                                        Mark Completed
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: "red",
                                            borderRadius: "5px",
                                            padding: "0.5rem",
                                            fontWeight: "500",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => markTaskAsFailed(index)}
                                    >
                                        Mark Failed
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
