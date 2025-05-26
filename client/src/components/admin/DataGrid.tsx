import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Search, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Column {
  name: string;
  label: string;
  type: string;
}

interface DataGridProps {
  data: any[];
  columns: Column[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
  modelName: string;
}

export default function DataGrid({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onCreate, 
  modelName 
}: DataGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      onDelete(id);
      toast({
        title: "Success",
        description: "Record deleted successfully",
      });
    }
  };

  const formatValue = (value: any, type: string) => {
    if (value === null || value === undefined) return '';
    
    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return value.toString();
    }
  };

  const getStatusColor = (value: string, column: string) => {
    if (column === 'role') {
      switch (value.toLowerCase()) {
        case 'admin':
          return 'bg-emerald-100 text-emerald-800';
        case 'editor':
          return 'bg-blue-100 text-blue-800';
        case 'viewer':
          return 'bg-slate-100 text-slate-800';
        default:
          return 'bg-slate-100 text-slate-800';
      }
    }
    
    if (column === 'status') {
      switch (value.toLowerCase()) {
        case 'active':
        case 'completed':
          return 'bg-emerald-100 text-emerald-800';
        case 'pending':
          return 'bg-amber-100 text-amber-800';
        case 'inactive':
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-slate-100 text-slate-800';
      }
    }
    
    return '';
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 capitalize">
              {modelName}
            </h2>
            <p className="text-sm text-slate-500">
              Manage {modelName.toLowerCase()} and their properties
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Button onClick={onCreate} className="bg-primary hover:bg-primary/90">
              <span className="mr-2">+</span>
              New {modelName.slice(0, -1)}
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 border-t-0">
        {/* Table Controls */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Show</span>
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-slate-600">entries</span>
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
            
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} results
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {columns.map((column) => (
                  <th key={column.name} className="px-6 py-3 text-left">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {column.label}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                  {columns.map((column) => (
                    <td key={column.name} className="px-6 py-4 whitespace-nowrap">
                      {column.name === 'name' && modelName === 'users' ? (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary font-medium text-sm">
                              {item[column.name]?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-slate-900">
                            {formatValue(item[column.name], column.type)}
                          </span>
                        </div>
                      ) : (column.name === 'role' || column.name === 'status') ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item[column.name], column.name)}`}>
                          {formatValue(item[column.name], column.type)}
                        </span>
                      ) : (
                        <span className={`text-sm ${column.name === 'id' ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                          {formatValue(item[column.name], column.type)}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="text-primary hover:text-primary/90"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-primary text-white" : ""}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
