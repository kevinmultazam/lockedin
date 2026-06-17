import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calcDayCompletion } from "../hooks/useBackend";
import type { DayData } from "../types";

interface ProgressChartProps {
  allProgress: DayData[];
  currentDay: number;
}

interface TooltipPayload {
  value: number;
  payload: {
    day: number;
    completion: number;
    status: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0];
  return (
    <div className="bg-card border border-border rounded-2xl px-3 py-2 shadow-elevated text-xs">
      <p className="font-medium text-foreground">Day {data.payload.day}</p>
      <p className="text-muted-foreground mt-0.5">
        {data.payload.status === "future"
          ? "Not started yet"
          : `${data.value}% completed`}
      </p>
    </div>
  );
}

export function ProgressChart({ allProgress, currentDay }: ProgressChartProps) {
  const chartData = allProgress.map((d) => {
    const status =
      d.day < currentDay ? "past" : d.day === currentDay ? "current" : "future";
    const completion = status === "future" ? 0 : calcDayCompletion(d);
    return {
      day: d.day,
      completion,
      status,
      label: `D${d.day}`,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={chartData}
        barSize={8}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          vertical={false}
          stroke="oklch(var(--border))"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          interval={4}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.day}`}
              fill={
                entry.status === "future"
                  ? "oklch(var(--muted))"
                  : entry.status === "current"
                    ? "oklch(var(--accent))"
                    : entry.completion === 100
                      ? "oklch(var(--accent))"
                      : "oklch(var(--accent) / 0.45)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
