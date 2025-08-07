import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface CallDisplayProps {
  phoneNumber: string;
  callStatus: "idle" | "dialing" | "ringing" | "connected" | "on-hold";
  callDuration?: string;
  contactName?: string;
}

const CallDisplay = ({ phoneNumber, callStatus, callDuration, contactName }: CallDisplayProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-success";
      case "dialing":
      case "ringing":
        return "bg-warning";
      case "on-hold":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "dialing":
        return "Marcando...";
      case "ringing":
        return "Sonando...";
      case "connected":
        return "En llamada";
      case "on-hold":
        return "En espera";
      default:
        return "Listo";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-muted">
            <User className="h-10 w-10 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-2">
          {contactName && (
            <h3 className="text-lg font-semibold text-foreground">{contactName}</h3>
          )}
          <p className="text-2xl font-mono text-foreground">
            {phoneNumber || "Ingrese número"}
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <Badge className={getStatusColor(callStatus)}>
              {getStatusText(callStatus)}
            </Badge>
            {callDuration && (
              <Badge variant="outline">
                {callDuration}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CallDisplay;