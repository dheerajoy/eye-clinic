"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, Phone, MapPin } from 'lucide-react'
import Link from "next/link"

// Mock data - in a real app, this would come from your database
const mockPatients = [
  {
    id: 1,
    fullName: "John Doe",
    age: 45,
    gender: "Male",
    mobile: "+1 (555) 123-4567",
    address: "123 Main St, City, State",
    lastVisit: "2024-01-15",
    totalVisits: 5,
    status: "Active",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    age: 32,
    gender: "Female",
    mobile: "+1 (555) 987-6543",
    address: "456 Oak Ave, City, State",
    lastVisit: "2024-01-14",
    totalVisits: 3,
    status: "Active",
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    age: 67,
    gender: "Male",
    mobile: "+1 (555) 456-7890",
    address: "789 Pine Rd, City, State",
    lastVisit: "2024-01-13",
    totalVisits: 8,
    status: "Follow-up",
  },
  {
    id: 4,
    fullName: "Sarah Wilson",
    age: 28,
    gender: "Female",
    mobile: "+1 (555) 321-0987",
    address: "321 Elm St, City, State",
    lastVisit: "2024-01-12",
    totalVisits: 2,
    status: "Active",
  },
]

export default function SearchPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(mockPatients)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredPatients(mockPatients)
      return
    }

    const filtered = mockPatients.filter(patient =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobile.includes(searchTerm)
    )
    setFilteredPatients(filtered)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <Search className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Search Patients
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find patients by name or mobile number
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Search</CardTitle>
          <CardDescription>
            Enter patient name or mobile number to search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Search by name or mobile number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Found {filteredPatients.length} patient(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No patients found matching your search criteria.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.fullName}
                      </TableCell>
                      <TableCell>
                        {patient.age} • {patient.gender}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {patient.mobile}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin className="h-3 w-3" />
                            {patient.address.split(',')[0]}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{patient.lastVisit}</div>
                          <div className="text-slate-600 dark:text-slate-400">
                            {patient.totalVisits} total visits
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={patient.status === "Active" ? "default" : "secondary"}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/patient/${patient.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
