import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Eye, Users, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      description: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Today's Visits",
      value: "23",
      description: "8 pending appointments",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      description: "+8% from last month",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Eye Exams",
      value: "89",
      description: "This month",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const recentVisits = [
    { patient: "John Doe", type: "Consultation", amount: "$150", time: "10:30 AM", status: "Completed" },
    { patient: "Jane Smith", type: "Medicine", amount: "$85", time: "11:15 AM", status: "In Progress" },
    { patient: "Mike Johnson", type: "Optical", amount: "$320", time: "2:00 PM", status: "Scheduled" },
    { patient: "Sarah Wilson", type: "Consultation", amount: "$150", time: "3:30 PM", status: "Scheduled" },
  ]

  const todayStats = [
    { label: "Consultations", value: 12, color: "bg-blue-500" },
    { label: "Medicine Bills", value: 8, color: "bg-green-500" },
    { label: "Optical Prescriptions", value: 3, color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here's what's happening at your clinic today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Visits
            </CardTitle>
            <CardDescription>
              Recent patient visits and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVisits.map((visit, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {visit.patient}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {visit.type} • {visit.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {visit.amount}
                    </div>
                    <Badge 
                      variant={
                        visit.status === "Completed" ? "default" :
                        visit.status === "In Progress" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {visit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visit Types Today */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Visit Types Today
            </CardTitle>
            <CardDescription>
              Breakdown of today's visit types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <span className="text-slate-700 dark:text-slate-300">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stat.color}`}
                        style={{ width: `${(stat.value / 23) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ${(12 * 150 + 8 * 85 + 3 * 320).toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Today's Total Revenue
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
