"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Database,
  DollarSign,
  FileText,
  Gauge,
  MapPin,
  PackageSearch,
  Phone,
  Search,
  Smartphone,
  Table2,
  TrendingUp,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataTab = "jobs" | "customers" | "technicians" | "invoices";
type CategoryFilter = "All" | "Phone" | "Laptop" | "Console" | "Tablet" | "TV";

type SelectedJob = {
  id: string;
  customer: string;
  device: string;
  category: string;
  repair: string;
  status: string;
  technician: string;
  dropOff: string;
  estimate: string;
  amount: number;
};

const monthlyPerformance = [
  { month: "Jan", revenue: 18200, profit: 7200, jobs: 82 },
  { month: "Feb", revenue: 20500, profit: 8500, jobs: 91 },
  { month: "Mar", revenue: 23100, profit: 9800, jobs: 104 },
  { month: "Apr", revenue: 21900, profit: 9100, jobs: 97 },
  { month: "May", revenue: 26400, profit: 11600, jobs: 121 },
  { month: "Jun", revenue: 29100, profit: 13100, jobs: 134 },
  { month: "Jul", revenue: 31600, profit: 14500, jobs: 142 },
  { month: "Aug", revenue: 33800, profit: 15800, jobs: 151 },
  { month: "Sep", revenue: 32100, profit: 14900, jobs: 146 },
  { month: "Oct", revenue: 35600, profit: 16900, jobs: 162 },
  { month: "Nov", revenue: 37400, profit: 18100, jobs: 171 },
  { month: "Dec", revenue: 40100, profit: 19800, jobs: 184 },
];

const categoryRevenue = [
  { category: "Phone", label: "Phone Repair", revenue: 103200, margin: 42 },
  { category: "Laptop", label: "Laptop Repair", revenue: 95800, margin: 38 },
  { category: "Console", label: "Console Repair", revenue: 52400, margin: 46 },
  { category: "Tablet", label: "Tablet Repair", revenue: 38100, margin: 35 },
  { category: "TV", label: "TV Repair", revenue: 32600, margin: 31 },
  {
    category: "Other",
    label: "Other Electronics",
    revenue: 28400,
    margin: 29,
  },
];

const jobStatus = [
  { name: "Completed", value: 72 },
  { name: "In Progress", value: 14 },
  { name: "Waiting Parts", value: 10 },
  { name: "Cancelled", value: 4 },
];

const leadSources = [
  { source: "Google Search", customers: 318, conversion: 18 },
  { source: "Referral", customers: 264, conversion: 27 },
  { source: "Walk-in", customers: 211, conversion: 22 },
  { source: "Website", customers: 156, conversion: 15 },
  { source: "Instagram", customers: 109, conversion: 11 },
  { source: "Facebook", customers: 96, conversion: 9 },
];

const repairJobs: SelectedJob[] = [
  {
    id: "RO-1042",
    customer: "Marcus Reed",
    device: "iPhone 14 Pro",
    category: "Phone",
    repair: "Screen replacement",
    status: "Completed",
    technician: "A. Singh",
    dropOff: "2026-04-02",
    estimate: "2026-04-03",
    amount: 249,
  },
  {
    id: "RO-1043",
    customer: "Lena Brooks",
    device: "Dell XPS 13",
    category: "Laptop",
    repair: "Battery replacement",
    status: "In Progress",
    technician: "M. Carter",
    dropOff: "2026-04-03",
    estimate: "2026-04-05",
    amount: 319,
  },
  {
    id: "RO-1044",
    customer: "Jordan Carter",
    device: "PlayStation 5",
    category: "Console",
    repair: "HDMI port repair",
    status: "Waiting Parts",
    technician: "J. Rivera",
    dropOff: "2026-04-04",
    estimate: "2026-04-09",
    amount: 189,
  },
  {
    id: "RO-1045",
    customer: "Avery Singh",
    device: "Samsung Galaxy Tab S9",
    category: "Tablet",
    repair: "Charging port repair",
    status: "Completed",
    technician: "A. Singh",
    dropOff: "2026-04-05",
    estimate: "2026-04-06",
    amount: 169,
  },
  {
    id: "RO-1046",
    customer: "Nora Brooks",
    device: "LG OLED TV",
    category: "TV",
    repair: "Power board replacement",
    status: "In Progress",
    technician: "N. Brooks",
    dropOff: "2026-04-06",
    estimate: "2026-04-10",
    amount: 420,
  },
  {
    id: "RO-1047",
    customer: "Ethan Miller",
    device: "MacBook Air M2",
    category: "Laptop",
    repair: "Keyboard replacement",
    status: "Completed",
    technician: "M. Carter",
    dropOff: "2026-04-07",
    estimate: "2026-04-08",
    amount: 379,
  },
  {
    id: "RO-1048",
    customer: "Maya Johnson",
    device: "Nintendo Switch",
    category: "Console",
    repair: "Joy-Con rail repair",
    status: "Cancelled",
    technician: "J. Rivera",
    dropOff: "2026-04-08",
    estimate: "2026-04-11",
    amount: 95,
  },
];

const customers = [
  {
    id: "CU-301",
    name: "Marcus Reed",
    phone: "215-555-0142",
    email: "marcus.reed@example.com",
    address: "123 Market Street, Philadelphia, PA",
    type: "Returning",
    totalSpend: 1260,
    lastVisit: "2026-04-02",
  },
  {
    id: "CU-302",
    name: "Lena Brooks",
    phone: "215-555-0188",
    email: "lena.brooks@example.com",
    address: "220 Walnut Street, Philadelphia, PA",
    type: "New",
    totalSpend: 319,
    lastVisit: "2026-04-03",
  },
  {
    id: "CU-303",
    name: "Jordan Carter",
    phone: "267-555-0173",
    email: "jordan.carter@example.com",
    address: "48 North 3rd Street, Camden, NJ",
    type: "Returning",
    totalSpend: 835,
    lastVisit: "2026-04-04",
  },
  {
    id: "CU-304",
    name: "Avery Singh",
    phone: "215-555-0199",
    email: "avery.singh@example.com",
    address: "915 Spring Garden Street, Philadelphia, PA",
    type: "New",
    totalSpend: 169,
    lastVisit: "2026-04-05",
  },
  {
    id: "CU-305",
    name: "Nora Brooks",
    phone: "856-555-0117",
    email: "nora.brooks@example.com",
    address: "72 Cooper Street, Camden, NJ",
    type: "Returning",
    totalSpend: 2240,
    lastVisit: "2026-04-06",
  },
];

const technicians = [
  {
    name: "M. Carter",
    phone: "215-555-0104",
    specialty: "Laptop Repair",
    completed: 238,
    avgTime: "1.7 days",
    rating: 4.9,
    revenue: 71400,
  },
  {
    name: "A. Singh",
    phone: "215-555-0131",
    specialty: "Phone & Tablet Repair",
    completed: 276,
    avgTime: "1.2 days",
    rating: 4.8,
    revenue: 68900,
  },
  {
    name: "J. Rivera",
    phone: "267-555-0191",
    specialty: "Console Repair",
    completed: 151,
    avgTime: "2.1 days",
    rating: 4.7,
    revenue: 46200,
  },
  {
    name: "N. Brooks",
    phone: "856-555-0152",
    specialty: "TV Repair",
    completed: 97,
    avgTime: "2.8 days",
    rating: 4.6,
    revenue: 33500,
  },
];

const invoices = [
  {
    id: "INV-8801",
    customer: "Marcus Reed",
    service: "Screen replacement",
    amount: 249,
    partsCost: 72,
    laborCost: 55,
    profit: 122,
    status: "Paid",
  },
  {
    id: "INV-8802",
    customer: "Lena Brooks",
    service: "Battery replacement",
    amount: 319,
    partsCost: 118,
    laborCost: 70,
    profit: 131,
    status: "Pending",
  },
  {
    id: "INV-8803",
    customer: "Jordan Carter",
    service: "HDMI port repair",
    amount: 189,
    partsCost: 49,
    laborCost: 60,
    profit: 80,
    status: "Pending",
  },
  {
    id: "INV-8804",
    customer: "Avery Singh",
    service: "Charging port repair",
    amount: 169,
    partsCost: 36,
    laborCost: 55,
    profit: 78,
    status: "Paid",
  },
  {
    id: "INV-8805",
    customer: "Nora Brooks",
    service: "Power board replacement",
    amount: 420,
    partsCost: 165,
    laborCost: 90,
    profit: 165,
    status: "Paid",
  },
];

const insights = [
  {
    title: "Promote console repairs",
    detail:
      "Console repairs have the strongest margin profile and should be promoted with seasonal gaming bundles.",
  },
  {
    title: "Reduce parts delays",
    detail:
      "Waiting-for-parts jobs are the clearest operational bottleneck and should be tracked as a separate workflow.",
  },
  {
    title: "Prioritize referrals",
    detail:
      "Referral customers convert at the highest rate, making referral incentives a high-value growth channel.",
  },
  {
    title: "Protect laptop repair quality",
    detail:
      "Laptop repairs generate high revenue, but longer completion times may affect customer satisfaction.",
  },
];

const kpis = [
  {
    label: "Total Revenue",
    value: "$337.8K",
    change: "+18.4%",
    icon: DollarSign,
    detail:
      "Total repair revenue across all service categories during the current 12-month demo period.",
  },
  {
    label: "Net Profit",
    value: "$159.3K",
    change: "+21.7%",
    icon: TrendingUp,
    detail:
      "Estimated net profit after parts and labor costs. Strongest gains came from phone and console repairs.",
  },
  {
    label: "Completed Repairs",
    value: "1,585",
    change: "+14.2%",
    icon: Wrench,
    detail:
      "Completed repair jobs across phones, laptops, consoles, tablets, TVs, and other electronics.",
  },
  {
    label: "Average Repair Value",
    value: "$213",
    change: "+6.8%",
    icon: Gauge,
    detail:
      "Average amount earned per repair job. Laptop and TV jobs raise the average order value.",
  },
  {
    label: "Return Rate",
    value: "34%",
    change: "+4.1%",
    icon: Users,
    detail:
      "Estimated percentage of customers returning for another service within the dashboard period.",
  },
  {
    label: "Open Jobs",
    value: "42",
    change: "-8.5%",
    icon: Clock3,
    detail:
      "Current active repair queue. A lower open-job count suggests faster job completion.",
  },
];

const pieColors = ["#10b981", "#f59e0b", "#64748b", "#ef4444"];

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

function formatTooltipCurrency(value: unknown) {
  if (typeof value === "number") {
    return formatCurrency(value);
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : formatCurrency(parsed);
  }

  return "";
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    "In Progress":
      "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
    "Waiting Parts":
      "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    Cancelled: "bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-300",
    Paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-zinc-300"
      }`}
    >
      {status}
    </span>
  );
}

function ChartShell({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`${className} w-full min-w-0`}>
      {ready ? (
        children
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-stone-50 text-sm text-stone-500 dark:bg-zinc-950/60 dark:text-zinc-400">
          Loading chart...
        </div>
      )}
    </div>
  );
}

function JobDetailModal({
  job,
  onClose,
}: {
  job: SelectedJob;
  onClose: () => void;
}) {
  const estimatedParts = Math.round(job.amount * 0.32);
  const estimatedLabor = Math.round(job.amount * 0.24);
  const estimatedProfit = Math.round(job.amount * 0.44);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stone-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-stone-200 p-6 dark:border-zinc-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Repair Job Detail
              </p>
              <h2 className="mt-2 text-3xl font-black">{job.id}</h2>
              <p className="mt-2 text-stone-600 dark:text-zinc-400">
                {job.device} • {job.repair}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close repair job detail"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-bold text-stone-500 dark:text-zinc-400">
              Customer
            </p>
            <h3 className="mt-2 text-xl font-bold">{job.customer}</h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-zinc-300">
              Example contact: 215-555-0142
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-zinc-300">
              Example address: 123 Market Street, Philadelphia, PA
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-bold text-stone-500 dark:text-zinc-400">
              Job Status
            </p>
            <div className="mt-3">
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-4 text-sm text-stone-600 dark:text-zinc-300">
              Assigned technician:{" "}
              <span className="font-bold">{job.technician}</span>
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-bold text-stone-500 dark:text-zinc-400">
              Device & Repair
            </p>
            <h3 className="mt-2 text-lg font-bold">{job.device}</h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-zinc-300">
              Category: {job.category}
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-zinc-300">
              Repair type: {job.repair}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-bold text-stone-500 dark:text-zinc-400">
              Cost Breakdown
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-stone-600 dark:text-zinc-300">
                  Customer charge
                </span>
                <span className="font-bold">{formatCurrency(job.amount)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-600 dark:text-zinc-300">
                  Estimated parts
                </span>
                <span>{formatCurrency(estimatedParts)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-600 dark:text-zinc-300">
                  Estimated labor
                </span>
                <span>{formatCurrency(estimatedLabor)}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 dark:border-zinc-800">
                <div className="flex justify-between gap-4">
                  <span className="font-bold">Estimated profit</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(estimatedProfit)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-900 md:col-span-2">
            <p className="text-sm font-bold text-stone-500 dark:text-zinc-400">
              Timeline
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-stone-500 dark:text-zinc-500">
                  Drop-off
                </p>
                <p className="mt-1 font-bold">{job.dropOff}</p>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-stone-500 dark:text-zinc-500">
                  Estimate
                </p>
                <p className="mt-1 font-bold">{job.estimate}</p>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-zinc-950">
                <p className="text-xs font-bold uppercase text-stone-500 dark:text-zinc-500">
                  Follow-up
                </p>
                <p className="mt-1 font-bold">Within 48 hours</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200 md:col-span-2">
            <p className="text-sm font-bold">Internal Notes</p>
            <p className="mt-2 text-sm leading-6">
              Demo note: customer should be notified if parts are delayed. If
              this were connected to a backend, this panel could show technician
              notes, uploaded device photos, invoice history, repair timeline
              events, and customer communication logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<DataTab>("jobs");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [activeKpi, setActiveKpi] = useState(kpis[0]);
  const [selectedJob, setSelectedJob] = useState<SelectedJob | null>(null);

  const filteredCategoryRevenue = useMemo(() => {
    if (category === "All") return categoryRevenue;
    return categoryRevenue.filter((item) => item.category === category);
  }, [category]);

  const filteredJobs = useMemo(() => {
    if (category === "All") return repairJobs;
    return repairJobs.filter((job) => job.category === category);
  }, [category]);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="border-b border-stone-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-700/20">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                RepairOps
              </p>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Intelligence Dashboard
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <span className="text-stone-500 dark:text-zinc-400">
                Demo business:
              </span>{" "}
              <span className="font-bold">FixRight Repairs</span>
            </div>
            <a
              href="https://itonga.dev"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-100"
            >
              Built by Itonga
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-6">
              This dashboard uses fictional demo data created for portfolio and
              product demonstration purposes. Names, addresses, phone numbers,
              jobs, invoices, and business records are mock examples.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-4 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-6 lg:px-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const selected = activeKpi.label === kpi.label;

          return (
            <button
              key={kpi.label}
              type="button"
              onClick={() => setActiveKpi(kpi)}
              className={`rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${
                selected
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-400/50 dark:bg-emerald-400/10"
                  : "border-stone-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  {kpi.change}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <p className="mt-5 text-sm text-stone-500 dark:text-zinc-400">
                {kpi.label}
              </p>
              <p className="mt-1 text-2xl font-black">{kpi.value}</p>
            </button>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-6 lg:grid-cols-[1fr_0.45fr] lg:px-8">
        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-3">
            <BriefcaseBusiness className="mt-1 h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Selected KPI
              </p>
              <h2 className="mt-1 text-2xl font-bold">{activeKpi.label}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-stone-600 dark:text-zinc-300">
                {activeKpi.detail}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Category Filter
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Phone", "Laptop", "Console", "Tablet", "TV"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item as CategoryFilter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Revenue Trend
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Monthly revenue and profit
              </h2>
            </div>
            <p className="text-sm text-stone-500 dark:text-zinc-400">
              12-month operating view
            </p>
          </div>

          <ChartShell className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformance}>
                <defs>
                  <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profit" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#78716c"
                  opacity={0.25}
                />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatTooltipCurrency(value)} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#revenue)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#f59e0b"
                  fill="url(#profit)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartShell>
        </article>

        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Job Status
            </p>
            <h2 className="mt-2 text-2xl font-bold">Current repair queue</h2>
          </div>

          <ChartShell className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={jobStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {jobStatus.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartShell>

          <div className="grid gap-3">
            {jobStatus.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: pieColors[index % pieColors.length],
                    }}
                  />
                  <span className="text-stone-600 dark:text-zinc-300">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-3">
            <Smartphone className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Service Mix
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                Revenue by repair category
              </h2>
            </div>
          </div>

          <ChartShell className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCategoryRevenue} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#78716c"
                  opacity={0.25}
                />
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis dataKey="label" type="category" width={135} />
                <Tooltip formatter={(value) => formatTooltipCurrency(value)} />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartShell>
        </article>

        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Marketing
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                Lead source performance
              </h2>
            </div>
          </div>

          <ChartShell className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSources}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#78716c"
                  opacity={0.25}
                />
                <XAxis
                  dataKey="source"
                  angle={-20}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="customers"
                  fill="#10b981"
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey="conversion"
                  fill="#f59e0b"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartShell>
        </article>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pb-6 lg:px-8">
        <article className="rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-stone-200 p-6 dark:border-zinc-800">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      Mock Data Explorer
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">
                      Operational records
                    </h2>
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600 dark:text-zinc-400">
                  Click through fictional repair jobs, customers, technicians,
                  and invoices to see the type of business records this
                  dashboard could analyze. Repair job rows open detailed mock
                  records.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["jobs", "Repair Jobs", Wrench],
                  ["customers", "Customers", Users],
                  ["technicians", "Technicians", UserRound],
                  ["invoices", "Invoices", FileText],
                ].map(([key, label, Icon]) => (
                  <button
                    key={String(key)}
                    type="button"
                    onClick={() => setActiveTab(key as DataTab)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === key
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {String(label)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "jobs" && (
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 dark:bg-zinc-950/60 dark:text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Job ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Device</th>
                    <th className="px-6 py-4 font-semibold">Repair</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Technician</th>
                    <th className="px-6 py-4 font-semibold">Drop-off</th>
                    <th className="px-6 py-4 font-semibold">Estimate</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className="cursor-pointer transition hover:bg-emerald-50 dark:hover:bg-emerald-400/10"
                    >
                      <td className="px-6 py-4 font-bold">{job.id}</td>
                      <td className="px-6 py-4">{job.customer}</td>
                      <td className="px-6 py-4">{job.device}</td>
                      <td className="px-6 py-4 text-stone-600 dark:text-zinc-300">
                        {job.repair}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="px-6 py-4">{job.technician}</td>
                      <td className="px-6 py-4">{job.dropOff}</td>
                      <td className="px-6 py-4">{job.estimate}</td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(job.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "customers" && (
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 dark:bg-zinc-950/60 dark:text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Customer ID</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Address</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Total Spend</th>
                    <th className="px-6 py-4 font-semibold">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 font-bold">{customer.id}</td>
                      <td className="px-6 py-4">{customer.name}</td>
                      <td className="px-6 py-4">{customer.phone}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">{customer.address}</td>
                      <td className="px-6 py-4">{customer.type}</td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(customer.totalSpend)}
                      </td>
                      <td className="px-6 py-4">{customer.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "technicians" && (
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 dark:bg-zinc-950/60 dark:text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Specialty</th>
                    <th className="px-6 py-4 font-semibold">Completed</th>
                    <th className="px-6 py-4 font-semibold">Avg. Time</th>
                    <th className="px-6 py-4 font-semibold">Rating</th>
                    <th className="px-6 py-4 font-semibold">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                  {technicians.map((tech) => (
                    <tr key={tech.name}>
                      <td className="px-6 py-4 font-bold">{tech.name}</td>
                      <td className="px-6 py-4">{tech.phone}</td>
                      <td className="px-6 py-4 text-stone-600 dark:text-zinc-300">
                        {tech.specialty}
                      </td>
                      <td className="px-6 py-4">{tech.completed}</td>
                      <td className="px-6 py-4">{tech.avgTime}</td>
                      <td className="px-6 py-4">{tech.rating}</td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(tech.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "invoices" && (
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 dark:bg-zinc-950/60 dark:text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Invoice ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Service</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Parts Cost</th>
                    <th className="px-6 py-4 font-semibold">Labor Cost</th>
                    <th className="px-6 py-4 font-semibold">Profit</th>
                    <th className="px-6 py-4 font-semibold">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 font-bold">{invoice.id}</td>
                      <td className="px-6 py-4">{invoice.customer}</td>
                      <td className="px-6 py-4">{invoice.service}</td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-6 py-4">
                        {formatCurrency(invoice.partsCost)}
                      </td>
                      <td className="px-6 py-4">
                        {formatCurrency(invoice.laborCost)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-700 dark:text-emerald-300">
                        {formatCurrency(invoice.profit)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-3">
            <PackageSearch className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Business Insights
              </p>
              <h2 className="mt-1 text-2xl font-bold">Recommended actions</h2>
            </div>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={insight.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60"
              >
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Insight {index + 1}
                </p>
                <h3 className="mt-2 font-bold">{insight.title}</h3>
                <p className="mt-2 leading-7 text-stone-600 dark:text-zinc-300">
                  {insight.detail}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-3">
            <Table2 className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Dashboard Coverage
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                What this demo represents
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: CreditCard,
                title: "Revenue & invoice tracking",
                text: "Tracks job value, parts cost, labor cost, and profit per invoice.",
              },
              {
                icon: CalendarDays,
                title: "Repair queue visibility",
                text: "Shows completed, active, waiting-for-parts, and cancelled jobs.",
              },
              {
                icon: Phone,
                title: "Customer records",
                text: "Displays mock customer profiles, contacts, addresses, and spend history.",
              },
              {
                icon: MapPin,
                title: "Local service operations",
                text: "Models the workflow of a practical neighborhood repair business.",
              },
              {
                icon: CheckCircle2,
                title: "Technician performance",
                text: "Compares completion volume, repair time, ratings, and revenue generated.",
              },
              {
                icon: Search,
                title: "Business decision support",
                text: "Turns mock operational data into plain-English business recommendations.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-zinc-300">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <footer className="border-t border-stone-200 bg-white px-5 py-8 dark:border-zinc-800 dark:bg-zinc-950 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-bold">RepairOps Intelligence Dashboard</p>
            <p className="mt-1 text-sm text-stone-500 dark:text-zinc-400">
              Fictional analytics demo built by Itonga for repair and service
              businesses.
            </p>
          </div>

          <a
            href="https://www.itonga.dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-500"
          >
            Return to Itonga
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </footer>

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </main>
  );
}