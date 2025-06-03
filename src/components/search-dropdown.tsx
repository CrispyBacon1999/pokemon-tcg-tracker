import { useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export default function SearchDropdown({
  value,
  options,
  onChange,
  placeholder = "Select an option",
}: {
  value: string;
  options: { value: string; label: string; image: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedOption && (
            <img src={selectedOption.image} className="w-6 mr-2" />
          )}
          {selectedOption ? selectedOption.label : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Any Pack
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <img src={option.image} className="w-6 mr-2" />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
