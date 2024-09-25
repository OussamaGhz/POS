import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TrashIcon } from "lucide-react";
import { z } from "zod";
import ConfirmationDialog from "../../ConfirmationDialog";

interface Family {
  id: number;
  name: string;
}

const familySchema = z.object({
  name: z.string().min(1, "Family name is required"),
});

interface props {
  onFamilyUpdated: () => void;
  onProductAdded: () => void;
}

const AddFamilyDialog: React.FC<props> = ({
  onFamilyUpdated,
  onProductAdded,
}) => {
  const [familyName, setFamilyName] = useState("");
  const [families, setFamilies] = useState<Family[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [familyToDelete, setFamilyToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = () => {
    fetch("http://localhost:8000/families")
      .then((res) => res.json())
      .then((data) => setFamilies(data))
      .catch((err) => console.error("Failed to fetch families:", err));
  };

  const handleSave = () => {
    const result = familySchema.safeParse({ name: familyName });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    fetch("http://localhost:8000/families", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: familyName }),
    })
      .then((res) => {
        if (res.ok) {
          fetchFamilies();
          setFamilyName("");
          setError(null);
          onFamilyUpdated(); // Call the callback to update the families list
        } else {
          console.error("Failed to add family:", res);
        }
      })
      .catch((err) => console.error("Failed to add family:", err));
  };

  const handleDelete = (id: number) => {
    setFamilyToDelete(id);
    setIsConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (familyToDelete === null) return;

    fetch(`http://localhost:8000/families/${familyToDelete}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchFamilies();
          onFamilyUpdated(); // Call the callback to update the families list
          onProductAdded();
        } else {
          alert("Failed to delete family:" + res);
        }
      })
      .catch((err) => alert("Failed to delete family:" + err))
      .finally(() => {
        setIsConfirmationOpen(false);
        setFamilyToDelete(null);
      });
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && isConfirmationOpen) {
        confirmDelete();
      }
    },
    [isConfirmationOpen, confirmDelete]
  );

  useEffect(() => {
    if (isConfirmationOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConfirmationOpen, handleKeyDown]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="default">
            Manage Families
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Families</DialogTitle>
            <DialogDescription>
              View, add, or delete families.
            </DialogDescription>
          </DialogHeader>
          <div>
            {families.map((family) => (
              <div
                key={family.id}
                className="flex justify-between items-center mb-2"
              >
                <span>{family.name}</span>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(family.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Input
            autoFocus
            type="text"
            placeholder="New Family Name"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                size="default"
                onClick={() => {
                  setFamilyName("");
                  setError(null);
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" size="default" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmationOpen(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this family? Deleting this family will also delete all related products."
      />
    </>
  );
};

export default AddFamilyDialog;
