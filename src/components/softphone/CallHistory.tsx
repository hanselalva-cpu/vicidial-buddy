import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CallRecord {
  id: string;
  phoneNumber: string;
  contactName?: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  timestamp: string;
}

interface CallHistoryProps {
  calls: CallRecord[];
  onCallNumber: (number: string) => void;
}

const CallHistory = ({ calls, onCallNumber }: CallHistoryProps) => {
  const getCallTypeColor = (type: string) => {
    switch (type) {
      case "incoming":
        return "bg-success";
      case "outgoing":
        return "bg-primary";
      case "missed":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getCallTypeText = (type: string) => {
    switch (type) {
      case "incoming":
        return "Entrante";
      case "outgoing":
        return "Saliente";
      case "missed":
        return "Perdida";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historial de llamadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {calls.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No hay llamadas recientes
          </p>
        ) : (
          calls.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">
                    {call.contactName || call.phoneNumber}
                  </p>
                  <Badge className={getCallTypeColor(call.type)} variant="secondary">
                    {getCallTypeText(call.type)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {call.phoneNumber} • {call.duration} • {call.timestamp}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCallNumber(call.phoneNumber)}
                className="ml-2"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CallHistory;