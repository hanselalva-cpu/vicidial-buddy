import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, PhoneOff, Pause, Play, Volume2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallControlsProps {
  isInCall: boolean;
  isOnHold: boolean;
  isMuted: boolean;
  onCall: () => void;
  onHangup: () => void;
  onHold: () => void;
  onMute: () => void;
}

const CallControls = ({
  isInCall,
  isOnHold,
  isMuted,
  onCall,
  onHangup,
  onHold,
  onMute,
}: CallControlsProps) => {
  return (
    <div className="flex justify-center gap-4 p-4">
      {!isInCall ? (
        <Button
          size="lg"
          onClick={onCall}
          className={cn(
            "h-14 w-14 rounded-full bg-success hover:bg-success/90",
            "transition-all duration-200 hover:scale-110 active:scale-95"
          )}
        >
          <Phone className="h-6 w-6" />
        </Button>
      ) : (
        <>
          <Button
            size="lg"
            variant="outline"
            onClick={onHold}
            className={cn(
              "h-12 w-12 rounded-full",
              isOnHold && "bg-warning text-warning-foreground"
            )}
          >
            {isOnHold ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={onMute}
            className={cn(
              "h-12 w-12 rounded-full",
              isMuted && "bg-destructive text-destructive-foreground"
            )}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            size="lg"
            onClick={onHangup}
            className={cn(
              "h-14 w-14 rounded-full bg-destructive hover:bg-destructive/90",
              "transition-all duration-200 hover:scale-110 active:scale-95"
            )}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 w-12 rounded-full"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default CallControls;