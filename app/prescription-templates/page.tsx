"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FileText, Plus, Edit, Trash2, Copy, Eye } from 'lucide-react'

// Mock prescription templates data
const initialTemplates = [
  {
    id: 1,
    name: "Dry Eyes Treatment",
    category: "Common Conditions",
    description: "Standard treatment for dry eye syndrome",
    medications: [
      { name: "Artificial Tears", dosage: "1-2 drops", frequency: "4 times daily", duration: "As needed" },
      { name: "Cyclosporine 0.05%", dosage: "1 drop", frequency: "Twice daily", duration: "3 months" }
    ],
    instructions: "Apply artificial tears throughout the day. Use cyclosporine drops 12 hours apart. Avoid preservative-containing drops if using more than 4 times daily.",
    followUp: "2 weeks",
    createdBy: "Dr. Smith",
    lastUsed: "2024-01-15",
    usageCount: 23
  },
  {
    id: 2,
    name: "Glaucoma Management",
    category: "Chronic Conditions",
    description: "Primary open-angle glaucoma treatment",
    medications: [
      { name: "Latanoprost 0.005%", dosage: "1 drop", frequency: "Once daily (evening)", duration: "Ongoing" },
      { name: "Timolol 0.5%", dosage: "1 drop", frequency: "Twice daily", duration: "Ongoing" }
    ],
    instructions: "Apply latanoprost in the evening. Timolol should be used 12 hours apart. Monitor for side effects including changes in iris color.",
    followUp: "1 month",
    createdBy: "Dr. Johnson",
    lastUsed: "2024-01-14",
    usageCount: 45
  },
  {
    id: 3,
    name: "Bacterial Conjunctivitis",
    category: "Infections",
    description: "Antibiotic treatment for bacterial eye infection",
    medications: [
      { name: "Tobramycin 0.3%", dosage: "1-2 drops", frequency: "Every 4 hours", duration: "7 days" },
      { name: "Erythromycin Ointment", dosage: "Small amount", frequency: "At bedtime", duration: "7 days" }
    ],
    instructions: "Clean eyes before application. Complete full course even if symptoms improve. Avoid contact lenses during treatment.",
    followUp: "1 week",
    createdBy: "Dr. Smith",
    lastUsed: "2024-01-13",
    usageCount: 18
  },
  {
    id: 4,
    name: "Allergic Conjunctivitis",
    category: "Allergies",
    description: "Treatment for seasonal allergic conjunctivitis",
    medications: [
      { name: "Olopatadine 0.1%", dosage: "1 drop", frequency: "Twice daily", duration: "As needed during allergy season" },
      { name: "Cold Compress", dosage: "10-15 minutes", frequency: "3-4 times daily", duration: "As needed" }
    ],
    instructions: "Apply drops before exposure to allergens when possible. Use cold compress for additional relief. Avoid rubbing eyes.",
    followUp: "2 weeks if symptoms persist",
    createdBy: "Dr. Wilson",
    lastUsed: "2024-01-12",
    usageCount: 31
  },
  {
    id: 5,
    name: "Post-Cataract Surgery",
    category: "Post-Operative",
    description: "Standard post-operative care after cataract surgery",
    medications: [
      { name: "Prednisolone 1%", dosage: "1 drop", frequency: "4 times daily", duration: "4 weeks (tapering)" },
      { name: "Moxifloxacin 0.5%", dosage: "1 drop", frequency: "4 times daily", duration: "1 week" }
    ],
    instructions: "Start drops day after surgery. Taper prednisolone weekly. Avoid getting water in eye for 1 week. No heavy lifting for 2 weeks.",
    followUp: "1 day, 1 week, 1 month",
    createdBy: "Dr. Johnson",
    lastUsed: "2024-01-11",
    usageCount: 67
  }
]

export default function PrescriptionTemplates() {
  const { toast } = useToast()
  const [templates, setTemplates] = useState(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Common Conditions", "Chronic Conditions", "Infections", "Allergies", "Post-Operative"]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (template: any) => {
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to the prescription form.`,
    })
    // In a real app, this would populate the prescription form
  }

  const handleDuplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastUsed: new Date().toISOString().split('T')[0]
    }
    setTemplates([...templates, newTemplate])
    toast({
      title: "Template Duplicated",
      description: `${template.name} has been duplicated successfully.`,
    })
  }

  const handleDeleteTemplate = (templateId: number) => {
    setTemplates(templates.filter(t => t.id !== templateId))
    toast({
      title: "Template Deleted",
      description: "The prescription template has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Prescription Templates
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage reusable prescription templates for common treatments
            </p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a reusable prescription template for common treatments
              </DialogDescription>
            </DialogHeader>
            <TemplateForm onSave={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {template.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Medications Preview */}
              <div>
                <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-2">
                  Medications ({template.medications.length})
                </h4>
                <div className="space-y-1">
                  {template.medications.slice(0, 2).map((med, index) => (
                    <div key={index} className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium">{med.name}</span> - {med.dosage} {med.frequency}
                    </div>
                  ))}
                  {template.medications.length > 2 && (
                    <div className="text-sm text-slate-500">
                      +{template.medications.length - 2} more medications
                    </div>
                  )}
                </div>
              </div>

              {/* Usage Stats */}
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Used {template.usageCount} times</span>
                <span>Last used: {template.lastUsed}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleUseTemplate(template)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Use
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{template.name}</DialogTitle>
                      <DialogDescription>{template.description}</DialogDescription>
                    </DialogHeader>
                    <TemplatePreview template={template} />
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(template)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No templates found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search criteria or create a new template.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Modify the prescription template details
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <TemplateForm 
              template={selectedTemplate}
              onSave={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TemplateForm({ template, onSave }: { template?: any, onSave: () => void }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: template?.name || "",
    category: template?.category || "",
    description: template?.description || "",
    medications: template?.medications || [{ name: "", dosage: "", frequency: "", duration: "" }],
    instructions: template?.instructions || "",
    followUp: template?.followUp || ""
  })

  const handleAddMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "", duration: "" }]
    }))
  }

  const handleRemoveMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }))
  }

  const handleMedicationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: template ? "Template Updated" : "Template Created",
      description: `${formData.name} has been ${template ? 'updated' : 'created'} successfully.`,
    })
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Template Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Dry Eyes Treatment"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Common Conditions">Common Conditions</SelectItem>
              <SelectItem value="Chronic Conditions">Chronic Conditions</SelectItem>
              <SelectItem value="Infections">Infections</SelectItem>
              <SelectItem value="Allergies">Allergies</SelectItem>
              <SelectItem value="Post-Operative">Post-Operative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the treatment"
          rows={2}
        />
      </div>

      {/* Medications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Medications</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
            <Plus className="h-4 w-4 mr-1" />
            Add Medication
          </Button>
        </div>
        
        {formData.medications.map((medication, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Medication Name *</Label>
                <Input
                  value={medication.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  placeholder="e.g., Artificial Tears"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Dosage *</Label>
                <Input
                  value={medication.dosage}
                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                  placeholder="e.g., 1-2 drops"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Frequency *</Label>
                <Input
                  value={medication.frequency}
                  onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                  placeholder="e.g., 4 times daily"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={medication.duration}
                  onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                  placeholder="e.g., 2 weeks"
                />
              </div>
            </div>
            
            {formData.medications.length > 1 && (
              <div className="flex justify-end mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemoveMedication(index)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          value={formData.instructions}
          onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
          placeholder="Detailed instructions for the patient"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="followUp">Follow-up</Label>
        <Input
          id="followUp"
          value={formData.followUp}
          onChange={(e) => setFormData(prev => ({ ...prev, followUp: e.target.value }))}
          placeholder="e.g., 2 weeks"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">
          {template ? 'Update Template' : 'Create Template'}
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onSave}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function TemplatePreview({ template }: { template: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-slate-600 dark:text-slate-400">Category:</span>
          <div className="mt-1">
            <Badge variant="outline">{template.category}</Badge>
          </div>
        </div>
        <div>
          <span className="font-medium text-slate-600 dark:text-slate-400">Follow-up:</span>
          <div className="mt-1">{template.followUp}</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Medications</h4>
        <div className="space-y-3">
          {template.medications.map((med: any, index: number) => (
            <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
              <div className="font-medium text-slate-900 dark:text-slate-100">{med.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                <span className="font-medium">Dosage:</span> {med.dosage} • 
                <span className="font-medium ml-2">Frequency:</span> {med.frequency}
                {med.duration && (
                  <>
                    • <span className="font-medium ml-2">Duration:</span> {med.duration}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {template.instructions && (
        <div>
          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Instructions</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {template.instructions}
          </p>
        </div>
      )}

      <div className="text-xs text-slate-500 dark:text-slate-400 pt-4 border-t">
        Created by {template.createdBy} • Used {template.usageCount} times • Last used: {template.lastUsed}
      </div>
    </div>
  )
}
