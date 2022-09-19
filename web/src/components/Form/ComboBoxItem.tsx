import * as Select from "@radix-ui/react-select";
import { Check } from "phosphor-react";
import { Game } from "../../App";

export function ComboBoxItem(props: Game) {
    return (
        <Select.Item
            className={
                'py-3 px-4 relative [&[data-highlighted]]:bg-zinc-600 flex items-center justify-between [&[data-state="checked"]]:bg-zinc-800'
            }
            value={props.id}
        >
            <Select.ItemText>{props.title}</Select.ItemText>
            <Select.ItemIndicator>
                <Check size={16} className="text-emerald-400" />
            </Select.ItemIndicator>
        </Select.Item>
    );
}
