"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddToListButton({ movie }: { movie: any }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("movie-list") || "[]");
    setAdded(list.some((m: any) => m.id === movie.id));
  }, [movie.id]);

  const handleAdd = () => {
    const list = JSON.parse(localStorage.getItem("movie-list") || "[]");

    if (list.some((m: any) => m.id === movie.id)) return;

    const updated = [...list, movie];
    localStorage.setItem("movie-list", JSON.stringify(updated));
    setAdded(true);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={added}
      className="bg-indigo-600"
    >
      {added ? "Added" : "Add to List"}
    </Button>
  );
}
