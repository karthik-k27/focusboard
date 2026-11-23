import { useState, useMemo } from 'react';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { SAMPLE_TASKS } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const STORAGE_KEY = 'focusboard_tasks';

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, SAMPLE_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      todo,
      inProgress,
      completed,
      completionRate,
    };
  }, [tasks]);

  const statusCounts = useMemo(
    () => ({
      All: stats.total,
      'To do': stats.todo,
      'In progress': stats.inProgress,
      Completed: stats.completed,
    }),
    [stats]
  );

  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesTitle =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        selectedStatus === 'All' || task.status === selectedStatus;
      const matchesPriority =
        selectedPriority === 'All' || task.priority === selectedPriority;

      return matchesTitle && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedStatus !== 'All' ||
    selectedPriority !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedPriority('All');
  };

  const handleOpenCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id !== undefined) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskData.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      const nextId =
        tasks.length > 0
          ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1
          : Date.now();
      const newTask = {
        ...taskData,
        id: nextId,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
    handleCloseForm();
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeletingTask(null);
  };

  const handleSelectNav = (item) => {
    setActiveNav(item.id);
    if (item.filterStatus) {
      setSelectedStatus(item.filterStatus);
      document.getElementById('tasks-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (item.sectionId) {
      if (item.id === 'overview') {
        setSelectedStatus('All');
      }
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        taskCount={stats.total}
      />

      <div className="app-main-wrapper">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCreateForm={handleOpenCreateForm}
          completedCount={stats.completed}
          totalCount={stats.total}
        />

        <main id="main-content" className="main-content">
          <section
            id="stats-section"
            className="stats-grid"
            aria-label="Task overview statistics"
          >
            <StatCard
              title="Total Tasks"
              value={stats.total}
              subtitle={`${stats.todo} waiting in To do`}
              icon={ListTodo}
              tone="indigo"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              subtitle="Currently active items"
              icon={Clock}
              tone="amber"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              subtitle="Finished tasks"
              icon={CheckCircle2}
              tone="emerald"
            />
            <StatCard
              title="Completion Rate"
              value={`${stats.completionRate}%`}
              subtitle={
                stats.total === 0
                  ? 'Add a task to track progress'
                  : `${stats.completed} of ${stats.total} done`
              }
              icon={TrendingUp}
              tone="violet"
            />
          </section>

          <FocusNotes
            activeSlide={activeSlide}
            onChangeSlide={setActiveSlide}
          />

          <section id="tasks-section" className="tasks-panel" aria-labelledby="tasks-heading">
            <div className="tasks-panel__header">
              <div>
                <h2 id="tasks-heading" className="tasks-panel__title">
                  Task Board
                </h2>
                <p className="tasks-panel__subtitle">
                  Showing {filteredTasks.length} of {stats.total}{' '}
                  {stats.total === 1 ? 'task' : 'tasks'}
                </p>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <FilterTabs
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              selectedPriority={selectedPriority}
              onSelectPriority={setSelectedPriority}
              statusCounts={statusCounts}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
            />

            <TaskList
              tasks={filteredTasks}
              totalTaskCount={stats.total}
              hasActiveFilters={hasActiveFilters}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEditForm}
              onDelete={setDeletingTask}
              onResetFilters={handleResetFilters}
              onOpenCreateForm={handleOpenCreateForm}
            />
          </section>
        </main>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        editingTask={editingTask}
        onSubmit={handleSaveTask}
        onCancel={handleCloseForm}
      />

      <DeleteConfirmModal
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
