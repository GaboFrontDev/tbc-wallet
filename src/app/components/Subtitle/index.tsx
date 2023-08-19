import { twMerge } from "tailwind-merge";

const defaultSubTitleClasses = '';

export default function Subtitle(props: React.ComponentProps<"h2">) {
    const {className, ...rest} = props;
    const classes = twMerge(defaultSubTitleClasses, className)
    return <h2 className={classes} {...rest}></h2>;
}
