"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dklichlamviecSchema, DKLichLamViecFormValues } from "@/lib/validations/dklichlamviec"
import { lichlamviecApi } from "@/lib/api/lichlamviec"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { toast } from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cleanRegex } from 'node_modules/zod/dist/types/v4/core/util';

interface Shift {
  id: number;
  ten: string;
}

interface SelectedDate {
  ngay: string;
  ca: number[];
}

const WorkScheduleRegistration = () => {
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const form = useForm<DKLichLamViecFormValues>({
    resolver: zodResolver(dklichlamviecSchema),
    defaultValues: {
      thangnam: '',
      ghichu: ''
    }
  });

  // Mock data for shifts
  const shifts: Shift[] = [
    { id: 1, ten: "Ca 1 - Sáng" },
    { id: 2, ten: "Ca 2 - Chiều" }
  ];

  // Generate month-year options for the next 12 months
  const generateMonthOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 2; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      options.push({
        value: monthYear,
        label: `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`
      });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  // Calculate days in selected month
  useEffect(() => {
    const selectedMonth = form.watch("thangnam");
    if (selectedMonth) {
      const [month, year] = selectedMonth.split('-');
      const daysCount = new Date(parseInt(year), parseInt(month), 0).getDate();
      setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
      setSelectedDates([]); // Reset selected dates when month changes
    }
  }, [form.watch("thangnam")]);

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selectedMonth = form.watch("thangnam");
    if (!selectedMonth) return;

    const [month, year] = selectedMonth.split('-');
    const dateString = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const existingIndex = selectedDates.findIndex(item => item.ngay === dateString);
    
    if (existingIndex >= 0) {
      // Remove date if already selected
      setSelectedDates(prev => prev.filter((_, index) => index !== existingIndex));
    } else {
      // Add new date with empty shifts
      setSelectedDates(prev => [...prev, { ngay: dateString, ca: [] }]);
    }
  };

  // Handle shift selection for a specific date
  const handleShiftSelect = (dateString: string, shiftId: number) => {
    setSelectedDates(prev => prev.map(item => {
      if (item.ngay === dateString) {
        const newShifts = item.ca.includes(shiftId)
          ? item.ca.filter(id => id !== shiftId)
          : [...item.ca, shiftId];
        return { ...item, ca: newShifts };
      }
      return item;
    }));
  };

  // Handle form submission
  const onSubmit = async (values: DKLichLamViecFormValues) => {
    try {
      const filteredDates = selectedDates.filter(item => item.ca.length > 0);
      if (filteredDates.length === 0) {
        toast.error("Vui lòng chọn ít nhất một ca làm việc");
        return;
      }
      
      const submitData = {
        ...values,
        thoigiandangky: JSON.stringify(filteredDates)
      };
      console.log(submitData);

      await lichlamviecApi.create(submitData);
      toast.success("Đăng ký lịch làm việc thành công");
      
      // Reset form
      form.reset();
      setSelectedDates([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  // Check if date is selected
  const isDateSelected = (day: number) => {
    const selectedMonth = form.watch("thangnam");
    if (!selectedMonth) return false;
    const [month, year] = selectedMonth.split('-');
    const dateString = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDates.some(item => item.ngay === dateString);
  };

  // Get selected date object
  const getSelectedDateObject = (day: number) => {
    const selectedMonth = form.watch("thangnam");
    if (!selectedMonth) return null;
    const [month, year] = selectedMonth.split('-');
    const dateString = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDates.find(item => item.ngay === dateString);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            Đăng ký lịch làm việc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Month Selection */}
              <FormField
                control={form.control}
                name="thangnam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn tháng đăng ký</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Chọn tháng --</option>
                        {monthOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date and Shift Selection */}
              {form.watch("thangnam") && (
                <div className="space-y-4">
                  <Label>Chọn ngày và ca làm việc</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {daysInMonth.map(day => (
                      <div key={day} className="border rounded-lg p-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{day}</span>
                          <Checkbox
                            checked={isDateSelected(day)}
                            onCheckedChange={() => handleDateSelect(day)}
                          />
                        </div>
                        
                        {isDateSelected(day) && (
                          <div className="space-y-1">
                            {shifts.map(shift => {
                              const selectedDateObj = getSelectedDateObject(day);
                              const isShiftSelected = selectedDateObj?.ca.includes(shift.id) || false;
                              
                              return (
                                <div key={shift.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`shift-${day}-${shift.id}`}
                                    checked={isShiftSelected}
                                    onCheckedChange={() => {
                                      if (selectedDateObj) {
                                        handleShiftSelect(selectedDateObj.ngay, shift.id);
                                      }
                                    }}
                                  />
                                  <Label 
                                    htmlFor={`shift-${day}-${shift.id}`}
                                    className="text-xs"
                                  >
                                    {shift.ten}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <FormField
                control={form.control}
                name="ghichu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú tùy chọn..."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full"
                disabled={!form.watch("thangnam") || selectedDates.filter(item => item.ca.length > 0).length === 0}
              >
                Gửi đăng ký
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkScheduleRegistration;
