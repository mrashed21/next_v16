"use client";

import { createCategory } from "@/actions/category-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { slugify } from "@/hooks/slugify";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
  isActive: boolean;
  categoryImage?: string;
};

interface CategoryCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CategoryCreate = ({
  open,
  onOpenChange,
  onSuccess,
}: CategoryCreateModalProps) => {
  const [isPending, startTransition] = useTransition();

  const categoryImageUrlRegex =
    /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif|svg)$/i;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      isActive: true,
      categoryImage: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const toastId = toast.loading("Creating category...");

    startTransition(async () => {
      try {
        const res = await createCategory({
          name: data.name,
          slug: slugify(data.name),
          isActive: data.isActive,
          categoryImage: data.categoryImage || undefined,
        });

        if (!res?.status) {
          throw new Error(res?.message);
        }

        toast.success("Category created successfully", { id: toastId });
        reset();
        onOpenChange(false);
        onSuccess();
      } catch (error: any) {
        toast.error(error?.message || "Failed to create category", {
          id: toastId,
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Category name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <Label>Image URL</Label>
            <Input
              placeholder="https://example.com/category.png"
              {...register("categoryImage", {
                validate: (value) =>
                  !value ||
                  categoryImageUrlRegex.test(value) ||
                  "Please enter a valid image URL",
              })}
            />
            {errors.categoryImage && (
              <p className="text-sm text-red-500">
                {errors.categoryImage.message}
              </p>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch
              checked={watch("isActive")}
              onCheckedChange={(v) => setValue("isActive", v)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreate;
