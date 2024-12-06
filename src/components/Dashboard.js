import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Select,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Stack,
    IconButton,
    Tooltip,
    AppBar,
    Toolbar,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, Add as AddIcon } from "@mui/icons-material";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
    const [sprint, setSprint] = useState("Current Sprint");
    const [epics, setEpics] = useState([
        {
            name: "Epic 1",
            stories: [
                {
                    name: "Story 1",
                    tasks: ["Task 1.1", "Task 1.2"],
                },
            ],
        },
    ]);

    const projectName = "Red Health";
    const availableBandwidth = 120;
    const allocatedBandwidth = 100;

    // Data for bandwidth pie chart
    const pieData = {
        labels: ["Available Bandwidth", "Allocated Bandwidth"],
        datasets: [
            {
                data: [availableBandwidth, allocatedBandwidth],
                backgroundColor: ["#4caf50", "#f44336"],
            },
        ],
    };

    // Data for line chart
    const lineData = {
        labels: ["User 1", "User 2", "User 3"],
        datasets: [
            {
                label: "Available Hours",
                data: [40, 50, 30],
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
            },
            {
                label: "Allocated Hours",
                data: [30, 40, 20],
                borderColor: "#f44336",
                backgroundColor: "rgba(244, 67, 54, 0.2)",
            },
        ],
    };

    // Handle adding epic
    const addEpic = () => {
        setEpics([...epics, { name: `Epic ${epics.length + 1}`, stories: [] }]);
    };

    // Handle adding story
    const addStory = (epicIndex) => {
        const newEpics = [...epics];
        newEpics[epicIndex].stories.push({ name: `Story ${newEpics[epicIndex].stories.length + 1}`, tasks: [] });
        setEpics(newEpics);
    };

    // Handle adding task
    const addTask = (epicIndex, storyIndex) => {
        const newEpics = [...epics];
        newEpics[epicIndex].stories[storyIndex].tasks.push(`Task ${newEpics[epicIndex].stories[storyIndex].tasks.length + 1}`);
        setEpics(newEpics);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f4f5f7" }}>
            <AppBar position="static" elevation={4} sx={{ backgroundColor: "#444" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight:'73px !important' }}>
                <Typography sx={{ fontWeight: "bold" }}>
                      Dashboard
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {projectName}
                    </Typography>
                    <Select
                        value={sprint}
                        onChange={(e) => setSprint(e.target.value)}
                        sx={{ backgroundColor: "#444", color: "#fff", borderRadius: 1, minWidth: 150 }}
                    >
                        <MenuItem value="Current Sprint">Sprint 1</MenuItem>
                        <MenuItem value="Future Sprint">Sprint 2</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ padding: 3, display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {/* Pie Chart */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                            Bandwidth Overview
                        </Typography>
                        <Pie data={pieData} />
                    </CardContent>
                </Card>

                {/* Line Chart */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                            Bandwidth Allocation
                        </Typography>
                        <Line data={lineData} />
                    </CardContent>
                </Card>
            </Box>

            {/* Ticket Details */}
            <Box sx={{ padding: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Ticket Details
                    </Typography>
                    <Button startIcon={<AddIcon />} variant="contained" onClick={addEpic}>
                        Add Epic
                    </Button>
                </Stack>
                {epics.map((epic, epicIndex) => (
                    <Accordion key={epicIndex} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: "bold" }}>{epic.name}</Typography>
                            <Tooltip title="Add Story" arrow>
                                <IconButton onClick={() => addStory(epicIndex)} sx={{ marginLeft: 2 }}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </AccordionSummary>
                        <AccordionDetails>
                            {epic.stories.map((story, storyIndex) => (
                                <Accordion key={storyIndex} sx={{ ml: 3 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{story.name}</Typography>
                                        <Tooltip title="Add Task" arrow>
                                            <IconButton onClick={() => addTask(epicIndex, storyIndex)} sx={{ marginLeft: 2 }}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction="column" spacing={1}>
                                            {story.tasks.map((task, taskIndex) => (
                                                <Typography key={taskIndex} variant="body2" sx={{ pl: 3 }}>
                                                    {task}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
