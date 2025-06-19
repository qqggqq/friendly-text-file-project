
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import BarcodeGenerator from "@/components/BarcodeGenerator";

const AttendeeRegistration = () => {
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get('event') || 'Sample Event';
  const eventDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [uniqueCode, setUniqueCode] = useState('');
  const [showBarcode, setShowBarcode] = useState(false);

  const generateUniqueCode = (name: string, email: string, phone: string, eventName: string, eventDate: string) => {
    const combined = `${name}${email}${phone}${eventName}${eventDate}`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString().padStart(6, '0').slice(-6);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const code = generateUniqueCode(formData.name, formData.email, formData.phone, eventName, eventDate);
    setUniqueCode(code);
    setShowBarcode(true);
    
    toast({
      title: "Registration Successful!",
      description: `Your unique code is: ${code}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Event Registration</CardTitle>
            <CardDescription>
              Register for: {eventName}
              <br />
              Date: {eventDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showBarcode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Generate Registration Code
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Registration Complete!</h3>
                <p className="text-sm text-gray-600">
                  Your unique registration code is:
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {uniqueCode}
                </div>
                <BarcodeGenerator value={uniqueCode} />
                <p className="text-xs text-gray-500">
                  Please save this barcode for event check-in
                </p>
                <Button 
                  onClick={() => {
                    setShowBarcode(false);
                    setFormData({ name: '', email: '', phone: '' });
                    setUniqueCode('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Register Another Attendee
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendeeRegistration;
