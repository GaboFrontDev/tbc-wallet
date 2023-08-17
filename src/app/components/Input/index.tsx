export type ButtonProps = React.ComponentProps<'input'>;

export default function Button(props: ButtonProps) {
    const { title, ...rest } = props;
    return <input {...rest} title={title}></input>;
}