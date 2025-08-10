"use client"

import { Calendar, Eye, FileText, Home, Search, UserPlus, Users } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Register Patient",
    url: "/register-patient",
    icon: UserPlus,
  },
  {
    title: "New Visit",
    url: "/new-visit",
    icon: Calendar,
  },
  {
    title: "Search Patients",
    url: "/search-patients",
    icon: Search,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    disabled: true,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
            <Eye className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              EyeCare Clinic
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Patient Management
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Link href={item.disabled ? "#" : item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.disabled && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Soon
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          © 2024 EyeCare Clinic
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
