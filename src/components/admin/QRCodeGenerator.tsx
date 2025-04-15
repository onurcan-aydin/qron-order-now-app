
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Download, QrCode } from "lucide-react";

interface QRCodeGeneratorProps {
  restaurantId: string;
}

export default function QRCodeGenerator({ restaurantId }: QRCodeGeneratorProps) {
  const [tableNumber, setTableNumber] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Generating QR code URL for this restaurant and table number
  const qrCodeData = `https://qron.example/menu/${restaurantId}?table=${tableNumber}`;
  
  // For the MVP, we'll just display the QR code as text
  // In a real app, we would use a QR code generation library like qrcode.react
  
  const handleDownload = () => {
    // In a real app, this would generate and download the QR code
    alert(`QR code for Table ${tableNumber} would be downloaded here`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Generate QR codes for your restaurant tables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="table-number" className="block text-sm font-medium mb-1">
              Table Number
            </label>
            <Input
              id="table-number"
              placeholder="Enter table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
          
          {tableNumber && (
            <div 
              ref={qrRef} 
              className="mt-4 p-6 border rounded-lg flex flex-col items-center justify-center"
            >
              <div className="w-48 h-48 bg-white border-2 flex items-center justify-center mb-2">
                <QrCode size={120} />
              </div>
              <p className="text-sm text-center mt-2">
                Table #{tableNumber}
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1 break-all">
                {qrCodeData}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleDownload}
          disabled={!tableNumber}
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
}
