import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, Calendar, DollarSign } from 'lucide-react'

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <FileText className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Analytics and reporting dashboard
          </p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="text-center py-12">
        <CardContent>
          <div className="max-w-md mx-auto space-y-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto">
              <TrendingUp className="h-12 w-12 text-purple-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Reports Coming Soon
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We're working on comprehensive reporting features including:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Visit Analytics
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Track patient visits and appointment trends
                </p>
              </div>
              
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Revenue Reports
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Financial summaries and billing analytics
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="mt-4">
              Feature in Development
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
