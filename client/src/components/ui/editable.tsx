"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";

interface EditableProps {
  children: string;
  onApply: (value: string) => void;
  as?: React.ElementType;
}

export const Editable: React.FC<EditableProps> = ({
  as = "p",
  children,
  onApply,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(children);
  const Component = as as React.ElementType;

  const handleCancel = () => {
    setIsEditing(false);
    setValue(children);
  };

  const handleApply = () => {
    setIsEditing(false);
    onApply(value);
  };

  return (
    <>
      {!isEditing && (
        <Component
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >
          {children}
        </Component>
      )}

      {isEditing && (
        <div className="flex flex-col gap-2 w-full">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-3 justify-end">
            <Button size="icon" onClick={handleApply}>
              <Check />
            </Button>

            <Button size="icon" variant="destructive" onClick={handleCancel}>
              <X />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
