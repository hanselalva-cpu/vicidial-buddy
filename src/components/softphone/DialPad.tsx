import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialPadProps {
  onDigitClick: (digit: string) => void;
}

const DialPad = ({ onDigitClick }: DialPadProps) => {
  const digits = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {digits.map((digit) => (
        <Button
          key={digit.number}
          variant="outline"
          size="lg"
          onClick={() => onDigitClick(digit.number)}
          className={cn(
            "h-16 w-16 flex flex-col items-center justify-center",
            "text-lg font-semibold hover:bg-primary hover:text-primary-foreground",
            "transition-all duration-200 hover:scale-105 active:scale-95"
          )}
        >
          <span className="text-xl font-bold">{digit.number}</span>
          {digit.letters && (
            <span className="text-xs text-muted-foreground">{digit.letters}</span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default DialPad;