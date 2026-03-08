import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
  url?: string;
}

interface SmartSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  className?: string;
}

const SmartSearch = ({ 
  placeholder = "Search...", 
  onSearch,
  onSelect,
  className 
}: SmartSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('flowbills_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const searchDatabase = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchTerm = `%${searchQuery}%`;

      // Search invoices, AFEs, and UWIs in parallel
      const [invoicesRes, afesRes, uwisRes] = await Promise.all([
        supabase
          .from('invoices')
          .select('id, invoice_number, vendor_name, amount, status')
          .or(`invoice_number.ilike.${searchTerm},vendor_name.ilike.${searchTerm}`)
          .limit(5),
        supabase
          .from('afes')
          .select('id, afe_number, well_name, budget_amount, status')
          .or(`afe_number.ilike.${searchTerm},well_name.ilike.${searchTerm}`)
          .limit(3),
        supabase
          .from('uwis')
          .select('id, uwi, well_name, operator, status')
          .or(`uwi.ilike.${searchTerm},well_name.ilike.${searchTerm}`)
          .limit(3),
      ]);

      const searchResults: SearchResult[] = [];

      if (invoicesRes.data) {
        for (const inv of invoicesRes.data) {
          searchResults.push({
            id: inv.id,
            title: `Invoice ${inv.invoice_number}`,
            type: 'Invoice',
            description: `${inv.vendor_name} — $${Number(inv.amount).toLocaleString()} — ${inv.status}`,
            url: '/invoices',
          });
        }
      }

      if (afesRes.data) {
        for (const afe of afesRes.data) {
          searchResults.push({
            id: afe.id,
            title: `AFE ${afe.afe_number}`,
            type: 'AFE',
            description: `${afe.well_name || 'No well'} — Budget: $${Number(afe.budget_amount).toLocaleString()}`,
            url: '/afe-management',
          });
        }
      }

      if (uwisRes.data) {
        for (const uwi of uwisRes.data) {
          searchResults.push({
            id: uwi.id,
            title: `UWI ${uwi.uwi}`,
            type: 'Well',
            description: `${uwi.well_name || uwi.operator || 'Unknown'} — ${uwi.status}`,
            url: '/uwi-registry',
          });
        }
      }

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const timer = setTimeout(() => {
        searchDatabase(query);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      if (query.length === 0) setIsOpen(false);
    }
  }, [query, searchDatabase]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery).slice(0, 4)];
      setRecentSearches(updated);
      try { localStorage.setItem('flowbills_recent_searches', JSON.stringify(updated)); } catch {}
      setIsOpen(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result);
    setQuery(result.title);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(query);
            if (e.key === "Escape") setIsOpen(false);
          }}
          placeholder={placeholder}
          className="pl-10 pr-10"
          aria-label="Smart search"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 animate-fade-in">
          {loading && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Searching...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Search Results
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground group-hover:text-accent-foreground">
                        {result.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.description}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {result.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && query.length <= 1 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    handleSearch(search);
                  }}
                  className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {!loading && query.length > 1 && results.length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
