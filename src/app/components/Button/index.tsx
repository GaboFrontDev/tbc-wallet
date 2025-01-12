import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ComponentProps<"button">;

const defaultClasse =
  "bg-black/80 hover:bg-gray-100 hover:text-black text-white shadow shadow-lg font-semibold py-2 px-4 my-2 rounded-full w-full";

export default function Button(props: ButtonProps) {
  const { title, className, ...rest } = props;
  const classes = twMerge(defaultClasse, className);
  return <button className={classes} {...rest} title={title}></button>;
}
