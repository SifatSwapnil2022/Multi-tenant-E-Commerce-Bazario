import { RefObject } from "react";
export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;

      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // 16px for padding
      }
    }
    if (left < 0) {
      left = 16; // Ensure it doesn't go off the left edge
    }
    return { top, left };
  };
  return { getDropdownPosition };
};
