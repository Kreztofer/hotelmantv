import { Suspense } from "react";
import AffiliateDashboard from "../components/pages/components/AffiliateDashboard";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <AffiliateDashboard />
    </Suspense>
  );
}
