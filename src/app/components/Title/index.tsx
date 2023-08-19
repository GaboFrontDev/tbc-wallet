import { twMerge } from "tailwind-merge";

const defaultTitleClasses = 'drop-shadow';

export default function Title(props: React.ComponentProps<"h1">) {
    const {className, ...rest} = props;
    const classes = twMerge(defaultTitleClasses, className)
    return <h1 className={classes} {...rest}></h1>;
}
