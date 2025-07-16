"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToaThuoc } from "@/types/toathuoc";
import { createToaThuocSchema, CreateToaThuocFormValues, ChiTietToaThuocFormValues } from "@/lib/validations/toathuoc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2Icon, PlusCircleIcon } from "lucide-react";
import { format } from "date-fns";

interface ToaThuocFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: ToaThuoc;
  onSubmit: (data: CreateToaThuocFormValues) => Promise<void>;
  id_thongtinkhambenh: number;
  chandoan: string;
}

export function ToaThuocFormDialog({
  open,
  onOpenChange,
  onSubmit,
  id_thongtinkhambenh,
  chandoan,
}: ToaThuocFormDialogProps) {
  const form = useForm<CreateToaThuocFormValues>({
    resolver: zodResolver(createToaThuocSchema),
    defaultValues: {
      id_thongtinkhambenh,
      chandoan,
      ngaychandoan: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const handleSubmit = async (data: CreateToaThuocFormValues) => {
    try {
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Thêm toa thuốc
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="chandoan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chẩn đoán</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập chẩn đoán"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit">
                Thêm mới
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
