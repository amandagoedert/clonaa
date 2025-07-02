import { Star, Eye, BarChart3, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClonedProduct } from "@/api/products"

interface WinningProductCardProps {
  product: ClonedProduct
  onView: (product: ClonedProduct) => void
  onAnalyze: (product: ClonedProduct) => void
  onTarget: (product: ClonedProduct) => void
}

export const WinningProductCard = ({ 
  product, 
  onView, 
  onAnalyze, 
  onTarget 
}: WinningProductCardProps) => {
  return (
    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.marketplace}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-lg font-bold text-green-600">{product.price}</span>
            <span className="text-sm text-muted-foreground">{product.sales} vendas</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {product.trend}
            </Badge>
            <Badge variant={product.competition === 'Baixa' ? 'default' : product.competition === 'Media' ? 'secondary' : 'destructive'}>
              Concorrencia {product.competition}
            </Badge>
            <Badge variant={product.profit === 'Alto' ? 'default' : 'secondary'}>
              ROI Estimado {product.profit}
            </Badge>
          </div>
          {product.adPlatform && product.adClicks && product.cpa && (
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>Plataforma: {product.adPlatform}</span>
              <span>Cliques: {product.adClicks.toLocaleString()}</span>
              <span>CPA: {product.cpa}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onView(product)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onAnalyze(product)}>
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => onTarget(product)}>
            <Target className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
