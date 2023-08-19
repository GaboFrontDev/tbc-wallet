import { twMerge } from "tailwind-merge";

const defaultFormClasses = "w-full";

export default function Form(props: React.ComponentProps<"form">) {
  const { className, children, ...rest } = props;
  const classes = twMerge(defaultFormClasses, className);
  return (
    <form className={classes} {...rest}>
      {children}
    </form>
  );
}
