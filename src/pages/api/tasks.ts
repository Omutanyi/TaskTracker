import { Task } from '@/types/task';
import type { NextApiRequest, NextApiResponse } from 'next';

let tasks: Task[] = [
      {
          id: 1,
          title: "Create project plan",
          description: "Outline the major milestones. Define the scope and objectives. Assign resources and set deadlines.",
          status: "Pending",
          dueDate: new Date("2024-09-15"),
      },
      {
          id: 2,
          title: "Develop user interface",
          description: "Design the initial wireframes. Develop the user interface with responsive design. Ensure cross-browser compatibility.",
          status: "In Progress",
          dueDate: new Date("2024-09-30"),
      },
      {
          id: 3,
          title: "Conduct market research",
          description: "Identify the target audience. Analyze competitor strategies. Gather data on industry trends and customer preferences.",
          status: "Completed",
          dueDate: new Date("2024-08-01"),
      },
      {
          id: 4,
          title: "Set up project repository",
          description: "Create a GitHub repository. Establish branch protection rules. Set up continuous integration and deployment.",
          status: "On Hold",
          dueDate: new Date("2024-09-10"),
      },
      {
          id: 7,
          title: "Deploy to staging",
          description: "Deploy the application to the staging environment. Perform final checks before release. Verify all environment variables.",
          status: "Pending",
          dueDate: new Date("2024-09-18"),
      },
      {
          id: 8,
          title: "Prepare marketing materials",
          description: "Create promotional content for the product launch. Design graphics and social media banners. Write a press release.",
          status: "Completed",
          dueDate: new Date("2024-08-15"),
      },
      {
          id: 9,
          title: "Conduct code review",
          description: "Review the codebase for best practices. Identify potential performance improvements. Ensure adherence to coding standards.",
          status: "On Hold",
          dueDate: new Date("2024-09-22"),
      },
      {
          id: 10,
          title: "Implement authentication",
          description: "Add user authentication using OAuth2. Ensure secure password storage. Implement token-based access control.",
          status: "In Progress",
          dueDate: new Date("2024-09-28"),
      },
      {
          id: 11,
          title: "Finalize documentation",
          description: "Update the project documentation with recent changes. Ensure all APIs are well-documented. Include installation and setup guides.",
          status: "Pending",
          dueDate: new Date("2024-09-17"),
      },
      {
          id: 12,
          title: "Conduct user testing",
          description: "Recruit users for testing the application. Gather feedback on usability and functionality. Report issues and suggested improvements.",
          status: "Completed",
          dueDate: new Date("2024-08-10"),
      },
      {
          id: 13,
          title: "Optimize database queries",
          description: "Analyze query performance. Optimize slow database queries. Implement indexing and caching where necessary.",
          status: "In Progress",
          dueDate: new Date("2024-09-20"),
      },
  ];

let idCounter = 20;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | Task>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(tasks);
      break;
    case 'POST':
      const task: Task = req.body;
      task.id = ++idCounter;
      tasks.push(task);
      res.status(201).json(task);
      break;
    case 'PUT':
      const updatedTask: Task = req.body;
      tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      res.status(200).json(updatedTask);
      break;
    case 'DELETE':
      const id: Number = req.body;
      const taskId = parseInt(id.toString());
      console.log(taskId)
      tasks = tasks.filter((task) => task.id !== taskId);
      res.status(204).json(tasks);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}