"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search } from 'lucide-react'

interface PrescriptionTemplate {
  id: number
  name: string
  category: string
  description: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
  }>
  instructions: string
  followUp: string
}

interface PrescriptionTemplateSelectorProps {
  templates: PrescriptionTemplate[]
  onTemplateSelect: (template: PrescriptionTemplate) => void
  selectedTemplate?: PrescriptionTemplate | null
  onClearTemplate?: () => void
}

export function PrescriptionTemplateSelector({ 
  templates, 
  onTemplateSelect, 
  selectedTemplate,
  onClearTemplate 
}: PrescriptionTemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleTemplateSelect = (template: PrescriptionTemplate) => {
    onTemplateSelect(template)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Use Template
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Select Prescription Template</DialogTitle>
            <DialogDescription>
              Choose a template to quickly fill the prescription field
            </DialogDescription>
          </DialogHeader>
          
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
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

          {/* Templates List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No templates found matching your criteria.</p>
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {template.name}
                    </h4>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {template.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Medications ({template.medications.length}):
                    </div>
                    {template.medications.slice(0, 2).map((med, index) => (
                      <div key={index} className="text-xs text-slate-600 dark:text-slate-400">
                        • {med.name} - {med.dosage} {med.frequency}
                      </div>
                    ))}
                    {template.medications.length > 2 && (
                      <div className="text-xs text-slate-500">
                        +{template.medications.length - 2} more medications
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {selectedTemplate && onClearTemplate && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={onClearTemplate}
        >
          Clear Template
        </Button>
      )}
    </div>
  )
}
