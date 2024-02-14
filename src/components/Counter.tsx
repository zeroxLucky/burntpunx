"use client";
import { getCount } from "@/actions/contract";
import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // get count from server action
  const get = async () => {
    const countRes = await getCount();
    if (countRes) {
      setCount(countRes);
    }
  };

  // get count on load
  useEffect(() => {
    get();
  }, []);

  // get count every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      get();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="ml-auto pt-1 z-10 relative"
      style={{
        textOrientation: "upright",
        writingMode: "vertical-rl",
      }}
    >
      {count}
    </div>
  );
}
