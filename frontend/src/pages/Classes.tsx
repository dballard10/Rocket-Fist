import { useState } from "react";
import WidgetCard from "../components/WidgetCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Select from "../components/ui/Select";
import type { Class } from "../data/mockData";
import { mockClasses, mockCoaches } from "../data/mockData";

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "60",
    skillLevel: "beginner",
    discipline: "",
    defaultCoachId: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      duration: "60",
      skillLevel: "beginner",
      discipline: "",
      defaultCoachId: "",
    });
    setEditingClass(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (classItem: Class) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      description: classItem.description,
      duration: classItem.duration.toString(),
      skillLevel: classItem.skillLevel,
      discipline: classItem.discipline,
      defaultCoachId: classItem.defaultCoachId,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const coach = mockCoaches.find((c) => c.id === formData.defaultCoachId);

    if (editingClass) {
      // Update existing class
      setClasses(
        classes.map((c) =>
          c.id === editingClass.id
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
                duration: parseInt(formData.duration),
                skillLevel: formData.skillLevel as Class["skillLevel"],
                discipline: formData.discipline,
                defaultCoachId: formData.defaultCoachId,
                defaultCoach: coach?.name || "",
              }
            : c
        )
      );
    } else {
      // Create new class
      const newClass: Class = {
        id: `class-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        duration: parseInt(formData.duration),
        skillLevel: formData.skillLevel as Class["skillLevel"],
        discipline: formData.discipline,
        defaultCoachId: formData.defaultCoachId,
        defaultCoach: coach?.name || "",
        isActive: true,
      };
      setClasses([...classes, newClass]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const toggleActive = (classItem: Class) => {
    setClasses(
      classes.map((c) =>
        c.id === classItem.id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  const skillLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      "all-levels": "All Levels",
    };
    return labels[level] || level;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Classes</h1>
        <Button
          onClick={openCreateModal}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Create Class
        </Button>
      </div>

      <WidgetCard title="">
        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className={`bg-gray-800/50 rounded-lg p-4 border ${
                classItem.isActive
                  ? "border-gray-700"
                  : "border-gray-800 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-white">{classItem.name}</h3>
                  <p className="text-sm text-gray-400">
                    {classItem.discipline}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    classItem.isActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {classItem.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                <span>{classItem.duration} min</span>
                <span>•</span>
                <span>{skillLevelLabel(classItem.skillLevel)}</span>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {classItem.description}
              </p>

              <div className="flex gap-2 pt-3 border-t border-gray-700">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditModal(classItem)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleActive(classItem)}
                >
                  {classItem.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Name
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Discipline
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Skill Level
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Duration
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Default Coach
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Status
                </th>
                <th className="text-right py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr
                  key={classItem.id}
                  className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                    !classItem.isActive ? "opacity-60" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <p className="text-white font-medium">{classItem.name}</p>
                    <p className="text-gray-500 text-sm line-clamp-1">
                      {classItem.description}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {classItem.discipline}
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {skillLevelLabel(classItem.skillLevel)}
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {classItem.duration} min
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {classItem.defaultCoach}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        classItem.isActive
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {classItem.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditModal(classItem)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(classItem)}
                      >
                        {classItem.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingClass ? "Edit Class" : "Create Class"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Class Name"
            value={formData.name}
            onChange={(v) => setFormData({ ...formData, name: v })}
            placeholder="e.g., Beginner BJJ"
            required
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(v) => setFormData({ ...formData, description: v })}
            placeholder="Describe what this class covers..."
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Discipline"
              value={formData.discipline}
              onChange={(v) => setFormData({ ...formData, discipline: v })}
              placeholder="e.g., BJJ, Muay Thai"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300">
                Skill Level
                <span className="text-[--color-primary-red] ml-1">*</span>
              </label>
              <Select
                value={formData.skillLevel}
                onChange={(v) => setFormData({ ...formData, skillLevel: v })}
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                  { value: "all-levels", label: "All Levels" },
                ]}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={(v) => setFormData({ ...formData, duration: v })}
              placeholder="60"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300">
                Default Coach
                <span className="text-[--color-primary-red] ml-1">*</span>
              </label>
              <Select
                value={formData.defaultCoachId}
                onChange={(v) =>
                  setFormData({ ...formData, defaultCoachId: v })
                }
                options={mockCoaches.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                placeholder="Select a coach"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingClass ? "Save Changes" : "Create Class"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
