import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {title}
          </DialogTitle>
          <DialogDescription style={{ fontSize: "1.2rem" }}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={onClose} style={{ fontSize: "1rem" }}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;