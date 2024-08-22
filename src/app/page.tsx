"use client";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
    <div>  
      <Header />
      <TaskList />
    </div>
    </ThemeProvider>
  );
}