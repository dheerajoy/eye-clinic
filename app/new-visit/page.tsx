"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, DollarSign, Plus, Trash2, FileText, Printer } from 'lucide-react'
import { BillPreview } from "@/components/bill-preview"

interface Medicine {
  id: string
  name: string
  quantity: number
  dosage: string
  price: number
}

interface OpticalPrescription {
  eye: 'OD' | 'OS'
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
  distance: string
}

export default function NewVisit() {
  const { toast } = useToast()
  const [selectedPatient, setSelectedPatient] = useState("")
  const [visitType, setVisitType] = useState("")
  const [showBillPreview, setShowBillPreview] = useState(false)

  // Consultation data
  const [consultationData, setConsultationData] = useState({
    diagnosis: "",
    fee: "",
    doctor: "",
  })

  // Medicine data
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: "1", name: "", quantity: 1, dosage: "", price: 0 }
  ])

  // Optical prescription data
  const [opticalData, setOpticalData] = useState({
    prescriptions: [
      { eye: 'OD' as const, sph: '', cyl: '', axis: '', add: '', pd: '', distance: '' },
      { eye: 'OS' as const, sph: '', cyl: '', axis: '', add: '', pd: '', distance: '' }
    ],
    lensType: "",
    remarks: "",
    framesCost: 0,
    lensesCost: 0,
  })

  // Mock patients for dropdown
  const patients = [
    { id: "1", name: "John Doe", mobile: "+1 (555) 123-4567" },
    { id: "2", name: "Jane Smith", mobile: "+1 (555) 987-6543" },
    { id: "3", name: "Mike Johnson", mobile: "+1 (555) 456-7890" },
  ]

  const doctors = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Wilson",
    "Dr. Brown"
  ]

  const commonMedicines = [
    "Artificial Tears",
    "Tobramycin Eye Drops",
    "Prednisolone Eye Drops",
    "Cyclosporine",
    "Latanoprost",
    "Timolol",
    "Olopatadine"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Visit Recorded Successfully",
      description: "The patient visit has been added to the system.",
    })
  }

  const addMedicine = () => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      dosage: "",
      price: 0
    }
    setMedicines([...medicines, newMedicine])
  }

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id))
  }

  const updateMedicine = (id: string, field: keyof Medicine, value: any) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ))
  }

  const calculateTotal = () => {
    switch (visitType) {
      case "consultation":
        return parseFloat(consultationData.fee) || 0
      case "medicine":
        return medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0)
      case "optical":
        return opticalData.framesCost + opticalData.lensesCost
      default:
        return 0
    }
  }

  const getBillData = () => {
    const selectedPatientData = patients.find(p => p.id === selectedPatient)
    
    return {
      patient: selectedPatientData,
      visitType,
      date: new Date().toLocaleDateString(),
      consultationData,
      medicines,
      opticalData,
      total: calculateTotal()
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <Calendar className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            New Visit
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Record a new patient visit and billing information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Visit Details</CardTitle>
              <CardDescription>
                Enter the visit information and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Select Patient *</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} - {patient.mobile}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visitType">Visit Type *</Label>
                    <Select value={visitType} onValueChange={setVisitType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="medicine">Medicine Billing</SelectItem>
                        <SelectItem value="optical">Optical Prescription</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Visit Type Specific Forms */}
                {visitType && (
                  <Tabs value={visitType} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="consultation">Consultation</TabsTrigger>
                      <TabsTrigger value="medicine">Medicine</TabsTrigger>
                      <TabsTrigger value="optical">Optical</TabsTrigger>
                    </TabsList>

                    <TabsContent value="consultation" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis / Notes *</Label>
                        <Textarea
                          id="diagnosis"
                          value={consultationData.diagnosis}
                          onChange={(e) => setConsultationData(prev => ({ ...prev, diagnosis: e.target.value }))}
                          placeholder="Enter diagnosis and consultation notes..."
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fee">Consultation Fee *</Label>
                          <Input
                            id="fee"
                            type="number"
                            step="0.01"
                            value={consultationData.fee}
                            onChange={(e) => setConsultationData(prev => ({ ...prev, fee: e.target.value }))}
                            placeholder="Enter consultation fee"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="doctor">Doctor's Name</Label>
                          <Select 
                            value={consultationData.doctor} 
                            onValueChange={(value) => setConsultationData(prev => ({ ...prev, doctor: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select doctor" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor} value={doctor}>
                                  {doctor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="medicine" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Medicine List</h3>
                        <Button type="button" onClick={addMedicine} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Medicine
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {medicines.map((medicine, index) => (
                          <Card key={medicine.id} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div className="space-y-2">
                                <Label>Medicine Name *</Label>
                                <Select 
                                  value={medicine.name} 
                                  onValueChange={(value) => updateMedicine(medicine.id, 'name', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select medicine" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {commonMedicines.map((med) => (
                                      <SelectItem key={med} value={med}>
                                        {med}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Quantity *</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={medicine.quantity}
                                  onChange={(e) => updateMedicine(medicine.id, 'quantity', parseInt(e.target.value))}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Dosage Instructions</Label>
                                <Input
                                  value={medicine.dosage}
                                  onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                                  placeholder="e.g., 1 drop twice daily"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Price per Unit *</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={medicine.price}
                                  onChange={(e) => updateMedicine(medicine.id, 'price', parseFloat(e.target.value))}
                                  required
                                />
                              </div>
                              
                              <div className="flex items-end">
                                {medicines.length > 1 && (
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeMedicine(medicine.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="optical" className="space-y-4">
                      <h3 className="text-lg font-semibold">Prescription Details</h3>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Eye</TableHead>
                              <TableHead>SPH</TableHead>
                              <TableHead>CYL</TableHead>
                              <TableHead>AXIS</TableHead>
                              <TableHead>ADD</TableHead>
                              <TableHead>PD</TableHead>
                              <TableHead>Distance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {opticalData.prescriptions.map((prescription, index) => (
                              <TableRow key={prescription.eye}>
                                <TableCell className="font-medium">
                                  {prescription.eye}
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.sph}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].sph = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0.00"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.cyl}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].cyl = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0.00"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.axis}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].axis = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.add}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].add = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0.00"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.pd}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].pd = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0.0"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={prescription.distance}
                                    onChange={(e) => {
                                      const newPrescriptions = [...opticalData.prescriptions]
                                      newPrescriptions[index].distance = e.target.value
                                      setOpticalData(prev => ({ ...prev, prescriptions: newPrescriptions }))
                                    }}
                                    placeholder="0.0"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Lens Type</Label>
                          <Select 
                            value={opticalData.lensType} 
                            onValueChange={(value) => setOpticalData(prev => ({ ...prev, lensType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select lens type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single-vision">Single Vision</SelectItem>
                              <SelectItem value="bifocal">Bifocal</SelectItem>
                              <SelectItem value="progressive">Progressive</SelectItem>
                              <SelectItem value="reading">Reading</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Frames Cost</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={opticalData.framesCost}
                            onChange={(e) => setOpticalData(prev => ({ ...prev, framesCost: parseFloat(e.target.value) || 0 }))}
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Lenses Cost</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={opticalData.lensesCost}
                            onChange={(e) => setOpticalData(prev => ({ ...prev, lensesCost: parseFloat(e.target.value) || 0 }))}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Remarks</Label>
                        <Textarea
                          value={opticalData.remarks}
                          onChange={(e) => setOpticalData(prev => ({ ...prev, remarks: e.target.value }))}
                          placeholder="Additional remarks or instructions..."
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Record Visit
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowBillPreview(true)}
                    disabled={!selectedPatient || !visitType}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Preview Bill
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Billing Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPatient && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Selected Patient
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {patients.find(p => p.id === selectedPatient)?.name}
                  </p>
                </div>
              )}

              {visitType && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Visit Type</span>
                    <Badge variant="outline" className="capitalize">
                      {visitType}
                    </Badge>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!selectedPatient && !visitType && (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select patient and visit type to see summary</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bill Preview Modal */}
      {showBillPreview && (
        <BillPreview 
          billData={getBillData()}
          onClose={() => setShowBillPreview(false)}
        />
      )}
    </div>
  )
}
