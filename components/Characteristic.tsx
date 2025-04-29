"use client";

import { toast } from "@/hooks/use-toast";
import { OctagonX } from "lucide-react";

interface Characteristic {
  id: string | number;
  content: string;
}

function Characteristic({
  characteristic,
  onDelete,
}: {
  characteristic: Characteristic;
  onDelete: () => void;
}) {
  const handleRemoveCharacteristic = async () => {
    try {
      await fetch("/api/deleteCharacteristicById", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: characteristic.id,
        }),
      });
      toast({
        title: "Success",
        description: "Deleted the Characteristic",
      });
      onDelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      key={characteristic.id}
      className="relative bg-white p-5 border rounded-md"
    >
      {characteristic.content}
      <OctagonX
        onClick={() => {
          handleRemoveCharacteristic();
        }}
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
      />
    </li>
  );
}
export default Characteristic;
