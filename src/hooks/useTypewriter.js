import { useState, useEffect } from "react";

export function useTypewriter(commands, { typeSpeed = 45, pause = 1400, deleteSpeed = 25 } = {}) {
  const [text, setText] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = commands[commandIndex];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setCommandIndex((i) => (i + 1) % commands.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, commandIndex, commands, typeSpeed, pause, deleteSpeed]);

  return text;
}
