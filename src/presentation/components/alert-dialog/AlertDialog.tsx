import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/presentation/ui/alert-dialog";

interface AlertBoxProps {
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  children?: React.ReactNode;
  loading?: boolean;
  onAction?: () => void;
  variant?: "default" | "destructive";
}

export function AlertBox({
  title,
  description,
  cancelText,
  actionText,
  children,
  onAction,
  variant = "default",
  loading = false,
}: AlertBoxProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={`font-bold ${
              variant === "destructive"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            } transition-colors`}
            onClick={onAction}
            disabled={loading}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
