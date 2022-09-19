import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
}

export function Label({ text, ...rest }: LabelProps) {
    return (
        <label {...rest} className="font-semibold">
            {text}
        </label>
    );
}
