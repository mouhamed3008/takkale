import { ReactNode } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

interface CartSelectOption {
    value: string;
    label: string;
    phone?: string;
    email?: string;
    address?: string;
}

interface CartSelectFieldProps {
    label: string;
    value: string;
    placeholder: string;
    options: CartSelectOption[];
    onValueChange: (value: string) => void;
    required?: boolean;
    details?: ReactNode;
}

export default function CartSelectField({ label, value, placeholder, options, onValueChange, required = false, details }: CartSelectFieldProps) {
    const selectedOption = options.find((option) => option.value === value) ?? null;

    return (
        <div className="space-y-3">
            <label className="text-base font-medium text-slate-900">
                {label}
                {required ? <span className="text-rose-500"> *</span> : null}
            </label>

            <ReactSelect<CartSelectOption, false>
                value={selectedOption}
                options={options}
                isClearable={!required}
                placeholder={placeholder}
                onChange={(option: SingleValue<CartSelectOption>) => onValueChange(option?.value ?? '')}
                unstyled
                classNames={{
                    control: (state) =>
                        [
                            'flex min-h-12 items-center rounded-xl border  bg-white px-3  transition',
                            state.isFocused ? 'border-primary ring-2 ring-slate-200' : 'border-slate-200',
                        ].join(' '),
                    valueContainer: () => 'px-1 py-1 gap-2',
                    placeholder: () => 'text-sm text-slate-400',
                    singleValue: () => 'text-sm text-slate-900',
                    input: () => 'text-sm text-slate-900',
                    indicatorsContainer: () => 'gap-1',
                    clearIndicator: () => 'cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600',
                    dropdownIndicator: () => 'cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600',
                    menu: () => 'mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white ',
                    menuList: () => 'p-2',
                    option: (state) =>
                        [
                            'cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-700',
                            state.isFocused ? 'bg-slate-100' : '',
                            state.isSelected ? 'bg-slate-900 text-white' : '',
                        ].join(' '),
                    noOptionsMessage: () => 'px-3 py-2 text-sm text-slate-400',
                }}
            />

            {details}
        </div>
    );
}
