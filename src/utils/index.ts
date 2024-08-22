import { Task } from "@/types/task";

export const formatDate = (date: Date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

export async function createTask(method: string, params: { title: String; description: String; status: String; dueDate: Date }) {
    try {
      const response = await fetch('/api/tasks', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      if (response.ok) {
        const data = await response.json(); 
        return data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } 

  
export const fetchTasks = async () => {
    try {
        const response = await fetch('/api/tasks');
        const data: Task[] = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching task data ", error)
    }
};

export async function deleteTask(id: Number) {
    try { 
      const response = await fetch(`/api/tasks`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
      });
      if (response.ok) {
        return
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } 