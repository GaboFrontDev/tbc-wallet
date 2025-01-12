import { twMerge } from "tailwind-merge";

const defaultSubTitleClasses = '';

export default function Subtitle(props: React.ComponentProps<"h2">) {
    const {className, ...rest} = props;
    const _classes = twMerge(defaultSubTitleClasses, className)
    const classes = twMerge(_classes, 'select-none')
    return <h2 className={classes} {...rest}></h2>;
}
