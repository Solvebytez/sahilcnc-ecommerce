"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CheckoutFormState = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const initialForm: CheckoutFormState = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  disabled,
}: {
  label: string;
  name: keyof CheckoutFormState;
  value: string;
  onChange: (name: keyof CheckoutFormState, value: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      <input
        className="h-11 rounded-lg border border-border bg-background px-3 text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete="on"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const list = useMemo(() => Object.values(items), [items]);

  const [form, setForm] = useState<CheckoutFormState>(initialForm);
  const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success">("idle");
  const [placedItems, setPlacedItems] = useState(list);
  const [orderRef, setOrderRef] = useState("");
  const [expectedContact, setExpectedContact] = useState("");

  useEffect(() => {
    if (checkoutState === "idle") setPlacedItems(list);
  }, [list, checkoutState]);

  const onChange = (name: keyof CheckoutFormState, value: string) =>
    setForm((f) => ({
      ...f,
      [name]: value,
    }));

  const canSubmit = Boolean(
    list.length &&
      form.fullName.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      form.pincode.trim()
  );

  const isLocked = checkoutState !== "idle";

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkout</h1>
            <p className="mt-1 text-muted-foreground">Share your details and we’ll contact you to confirm the order.</p>
          </div>
          <Button asChild variant="outline" disabled={isLocked}>
            <Link href="/cart">Back to cart</Link>
          </Button>
        </div>

        {!hasHydrated ? (
          <Card className="border-border">
            <CardContent className="p-6 text-sm text-muted-foreground">Loading checkout…</CardContent>
          </Card>
        ) : checkoutState === "processing" ? (
          <Card className="border-border">
            <CardContent className="p-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Loader2 className="h-7 w-7 animate-spin text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Processing your checkout</h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Please wait while we validate your request, lock the selected machines, and generate your order reference.
                </p>
                <div className="mt-6 w-full max-w-md rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  <p>Verifying contact details...</p>
                  <p className="mt-1">Reserving {placedItems.length} item(s) from your cart...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : checkoutState === "success" ? (
          <Card className="border-border">
            <CardContent className="p-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Checkout completed successfully</h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Thanks {form.fullName.split(" ")[0] || ""}. Your order request is confirmed and queued with our sales team.
                </p>
                <div className="mt-5 w-full max-w-md rounded-lg border border-border bg-muted/30 p-4 text-left text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order reference</span>
                    <span className="font-semibold text-foreground">{orderRef}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-muted-foreground">Items reserved</span>
                    <span className="font-semibold text-foreground">{placedItems.length}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-muted-foreground">Expected callback</span>
                    <span className="font-semibold text-foreground">{expectedContact}</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCheckoutState("idle");
                      setForm(initialForm);
                      setOrderRef("");
                      setExpectedContact("");
                    }}
                  >
                    Place another request
                  </Button>
                  <Button asChild>
                    <Link href="/shop">
                      Continue shopping <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
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
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="border-border lg:col-span-3">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Shipping & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!canSubmit) return;
                    setPlacedItems(list);
                    setCheckoutState("processing");
                    setOrderRef(`ORD-${Date.now().toString().slice(-6)}`);
                    setExpectedContact(
                      new Intl.DateTimeFormat("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      }).format(new Date(Date.now() + 2 * 60 * 60 * 1000))
                    );

                    window.setTimeout(() => {
                      clear();
                      setCheckoutState("success");
                    }, 2600);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="fullName" value={form.fullName} onChange={onChange} required disabled={isLocked} />
                    <Field label="Phone" name="phone" value={form.phone} onChange={onChange} required disabled={isLocked} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      type="email"
                      required
                      disabled={isLocked}
                    />
                    <Field label="Company" name="company" value={form.company} onChange={onChange} disabled={isLocked} />
                  </div>
                  <Field label="Address" name="address" value={form.address} onChange={onChange} required disabled={isLocked} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="City" name="city" value={form.city} onChange={onChange} required disabled={isLocked} />
                    <Field label="State" name="state" value={form.state} onChange={onChange} required disabled={isLocked} />
                    <Field label="Pincode" name="pincode" value={form.pincode} onChange={onChange} required disabled={isLocked} />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="lg" className="w-full gap-2" disabled={!canSubmit || isLocked}>
                      {checkoutState === "processing" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing…
                        </>
                      ) : (
                        "Complete checkout"
                      )}
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      This is a demo checkout flow. No real payment is charged.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border lg:col-span-2 h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {list.map((item) => (
                    <div key={item.productSlug} className="flex gap-3">
                      <Link href={item.href} className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.imageUrl ?? "/banner.png"}
                          alt={item.title}
                          fill
                          className="object-contain p-1.5"
                          sizes="80px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href={item.href} className="text-sm font-semibold text-foreground hover:underline line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">1 item</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Unique items</span>
                    <span className="font-semibold text-foreground">{list.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

