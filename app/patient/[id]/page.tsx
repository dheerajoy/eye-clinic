import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Edit, Eye, MapPin, Phone, User, DollarSign } from 'lucide-react'

// Mock data - in a real app, this would be fetched based on the ID
const mockPatient = {
  id: 1,
  fullName: "John Doe",
  age: 45,
  gender: "Male",
  mobile: "+1 (555) 123-4567",
  address: "123 Main St, City, State 12345",
  registrationDate: "2023-06-15",
  status: "Active",
}

const mockVisits = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Consultation",
    doctor: "Dr. Smith",
    diagnosis: "Regular eye examination. Vision slightly decreased in left eye.",
    amount: 150,
    status: "Completed"
  },
  {
    id: 2,
    date: "2024-01-10",
    type: "Optical Prescription",
    doctor: "Dr. Johnson",
    diagnosis: "Updated prescription for progressive lenses.",
    amount: 320,
    status: "Completed"
  },
  {
    id: 3,
    date: "2023-12-20",
    type: "Medicine",
    doctor: "Dr. Smith",
    diagnosis: "Eye drops for dry eyes condition.",
    amount: 85,
    status: "Completed"
  },
]

export default function PatientDetail({ params }: { params: { id: string } }) {
  const totalAmount = mockVisits.reduce((sum, visit) => sum + visit.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {mockPatient.fullName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Patient ID: #{mockPatient.id} • Registered: {mockPatient.registrationDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Patient
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            New Visit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="billing">Billing Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Basic demographic details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <Badge variant="default">{mockPatient.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Age</span>
                  <span className="font-medium">{mockPatient.age} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Gender</span>
                  <span className="font-medium">{mockPatient.gender}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Mobile</span>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">{mockPatient.mobile}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Address</span>
                  <div className="flex items-start gap-2 text-right">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span className="font-medium">{mockPatient.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
              <CardDescription>
                Complete timeline of patient visits and treatments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Diagnosis/Notes</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{visit.type}</Badge>
                      </TableCell>
                      <TableCell>{visit.doctor}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {visit.diagnosis}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${visit.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{visit.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${totalAmount}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  All time payments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Outstanding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  $0
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Pending payments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Visits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {mockVisits.length}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Completed visits
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Detailed breakdown of all payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{visit.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {visit.diagnosis}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${visit.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
