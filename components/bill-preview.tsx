"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Printer, X } from 'lucide-react'

interface BillData {
  patient: any
  visitType: string
  date: string
  consultationData: any
  medicines: any[]
  opticalData: any
  total: number
}

interface BillPreviewProps {
  billData: BillData
  onClose: () => void
}

export function BillPreview({ billData, onClose }: BillPreviewProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Bill Preview</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={handlePrint} size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Bill Content - Designed for vertical half A4 (105mm x 210mm) */}
        <div 
          className="bg-white text-black p-4 print:p-3 print:text-xs border" 
          style={{ width: '105mm', minHeight: '210mm' }}
          data-print="true"
        >
          {/* Clinic Header */}
          <div className="text-center mb-4 print:mb-3">
            <h1 className="text-xl font-bold text-blue-600 print:text-lg">EyeCare Clinic</h1>
            <p className="text-xs text-slate-600">123 Medical Street, City, State 12345</p>
            <p className="text-xs text-slate-600">Phone: (555) 123-4567</p>
          </div>

          <Separator className="mb-3 print:mb-2" />

          {/* Bill Header */}
          <div className="flex justify-between mb-4 print:mb-3">
            <div>
              <h2 className="text-base font-semibold print:text-sm">BILL / RECEIPT</h2>
              <p className="text-xs text-slate-600">Date: {billData.date}</p>
              <p className="text-xs text-slate-600">Bill #: {Date.now().toString().slice(-6)}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm print:text-xs">Patient: {billData.patient?.name}</p>
              <p className="text-xs text-slate-600">Mobile: {billData.patient?.mobile}</p>
            </div>
          </div>

          {/* Visit Type Specific Content */}
          <div className="mb-4 print:mb-3">
            <h3 className="font-semibold mb-2 capitalize text-sm print:text-xs border-b pb-1">
              {billData.visitType} Details
            </h3>
            
            {billData.visitType === 'consultation' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm print:text-xs">
                  <span>Consultation Fee</span>
                  <span className="font-medium">${billData.consultationData.fee}</span>
                </div>
                {billData.consultationData.doctor && (
                  <div className="text-xs text-slate-600">
                    <span className="font-medium">Doctor:</span> {billData.consultationData.doctor}
                  </div>
                )}
                <div className="text-xs text-slate-600 mt-2">
                  <span className="font-medium">Diagnosis:</span>
                  <div className="mt-1 text-xs leading-tight">
                    {billData.consultationData.diagnosis}
                  </div>
                </div>
              </div>
            )}

            {billData.visitType === 'medicine' && (
              <div className="space-y-2">
                <div className="border rounded">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-slate-50">
                        <th className="text-left p-1 print:p-0.5">Medicine</th>
                        <th className="text-center p-1 print:p-0.5">Qty</th>
                        <th className="text-right p-1 print:p-0.5">Price</th>
                        <th className="text-right p-1 print:p-0.5">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billData.medicines.map((medicine, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-1 print:p-0.5">
                            <div className="font-medium">{medicine.name}</div>
                            {medicine.dosage && (
                              <div className="text-xs text-slate-600 print:text-xs">
                                {medicine.dosage}
                              </div>
                            )}
                          </td>
                          <td className="text-center p-1 print:p-0.5">{medicine.quantity}</td>
                          <td className="text-right p-1 print:p-0.5">${medicine.price}</td>
                          <td className="text-right p-1 print:p-0.5 font-medium">
                            ${(medicine.price * medicine.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {billData.visitType === 'optical' && (
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-xs">Prescription Details</h4>
                  <div className="border rounded">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="text-left p-1 print:p-0.5">Eye</th>
                          <th className="text-center p-1 print:p-0.5">SPH</th>
                          <th className="text-center p-1 print:p-0.5">CYL</th>
                          <th className="text-center p-1 print:p-0.5">AXIS</th>
                          <th className="text-center p-1 print:p-0.5">ADD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billData.opticalData.prescriptions.map((prescription: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="font-medium p-1 print:p-0.5">{prescription.eye}</td>
                            <td className="text-center p-1 print:p-0.5">{prescription.sph || '-'}</td>
                            <td className="text-center p-1 print:p-0.5">{prescription.cyl || '-'}</td>
                            <td className="text-center p-1 print:p-0.5">{prescription.axis || '-'}</td>
                            <td className="text-center p-1 print:p-0.5">{prescription.add || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {billData.opticalData.lensType && (
                    <div className="text-xs">
                      <span className="font-medium">Lens Type:</span> {billData.opticalData.lensType}
                    </div>
                  )}
                  <div className="flex justify-between text-sm print:text-xs">
                    <span>Frames Cost</span>
                    <span className="font-medium">${billData.opticalData.framesCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm print:text-xs">
                    <span>Lenses Cost</span>
                    <span className="font-medium">${billData.opticalData.lensesCost.toFixed(2)}</span>
                  </div>
                  {billData.opticalData.remarks && (
                    <div className="text-xs text-slate-600 mt-2">
                      <span className="font-medium">Remarks:</span>
                      <div className="mt-1 leading-tight">{billData.opticalData.remarks}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator className="mb-3 print:mb-2" />

          {/* Total */}
          <div className="flex justify-between items-center text-base font-bold mb-4 print:text-sm print:mb-3 bg-slate-50 p-2 rounded">
            <span>TOTAL AMOUNT</span>
            <span>${billData.total.toFixed(2)}</span>
          </div>

          {/* Payment Status */}
          <div className="text-center mb-4 print:mb-3">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-medium">
              PAID
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-slate-600 mt-6 print:mt-4 border-t pt-3 print:pt-2">
            <p className="font-medium">Thank you for visiting EyeCare Clinic!</p>
            <p className="mt-1">For queries: (555) 123-4567</p>
            <p className="mt-2 text-xs">
              Next Follow-up: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
