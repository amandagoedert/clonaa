// src/components/AppSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Home,
  ShoppingBag,
  Bot,
  HelpCircle,
  Package,
  Copy,
  Search,
  Users // Importar icone para Dashboard Administrativo
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from '@/contexts/AuthContext'; // Importar useAuth

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    requiresAdmin: false, // Adicionar propriedade para controle de acesso
  },
  {
    title: "Templates Shopify",
    url: "/shopify",
    icon: ShoppingBag,
    requiresAdmin: false,
  },
  {
    title: "Clonagem Typebot",
    url: "/typebot",
    icon: Bot,
    requiresAdmin: false,
  },
  {
    title: "Clonagem Quiz",
    url: "/quiz",
    icon: HelpCircle,
    requiresAdmin: false,
  },
  {
    title: "Clonagem Infoprodutos",
    url: "/infoprodutos",
    icon: Package,
    requiresAdmin: false,
  },
  {
    title: "Clonagem Produtos",
    url: "/produtos",
    icon: Copy,
    requiresAdmin: false,
  },
  {
    title: "Mineração Produtos",
    url: "/mining",
    icon: Search,
    requiresAdmin: false,
  },
  { // NOVO ITEM: Dashboard Administrativo, visivel apenas para admin
    title: "Dashboard Administrativo",
    url: "/admin",
    icon: Users,
    requiresAdmin: true, // Este item requer papel de admin
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { isAdmin } = useAuth(); // Obtenha o estado 'isAdmin' do contexto

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-primary mb-4">
            Clonaa
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                // Condicionalmente renderiza o item baseado em 'requiresAdmin' e 'isAdmin'
                (!item.requiresAdmin || isAdmin) && (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}