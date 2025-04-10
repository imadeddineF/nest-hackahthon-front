import { type Task } from "../types/schema";
import type { GetTasksSchema } from "./validations";

// Mock database - this would typically be stored in a client-side state management solution
let mockTasks: Task[] = [
    {
        id: "task-1",
        code: "One",
        title: "Implement authentication flow",
        description:
            "Create login, registration, and password reset functionality",
        status: "in-progress",
        priority: "high",
        estimatedHours: 8,
        assignee: "John Doe",
        createdAt: new Date("2025-03-15T10:30:00Z"),
        updatedAt: new Date("2025-03-27T14:15:00Z"),
    },
    {
        id: "task-2",
        code: "Two",
        title: "Design dashboard UI",
        description: "Create wireframes and mockups for the main dashboard",
        status: "todo",
        priority: "medium",
        estimatedHours: 5,
        assignee: "Jane Smith",
        createdAt: new Date("2025-03-20T09:45:00Z"),
        updatedAt: new Date("2025-03-20T09:45:00Z"),
    },
    {
        id: "task-3",
        code: "Three",
        title: "Fix pagination bug",
        description:
            "Resolve the issue where pagination doesn't work correctly when filtering tasks",
        status: "done",
        priority: "low",
        estimatedHours: 2,
        assignee: "John Doe",
        createdAt: new Date("2025-03-10T13:20:00Z"),
        updatedAt: new Date("2025-03-25T16:30:00Z"),
    },
];

// Utility function to filter tasks based on conditions
const filterTasks = (tasks: Task[], where: (task: Task) => boolean): Task[] => {
    return tasks.filter(where);
};

// Utility function to sort tasks
const sortTasks = (
    tasks: Task[],
    orderBy: { id: keyof Task; desc: boolean }[]
): Task[] => {
    return [...tasks].sort((a, b) => {
        for (const { id, desc } of orderBy) {
            if (a[id] < b[id]) return desc ? 1 : -1;
            if (a[id] > b[id]) return desc ? -1 : 1;
        }
        return 0;
    });
};

// Simulate server-side filtering logic
const clientFilterColumns = (
    tasks: Task[],
    filters: GetTasksSchema["filters"],
    joinOperator: "and" | "or"
): Task[] => {
    if (filters.length === 0) return tasks;

    return tasks.filter((task) => {
        const results = filters.map((filter) => {
            const { operator, value } = filter;
            const taskValue = task[value as keyof Task];

            switch (operator) {
                case "contains":
                    return String(taskValue)
                        .toLowerCase()
                        .includes(String(value).toLowerCase());
                case "eq":
                    return taskValue === value;
                case "gt":
                    return (
                        typeof taskValue === "number" &&
                        taskValue > Number(value)
                    );
                case "gte":
                    return (
                        typeof taskValue === "number" &&
                        taskValue >= Number(value)
                    );
                case "lt":
                    return (
                        typeof taskValue === "number" &&
                        taskValue < Number(value)
                    );
                case "lte":
                    return (
                        typeof taskValue === "number" &&
                        taskValue <= Number(value)
                    );
                case "startsWith":
                    return (
                        typeof taskValue === "string" &&
                        taskValue.startsWith(String(value))
                    );
                case "endsWith":
                    return (
                        typeof taskValue === "string" &&
                        taskValue.endsWith(String(value))
                    );
                default:
                    return false;
            }
        });

        return joinOperator === "and"
            ? results.every(Boolean)
            : results.some(Boolean);
    });
};

// Simulate getTasks function
export async function getTasks(input: GetTasksSchema) {
    try {
        const offset = (input.page - 1) * input.perPage;
        const advancedTable =
            input.filterFlag === "advancedFilters" ||
            input.filterFlag === "commandFilters";

        // Apply filters
        const filteredTasks = advancedTable
            ? clientFilterColumns(mockTasks, input.filters, input.joinOperator)
            : filterTasks(mockTasks, (task) => {
                  // Basic filters
                  const titleMatch = input.title
                      ? task.title
                            ?.toLowerCase()
                            .includes(input.title.toLowerCase()) ?? false
                      : true;

                  const statusMatch =
                      input.status.length > 0
                          ? input.status.includes(task.status)
                          : true;

                  const priorityMatch =
                      input.priority.length > 0
                          ? input.priority.includes(task.priority)
                          : true;

                  const estimatedHoursMatch =
                      input.estimatedHours.length > 0
                          ? (!input.estimatedHours[0] ||
                                task.estimatedHours >=
                                    input.estimatedHours[0]) &&
                            (!input.estimatedHours[1] ||
                                task.estimatedHours <= input.estimatedHours[1])
                          : true;

                  const createdAtMatch =
                      input.createdAt.length > 0
                          ? (!input.createdAt[0] ||
                                new Date(task.createdAt) >=
                                    new Date(input.createdAt[0])) &&
                            (!input.createdAt[1] ||
                                new Date(task.createdAt) <=
                                    new Date(input.createdAt[1]))
                          : true;

                  return (
                      titleMatch &&
                      statusMatch &&
                      priorityMatch &&
                      estimatedHoursMatch &&
                      createdAtMatch
                  );
              });

        // Apply sorting
        const orderBy =
            input.sort.length > 0
                ? input.sort
                : [{ id: "createdAt" as keyof Task, desc: true }];

        const sortedTasks = sortTasks(filteredTasks, orderBy);

        // Apply pagination
        const paginatedTasks = sortedTasks.slice(
            offset,
            offset + input.perPage
        );
        const total = filteredTasks.length;
        const pageCount = Math.ceil(total / input.perPage);

        return {
            data: paginatedTasks,
            pageCount,
        };
    } catch (error) {
        console.error("Error in getTasks:", error);
        return { data: [], pageCount: 0 };
    }
}

// Simulate getTaskStatusCounts function
export async function getTaskStatusCounts() {
    try {
        const counts = {
            todo: 0,
            "in-progress": 0,
            done: 0,
            canceled: 0,
        };

        mockTasks.forEach((task) => {
            if (task.status in counts) {
                counts[task.status as keyof typeof counts]++;
            }
        });

        return counts;
    } catch (error) {
        console.error("Error in getTaskStatusCounts:", error);
        return {
            todo: 0,
            "in-progress": 0,
            done: 0,
            canceled: 0,
        };
    }
}

// Simulate getTaskPriorityCounts function
export async function getTaskPriorityCounts() {
    try {
        const counts = {
            low: 0,
            medium: 0,
            high: 0,
        };

        mockTasks.forEach((task) => {
            if (task.priority in counts) {
                counts[task.priority as keyof typeof counts]++;
            }
        });

        return counts;
    } catch (error) {
        console.error("Error in getTaskPriorityCounts:", error);
        return {
            low: 0,
            medium: 0,
            high: 0,
        };
    }
}

// Simulate getEstimatedHoursRange function
export async function getEstimatedHoursRange() {
    try {
        if (mockTasks.length === 0) return { min: 0, max: 0 };

        let min = Infinity;
        let max = -Infinity;

        mockTasks.forEach((task) => {
            min = Math.min(min, task.estimatedHours);
            max = Math.max(max, task.estimatedHours);
        });

        return { min, max };
    } catch (error) {
        console.error("Error in getEstimatedHoursRange:", error);
        return { min: 0, max: 0 };
    }
}

// Functions to manage the mock database
export function setMockTasks(tasks: Task[]) {
    mockTasks = tasks;
}

export function addMockTask(task: Task) {
    mockTasks.push(task);
}

export function updateMockTask(id: string, updates: Partial<Task>) {
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        mockTasks[index] = { ...mockTasks[index], ...updates };
    }
}

export function deleteMockTask(id: string) {
    mockTasks = mockTasks.filter((task) => task.id !== id);
}
