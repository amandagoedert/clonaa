// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Subscription from "./pages/Subscription";
import AdminDashboard from "./pages/AdminDashboard";
import ShopifyTemplates from "./pages/ShopifyTemplates";
import TypebotClone from "./pages/TypebotClone";
import QuizClone from "./pages/QuizClone";
import InfoproductsClone from "./pages/InfoproductsClone";
import ProductsClone from "./pages/ProductsClone";
import ProductMining from "./pages/ProductMining";
import NotFound from "./pages/NotFound";

// NOVAS IMPORTACOES
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Envolve todo o BrowserRouter com AuthProvider para que o contexto de autenticacao esteja disponivel em toda a aplicacao */}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rotas Publicas (acessiveis sem login) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/*
              Rotas Protegidas (apenas para usuarios logados)
              Todas as rotas dentro deste <Route element={<ProtectedRoute />}>
              serao protegidas. Se o usuario nao estiver autenticado,
              sera redirecionado para /login.
            */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<EditProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/shopify" element={<ShopifyTemplates />} />
              <Route path="/typebot" element={<TypebotClone />} />
              <Route path="/quiz" element={<QuizClone />} />
              <Route path="/infoprodutos" element={<InfoproductsClone />} />
              <Route path="/produtos" element={<ProductsClone />} />
              <Route path="/mining" element={<ProductMining />} />
            </Route>

            {/*
              Rota Protegida para Administrador (requer papel 'admin')
              Esta rota especifica so sera acessivel se o usuario estiver logado E tiver o papel 'admin'.
              Se nao tiver o papel 'admin', sera redirecionado para a rota padrao (neste caso, a raiz '/').
            */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Rota CATCH-ALL para 404 (sempre por ultimo) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;