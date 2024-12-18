"use client";

import {
  faRocket,
  faUsers,
  faChartLine,
  faCreditCard,
  faChartBar,
  faCog,
  faUserPlus,
  faFileInvoiceDollar,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "../shared/Section";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface DashboardData {
  totalCustomers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  mrr: number;
  churnRate: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [amount, setAmount] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");

  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  // Fetch stripe dashboard data
  const {
    data: dashboardData,
    error: dashboardError,
    mutate: mutateDashboard,
  } = useSWR<DashboardData>("/api/stripe/admin", fetcher);

  const {
    data: customers,
    error: customersError,
    mutate: mutateCustomers,
  } = useSWR<{ customers: Array<{ id: string; email: string }> }>(
    "/api/stripe/customers",
    fetcher
  );

  if (dashboardError) {
    toast.error("Failed to fetch dashboard data");
  }

  if (customersError) {
    toast.error("Failed to fetch customers");
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
  };

  const handleGenerateInvoice = () => {
    setIsInvoiceModalOpen(true);
  };

  const generateInvoice = async () => {
    if (!selectedCustomerId) {
      toast.error("Please select a customer");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    setIsGeneratingInvoice(true);
    try {
      const response = await fetch("/api/stripe/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: selectedCustomerId,
          amount: parseFloat(amount.toString()),
          dueDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate invoice");
      }
      const { invoiceUrl } = await response.json();
      window.open(invoiceUrl, "_blank");
      setIsInvoiceModalOpen(false);
      setAmount("");
      setDueDate("");
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice. Please try again.");
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
  };

  const addCustomer = async () => {
    if (!newCustomerEmail) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsAddingCustomer(true);
    try {
      const response = await fetch("/api/stripe/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newCustomerEmail }),
      });
      if (!response.ok) {
        throw new Error("Failed to add customer");
      }
      const { customerId } = await response.json();
      toast.success("Customer added successfully");
      setIsAddCustomerModalOpen(false);
      setNewCustomerEmail("");
      mutateCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer. Please try again.");
    } finally {
      setIsAddingCustomer(false);
    }
  };

  return (
    <Section
      title="FireSaaS Dashboard"
      subtitle="Welcome to your all-in-one SaaS management platform!"
      icon={faRocket}
      mockup={true}
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatNumber(dashboardData?.totalCustomers || 0)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faChartLine} size="2x" className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">
                    ${formatNumber(dashboardData?.totalRevenue || 0)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faCreditCard} size="2x" className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatNumber(dashboardData?.activeSubscriptions || 0)}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartBar} className="text-primary" />
                Key Metrics
              </CardTitle>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">MRR:</span> $
                  {formatNumber(dashboardData?.mrr || 0)}
                </li>
                <li>
                  <span className="font-semibold">Churn Rate:</span>{" "}
                  {formatNumber(dashboardData?.churnRate || 0)}%
                </li>
                <li>
                  <span className="font-semibold">ARPU:</span> $
                  {(
                    (dashboardData?.mrr || 0) /
                    (dashboardData?.activeSubscriptions || 1)
                  ).toFixed(2)}
                </li>
              </ul>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCog} className="text-primary" />
                Quick Actions
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAddCustomer}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  Add Customer
                </Button>
                <Button variant="secondary" onClick={handleGenerateInvoice}>
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                  Generate Invoice
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <dialog
        id="invoice_modal"
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${
          isInvoiceModalOpen ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Generate Invoice</CardTitle>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Customer</label>
                <select
                  value={selectedCustomerId || ""}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select a customer</option>
                  {customers?.customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Invoice Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={generateInvoice}
                  disabled={isGeneratingInvoice}
                >
                  {isGeneratingInvoice ? "Generating..." : "Generate Invoice"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsInvoiceModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </dialog>

      <dialog
        id="add_customer_modal"
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${
          isAddCustomerModalOpen ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Add New Customer</CardTitle>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Email</label>
                <input
                  type="email"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                  placeholder="Enter customer email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={addCustomer}
                  disabled={isAddingCustomer}
                >
                  {isAddingCustomer ? "Adding..." : "Add Customer"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddCustomerModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </dialog>
    </Section>
  );
}
