"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Section({
  title,
  subtitle,
  icon,
  mockup = false,
  customIcon = null,
  children,
}: any) {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <div
      className={`w-full flex bg-muted p-6 rounded-lg flex-col space-y-6 ${
        mockup ? "h-full" : "min-h-[90vh]"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {icon && !customIcon && (
          <div className="bg-background rounded-xl p-8 aspect-square flex items-center justify-center">
            <FontAwesomeIcon icon={icon} size={"3x"} />
          </div>
        )}

        {customIcon && !icon && (
          <div className="bg-background rounded-xl p-8 aspect-square flex items-center justify-center">
            {customIcon}
          </div>
        )}

        <div className="flex flex-col py-4 gap-2 justify-center lg:text-left text-center">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div>{children}</div>
    </div>
  );
}
