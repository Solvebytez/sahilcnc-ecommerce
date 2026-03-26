"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const list = Object.values(items);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Cart</h1>
            <p className="mt-1 text-muted-foreground">
              {hasHydrated ? `${list.length} unique item${list.length === 1 ? "" : "s"}` : "Loading..."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/shop">Continue shopping</Link>
            </Button>
            <Button variant="outline" onClick={() => clear()} disabled={!list.length || isCheckingOut}>
              Clear cart
            </Button>
          </div>
        </div>

        {!hasHydrated ? (
          <Card className="border-border">
            <CardContent className="p-6 text-sm text-muted-foreground">Loading cart…</CardContent>
          </Card>
        ) : list.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-8">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/shop">Browse products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {list.map((item) => (
                <Card key={item.productSlug} className="border-border overflow-hidden">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex gap-4">
                      <Link href={item.href} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.imageUrl ?? "/banner.png"}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                          sizes="112px"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link href={item.href} className="font-semibold text-foreground hover:underline line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">1 item</p>
                      </div>

                      <Button
                        variant="outline"
                        className="shrink-0"
                        onClick={() => removeItem(item.productSlug)}
                        disabled={isCheckingOut}
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Unique items</span>
                  <span className="font-semibold text-foreground">{list.length}</span>
                </div>
                <div className="pt-2">
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    disabled={!list.length || isCheckingOut}
                    onClick={() => {
                      setIsCheckingOut(true);
                      window.setTimeout(() => {
                        router.push("/checkout");
                      }, 1800);
                    }}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting to checkout…
                      </>
                    ) : (
                      <>
                        Proceed to checkout
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Checkout is a request flow for now (no payment integration yet).
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

