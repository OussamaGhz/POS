import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import { Input } from "../ui/input";

interface MonthlyReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MonthlyReport {
  month: string;
  monthly_gains: number;
}

const MonthlyReportDialog: React.FC<MonthlyReportDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport[]>([]);
  const [filteredReport, setFilteredReport] = useState<MonthlyReport[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:8000/monthly-report")
        .then((res) => res.json())
        .then((data) => {
          setMonthlyReport(data.monthly_report);
          setFilteredReport(data.monthly_report);
        })
        .catch((error) => {
          setAlertMessage("Failed to fetch monthly report: " + error);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    let filtered = monthlyReport;
    if (filterMonth !== "all") {
      filtered = filtered.filter((report) =>
        report.month.endsWith(`-${filterMonth.padStart(2, "0")}`)
      );
    }
    if (filterYear) {
      filtered = filtered.filter((report) =>
        report.month.startsWith(filterYear)
      );
    }
    setFilteredReport(filtered);
  }, [filterMonth, filterYear, monthlyReport]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Monthly Report
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {alertMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{alertMessage}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <Select onValueChange={setFilterMonth}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  <SelectItem value="all">All Months</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              placeholder="Filter by Year"
              className="w-full sm:w-[180px]"
            />
          </div>
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHead>
                <TableRow className="flex justify-between">
                  <TableCell className="font-semibold text-primary text-center w-1/2">
                    Month
                  </TableCell>
                  <TableCell className="font-semibold text-primary text-center w-1/2">
                    Monthly Gains (DA)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReport.map((report) => (
                  <TableRow
                    key={report.month}
                    className="hover:bg-muted/50 transition-colors flex justify-between"
                  >
                    <TableCell className="text-center w-1/2">
                      {report.month}
                    </TableCell>
                    <TableCell className="text-center  w-1/2">
                      {report.monthly_gains.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredReport.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No data available for the selected filters.
            </p>
          )}
        </DialogDescription>
        <DialogFooter className="sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredReport.length} of {monthlyReport.length} reports
          </p>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyReportDialog;
