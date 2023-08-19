import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ComponentProps<'input'>;

const defaultInputClasses = 
    "rounded-full px-4 py-0.5 bg-gray-200/50 placeholder-gray-200 w-full my-2";

export default function Input(props: ButtonProps) {
    const { title, className, ...rest } = props;
    const classes = twMerge(defaultInputClasses,className)
    return <input className={classes} {...rest} title={title}></input>;
}