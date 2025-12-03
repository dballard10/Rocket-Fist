/**
 * @file AddMemberModal.tsx
 * @description Modal form for adding new gym members. Used by staff to create
 * member records with basic information. Includes client-side validation.
 *
 * @portal Staff
 * @roles owner, employee (coaches have read-only member access)
 * @usage Used in Members.tsx (pages/Members.tsx)
 *
 * @features
 * - Modal overlay with form
 * - Fields: first name, last name, email (all required)
 * - Client-side validation with error messages
 * - Loading state during submission
 * - Form reset on close
 *
 * @props
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {() => void} onClose - Callback when modal is closed
 * @param {(data: MemberFormData) => void} onSubmit - Callback with form data on submission
 *
 * @todo
 * - Connect to Supabase for actual member creation
 * - Add phone number and membership plan fields
 * - Add email verification or invite flow
 */

import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { MemberFormData } from "../../types/members";

/**
 * Props for the AddMemberModal component.
 */
interface AddMemberModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback fired when the modal is closed (cancel or backdrop click) */
  onClose: () => void;
  /** Callback fired with form data when the form is submitted */
  onSubmit: (data: MemberFormData) => void;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSubmit,
}: AddMemberModalProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // TODO: Integrate with Supabase insert
    // const { data, error } = await supabase
    //   .from('members')
    //   .insert({
    //     first_name: formData.first_name,
    //     last_name: formData.last_name,
    //     email: formData.email,
    //     status: 'active',
    //     created_at: new Date().toISOString(),
    //   })
    //   .select()
    //   .single();

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit(formData);
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ first_name: "", last_name: "", email: "" });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Member"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.first_name}
            onChange={(value) => {
              setFormData({ ...formData, first_name: value });
              if (errors.first_name)
                setErrors({ ...errors, first_name: undefined });
            }}
            placeholder="John"
            required
            error={errors.first_name}
          />
          <Input
            label="Last Name"
            value={formData.last_name}
            onChange={(value) => {
              setFormData({ ...formData, last_name: value });
              if (errors.last_name)
                setErrors({ ...errors, last_name: undefined });
            }}
            placeholder="Doe"
            required
            error={errors.last_name}
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => {
            setFormData({ ...formData, email: value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder="john.doe@email.com"
          required
          error={errors.email}
        />

        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding...
              </span>
            ) : (
              "Add Member"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
