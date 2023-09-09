"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Instagram from "./instagram.svg";
import Tiktok from "./tiktok.svg";
import Image from "next/image";
const defaultFooterClasses = "absolute bottom-0 text-white m-2 justify-between";

export default function Footer({ className }: { className?: string }) {
  const classes = twMerge(defaultFooterClasses, className);
  return <div className={classes}></div>;
}
