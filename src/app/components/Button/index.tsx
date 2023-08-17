export type ButtonProps = React.ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
    const { title, ...rest } = props;
    return <button {...rest} title={title}></button>;
}