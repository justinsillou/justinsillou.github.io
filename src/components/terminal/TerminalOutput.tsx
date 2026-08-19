type TerminalOutputProps = {
  children: React.ReactNode;
  type?: "default" | "muted" | "error" | "success" | "command";
};

export default function TerminalOutput({
  children,
  type = "default",
}: TerminalOutputProps) {
  const styles = {
    default: "text-neutral-700 dark:text-neutral-300",
    muted: "text-neutral-400 dark:text-neutral-500",
    error: "text-red-500 dark:text-red-400",
    success: "text-emerald-600 dark:text-emerald-400",
    command: "text-neutral-900 dark:text-neutral-100",
  };

  return (
    <div className={`whitespace-pre-wrap ${styles[type]}`}>
      {children}
    </div>
  );
}