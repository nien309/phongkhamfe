import { useState } from "react"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { hoaDonApi } from "@/lib/api/hoadon"

interface CancelHoaDonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hoaDonId: number
  onSuccess: () => void
}

export function CancelHoaDonDialog({
  open,
  onOpenChange,
  hoaDonId,
  onSuccess,
}: CancelHoaDonDialogProps) {
  const [lydo, setLydo] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!lydo.trim()) {
      toast.error("Vui lòng nhập lý do hủy")
      return
    }

    try {
      setLoading(true)
      await hoaDonApi.cancel(hoaDonId, lydo.trim())
      toast.success("Hủy hóa đơn thành công")
      router.push("/admin/hoa-don")
      onSuccess()
      onOpenChange(false)
      setLydo("")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi hủy hóa đơn")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hủy hóa đơn</DialogTitle>
          <DialogDescription>
            Vui lòng nhập lý do hủy hóa đơn. Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Nhập lý do hủy..."
            value={lydo}
            onChange={(e) => setLydo(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              "Xác nhận hủy"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 