import { twMerge } from "tailwind-merge";

type ShadowContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

const defaultContainerClass = "bg-gray-400/50 rounded-lg p-5 shadow-lg w-full";

export default function ContainerWithShadow(props: ShadowContainerProps) {
  const { className, children } = props;

  const classes = twMerge(defaultContainerClass, className);

  return <div className={classes}>{children}</div>;
}
