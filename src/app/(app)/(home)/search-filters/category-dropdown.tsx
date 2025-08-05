"use client";

import type { Config } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

// Extend the Payload category type to support subcategories and color
type Category = Config["collections"]["categories"] & {
  color?: string;
  subcategories?: {
    name: string;
    slug: string;
  }[];
};

interface Props {
  category: Category;
  isActive: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);
  const dropdownPosition = getDropdownPosition();

  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;

  const onMouseEnter = () => setIsOpen(true);
  const onMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // Optional: uncomment for keyboard support
      // onFocus={onMouseEnter}
      // onBlur={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered ? "bg-white border-primary" : "",
            isNavigationHovered ? "bg-white border-primary" : ""
          )}
          aria-haspopup={hasSubcategories ? "true" : undefined}
          aria-expanded={hasSubcategories ? isOpen : undefined}
        >
          {category.name}
        </Button>

        {hasSubcategories && (
          <div
            className={cn(
              "transition-opacity duration-200 opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};
