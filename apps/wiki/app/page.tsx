import { SiteFooter } from "@/components/site-footer";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function WikiHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div>
          <BackgroundPaths title="AndesOriCore Wiki" showBackdrop={false} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
