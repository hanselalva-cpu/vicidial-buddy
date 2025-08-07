import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Delete, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import DialPad from "@/components/softphone/DialPad";
import CallControls from "@/components/softphone/CallControls";
import CallDisplay from "@/components/softphone/CallDisplay";
import CallHistory from "@/components/softphone/CallHistory";
import ConnectionStatus from "@/components/softphone/ConnectionStatus";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState<"idle" | "dialing" | "ringing" | "connected" | "on-hold">("idle");
  const [isInCall, setIsInCall] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const { toast } = useToast();

  // Mock call history data
  const [callHistory] = useState([
    {
      id: "1",
      phoneNumber: "+1234567890",
      contactName: "Cliente Demo",
      type: "outgoing" as const,
      duration: "5:23",
      timestamp: "Hace 15 min"
    },
    {
      id: "2",
      phoneNumber: "+0987654321",
      type: "incoming" as const,
      duration: "2:45",
      timestamp: "Hace 1 hora"
    },
    {
      id: "3",
      phoneNumber: "+1122334455",
      type: "missed" as const,
      duration: "0:00",
      timestamp: "Hace 2 horas"
    }
  ]);

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isInCall && callStartTime && callStatus === "connected" && !isOnHold) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - callStartTime.getTime()) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setCallDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInCall, callStartTime, callStatus, isOnHold]);

  const handleDigitClick = (digit: string) => {
    if (!isInCall) {
      setPhoneNumber(prev => prev + digit);
    } else {
      // Send DTMF tone during call
      toast({
        title: "DTMF",
        description: `Tono enviado: ${digit}`,
      });
    }
  };

  const handleCall = () => {
    if (phoneNumber.trim()) {
      setIsInCall(true);
      setCallStatus("dialing");
      
      toast({
        title: "Iniciando llamada",
        description: `Marcando a ${phoneNumber}`,
      });

      // Simulate call progression
      setTimeout(() => {
        setCallStatus("ringing");
      }, 1000);

      setTimeout(() => {
        setCallStatus("connected");
        setCallStartTime(new Date());
        toast({
          title: "Llamada conectada",
          description: "La llamada se ha establecido correctamente",
        });
      }, 3000);
    } else {
      toast({
        title: "Error",
        description: "Ingrese un número de teléfono",
        variant: "destructive",
      });
    }
  };

  const handleHangup = () => {
    setIsInCall(false);
    setCallStatus("idle");
    setIsOnHold(false);
    setIsMuted(false);
    setCallDuration("");
    setCallStartTime(null);
    
    toast({
      title: "Llamada finalizada",
      description: "La llamada se ha terminado",
    });
  };

  const handleHold = () => {
    setIsOnHold(!isOnHold);
    setCallStatus(isOnHold ? "connected" : "on-hold");
    
    toast({
      title: isOnHold ? "Llamada reanudada" : "Llamada en espera",
      description: isOnHold ? "La llamada se ha reanudado" : "La llamada se ha puesto en espera",
    });
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    
    toast({
      title: isMuted ? "Micrófono activado" : "Micrófono silenciado",
      description: isMuted ? "Su micrófono está ahora activo" : "Su micrófono está ahora silenciado",
    });
  };

  const clearNumber = () => {
    setPhoneNumber("");
  };

  const deleteLastDigit = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCallFromHistory = (number: string) => {
    setPhoneNumber(number);
    toast({
      title: "Número seleccionado",
      description: `${number} agregado al marcador`,
    });
  };

  const handleSettings = () => {
    toast({
      title: "Configuración",
      description: "Abriendo configuración del softphone...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card shadow-lg">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 text-center">
          <h1 className="text-xl font-bold">Vicidial Softphone</h1>
        </div>

        {/* Connection Status */}
        <ConnectionStatus
          isConnected={isConnected}
          extension="1001"
          serverUrl="192.168.1.100"
          onSettings={handleSettings}
        />

        {/* Main Interface */}
        <Tabs defaultValue="dialer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dialer">Marcador</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="dialer" className="space-y-4 p-4">
            {/* Call Display */}
            <CallDisplay
              phoneNumber={phoneNumber}
              callStatus={callStatus}
              callDuration={callDuration}
            />

            {/* Number Input */}
            <div className="flex gap-2">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ingrese número de teléfono"
                className="flex-1 text-center text-lg font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={deleteLastDigit}
                disabled={phoneNumber.length === 0}
              >
                <Delete className="h-4 w-4" />
              </Button>
            </div>

            {/* Call Controls */}
            <CallControls
              isInCall={isInCall}
              isOnHold={isOnHold}
              isMuted={isMuted}
              onCall={handleCall}
              onHangup={handleHangup}
              onHold={handleHold}
              onMute={handleMute}
            />

            {/* Dial Pad */}
            <DialPad onDigitClick={handleDigitClick} />

            {/* Clear Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={clearNumber}
                disabled={phoneNumber.length === 0}
                className="w-32"
              >
                Limpiar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="p-4">
            <CallHistory
              calls={callHistory}
              onCallNumber={handleCallFromHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;