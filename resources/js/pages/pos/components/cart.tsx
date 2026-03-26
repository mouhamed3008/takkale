import cart from '@/routes/cart';
import { PaymentMethods } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import CartDetails from './cart-details';
import CartEmptyState from './cart-empty-state';
import CartItemCard from './cart-item-card';
import CartSelectField from './cart-select-field';
import CartSummary from './cart-summary';
import type { CartItem, CustomerOption } from './cart-types';

export type { CartItem, CustomerOption, PaymentOption } from './cart-types';

interface CartProps {
    items: CartItem[];
    customer: string;
    onCustomerChange: (value: string) => void;
    customers: CustomerOption[];
    paymentMethod: PaymentMethods[];
    // onPaymentMethodChange: (value: string) => void;
    paymentMethods: PaymentMethods[];
}

export default function Cart({ items, customer, onCustomerChange, customers, paymentMethods }: CartProps) {
    const selectedCustomer = customers.find((option) => option.value === customer);
    const selectedCustomerData = selectedCustomer
        ? {
              id: parseInt(selectedCustomer.value),
              fullname: selectedCustomer.label,
              email: selectedCustomer.email,
              phone: selectedCustomer.phone,
              address: selectedCustomer.address,
              created_at: '',
              updated_at: '',
          }
        : null;
    const [modalOpen, setModalOpen] = useState(false);

    const updateQty = (productId: number, delta: number) => {
        router.post(cart.add.url(), { product_id: productId, qty: delta }, { preserveScroll: true, preserveState: true });
    };

    const removeItem = (productId: number) => {
        router.post(cart.remove.url(), { product_id: productId }, { preserveScroll: true });
    };

    const clearCart = () => {
        router.post(cart.clear.url(), {}, { preserveScroll: true });
    };

    const total = Object.values(items).reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalQty = Object.values(items).reduce((sum, item) => sum + item.qty, 0);

    return (
        <aside className="flex h-full w-full shrink-0 flex-col overflow-hidden bg-white xl:max-w-[420px]">
            <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-950">Detail Order</h2>
                    <p className="mt-1 text-sm text-slate-500">Review and complete this transaction</p>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden px-6 py-6">
                <CartSelectField
                    label="Customer"
                    value={customer}
                    placeholder="Select a customer"
                    options={customers}
                    onValueChange={onCustomerChange}
                    details={
                        selectedCustomer ? (
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-600">
                                <p className="font-semibold text-slate-900">{selectedCustomer.label}</p>
                                <p className="mt-1">{selectedCustomer.phone || 'No phone number'}</p>
                            </div>
                        ) : null
                    }
                />

                <div className="flex min-h-0 flex-1 flex-col space-y-4">
                    <p className="text-base font-medium text-slate-900">Your order :</p>

                    {Object.values(items).length ? (
                        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-2">
                            {Object.values(items).map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onIncreaseQuantity={updateQty}
                                    onDecreaseQuantity={updateQty}
                                    onRemoveItem={removeItem}
                                />
                            ))}
                        </div>
                    ) : (
                        <CartEmptyState />
                    )}
                </div>
            </div>

            <div className="shrink-0 border-t border-slate-200/80 bg-[#fcfbf8] px-6 py-6">
                <CartSummary itemCount={totalQty} subtotal={total} tax={0} total={total} />

                <div className="mt-6">
                    {/* <CartSelectField
                        label="Payment method"
                        value={paymentMethod}
                        placeholder="Select a payment method"
                        options={paymentMethods}
                        onValueChange={onPaymentMethodChange}
                        required
                    /> */}
                </div>

                <CartDetails
                    itemCount={totalQty}
                    subtotal={total}
                    tax={0}
                    total={total}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    selectedCustomer={selectedCustomerData}
                    paymentMethods={paymentMethods}
                />
            </div>
        </aside>
    );
}
