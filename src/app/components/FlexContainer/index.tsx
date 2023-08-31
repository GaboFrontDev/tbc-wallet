import { twMerge } from "tailwind-merge";
import ContainerWithShadow from "../ShadowContainer";

type FlexContainerProps = {
  className?: string;
  children?: React.ReactNode;
  tag?: string;
  withShadow?: boolean
};

const defaultContainerClass = "flex items-center justify-center w-full";

export default function FlexContainer(props: FlexContainerProps) {
  const { className, children, tag = "div", withShadow } = props;

  const classes = twMerge(defaultContainerClass, className);

  if(tag == 'main' ) {
    return <main className={classes}>{children}</main>;
  }
  if(withShadow) {
    return <ContainerWithShadow className={classes}>{children}</ContainerWithShadow>;
  }
  
  return <div className={classes}>{children}</div>;
}
