import { cookies } from "next/headers";
import { Suspense } from "react";
import { ContentShell } from "@/components/chat/content-shell";
import { DataStreamProvider } from "@/components/chat/data-stream-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DataStreamProvider>
      <Suspense fallback={<div className="flex h-dvh bg-sidebar" />}>
        <SidebarShell>{children}</SidebarShell>
      </Suspense>
    </DataStreamProvider>
  );
}

async function SidebarShell({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return <ContentShell defaultOpen={!isCollapsed}>{children}</ContentShell>;
}
