import { forwardRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator, Loader2 } from 'lucide-react';
import { useCalculateEstimate } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const EstimateCalculator = forwardRef<HTMLElement>((props, ref) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [projectType, setProjectType] = useState('');
  const [areaInSqFt, setAreaInSqFt] = useState('');
  const [numFloors, setNumFloors] = useState('');
  const [qualityTier, setQualityTier] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [result, setResult] = useState<{
    estimatedCost: bigint;
    breakdown: string;
  } | null>(null);

  const calculateMutation = useCalculateEstimate();

  const handleCalculate = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!mobile.trim()) {
      toast.error('Please enter your mobile number');
      return;
    }
    if (!projectType || !areaInSqFt || !numFloors || !qualityTier || !street || !city || !postalCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    const areaNum = parseFloat(areaInSqFt);
    const numberNum = parseInt(number || '0', 10);
    const floorsNum = parseInt(numFloors, 10);

    if (isNaN(areaNum) || areaNum <= 0) {
      toast.error('Please enter a valid area in square feet');
      return;
    }

    if (isNaN(floorsNum) || floorsNum < 1) {
      toast.error('Please select a valid number of floors');
      return;
    }

    calculateMutation.mutate(
      {
        name: name.trim(),
        mobile: mobile.trim(),
        projectType,
        areaInSqFt: areaNum,
        numFloors: BigInt(floorsNum),
        qualityTier,
        street,
        number: BigInt(isNaN(numberNum) ? 0 : numberNum),
        city,
        postalCode,
      },
      {
        onSuccess: (data) => {
          setResult(data);
          toast.success('Estimate calculated successfully!');
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to calculate estimate');
        },
      }
    );
  };

  const formatCurrency = (amount: bigint) => {
    const numAmount = Number(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Construction Estimate Calculator
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Get an instant estimate for your construction project. Fill in the
            details below and we'll calculate the approximate cost.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Calculator className="mr-2 h-6 w-6 text-primary" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lead Capture Fields */}
              <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Your Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calc-name">Full Name *</Label>
                    <Input
                      id="calc-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calc-mobile">Mobile Number *</Label>
                    <Input
                      id="calc-mobile"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq. ft.) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter area in square feet"
                    value={areaInSqFt}
                    onChange={(e) => setAreaInSqFt(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numFloors">Number of Floors *</Label>
                  <Select value={numFloors} onValueChange={setNumFloors}>
                    <SelectTrigger id="numFloors">
                      <SelectValue placeholder="Select number of floors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Floor</SelectItem>
                      <SelectItem value="2">2 Floors</SelectItem>
                      <SelectItem value="3">3 Floors</SelectItem>
                      <SelectItem value="4">4 Floors</SelectItem>
                      <SelectItem value="5">5 Floors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label>Quality Tier *</Label>
                  <RadioGroup value={qualityTier} onValueChange={setQualityTier}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="Standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer flex-1">
                          <div className="font-semibold">Standard</div>
                          <div className="text-sm text-muted-foreground">Good quality construction</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="Premium" id="premium" />
                        <Label htmlFor="premium" className="cursor-pointer flex-1">
                          <div className="font-semibold">Premium</div>
                          <div className="text-sm text-muted-foreground">High quality construction</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="Luxury" id="luxury" />
                        <Label htmlFor="luxury" className="cursor-pointer flex-1">
                          <div className="font-semibold">Luxury</div>
                          <div className="text-sm text-muted-foreground">Ultra-premium construction</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Project Location *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Name *</Label>
                    <Input
                      id="street"
                      type="text"
                      placeholder="Enter street name"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number">Building/Plot Number</Label>
                    <Input
                      id="number"
                      type="number"
                      placeholder="Enter number (optional)"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="Enter postal code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                disabled={calculateMutation.isPending}
                className="w-full md:w-auto px-8"
                size="lg"
              >
                {calculateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Estimate
                  </>
                )}
              </Button>

              {result && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Estimated Construction Cost
                    </h3>
                    <div className="text-4xl font-bold text-primary mb-4">
                      {formatCurrency(result.estimatedCost)}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        Project Summary:
                      </h4>
                      <p className="text-muted-foreground">{result.breakdown}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      * This is an approximate estimate. Final costs may vary
                      based on specific site conditions, material availability,
                      and project requirements.
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

EstimateCalculator.displayName = 'EstimateCalculator';

export default EstimateCalculator;
