import React, { useState, useEffect } from "react";
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

interface Family {
  id: number;
  name: string;
}

const familySchema = z.object({
  name: z.string().min(1, "Family name is required"),
});

const AddFamilyDialog: React.FC = () => {
  const [familyName, setFamilyName] = useState("");
  const [families, setFamilies] = useState<Family[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        } else {
          console.error("Failed to add family:", res);
        }
      })
      .catch((err) => console.error("Failed to add family:", err));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/families/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchFamilies();
        } else {
          alert("Failed to delete family:" + res);
        }
      })
      .catch((err) => alert("Failed to delete family:" + err));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          Manage Families
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Families</DialogTitle>
          <DialogDescription>View, add, or delete families.</DialogDescription>
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
                window.location.reload();
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
  );
};

export default AddFamilyDialog;
