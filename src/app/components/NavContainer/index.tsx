"use client";
import { useEffect, useState } from "react";
import { IconMenu } from "@/app/components/Icons/index";
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import FlexContainer from "../FlexContainer";
import { usePathname } from "next/navigation";

const NavContainerMobile = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => (
  <div className={`${className} w-full overflow-y-auto h-14 `}>
    <FlexContainer className="w-1/6 text-white">
      <button
        onClick={onClick}
        name="drawer-menu-btn"
        title="menu"
      >
        <IconMenu />
      </button>
    </FlexContainer>
  </div>
);

export const NavDrawer = ({
  Nav,
  className,
}: {
  className?: string;
  Nav: React.ReactNode;
}) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <>
      <NavContainerMobile
        className="absolute z-10 flex items-center overflow-y-hidden"
        onClick={toggleDrawer}
      />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="top"
        duration={250}
        customIdSuffix="nav-drawer"
        zIndex={1001}
        lockBackgroundScroll
        className="w-full text-black flex items-center h-[33vh] rounded-b-xl"
      >
        {Nav}
      </Drawer>
    </>
  );
};
