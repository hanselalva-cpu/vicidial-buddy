import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectionStatusProps {
  isConnected: boolean;
  serverUrl?: string;
  extension?: string;
  onSettings: () => void;
}

const ConnectionStatus = ({ isConnected, serverUrl, extension, onSettings }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <Badge 
          className={isConnected ? "bg-success" : "bg-destructive"}
          variant="secondary"
        >
          {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
          {isConnected ? "Conectado" : "Desconectado"}
        </Badge>
        
        {extension && (
          <Badge variant="outline">
            Ext: {extension}
          </Badge>
        )}
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={onSettings}
        className="flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Config
      </Button>
    </div>
  );
};

export default ConnectionStatus;