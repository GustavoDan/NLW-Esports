import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ToggleGroupItemProps {
    value: string;
    title?: string;
    children?: React.ReactNode;
}

export function ToggleGroupItem(props: ToggleGroupItemProps) {
    return (
        <ToggleGroup.Item
            value={props.value}
            title={props.title}
            className='w-11 h-11 rounded bg-zinc-900 [&[data-state="on"]]:bg-violet-500'
        >
            {props.children}
        </ToggleGroup.Item>
    );
}
