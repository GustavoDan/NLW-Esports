import {
    ButtonHTMLAttributes,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp } from "phosphor-react";
import { Game } from "../../App";
import { ComboBoxItem } from "./ComboBoxItem";
import axios from "axios";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueChangedHandler?: Dispatch<SetStateAction<string>>;
}

export function ComboBox({ valueChangedHandler, ...rest }: ButtonProps) {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios("http://localhost:3333/games").then((response) =>
            setGames(response.data)
        );
    }, []);

    return (
        <Select.Root onValueChange={valueChangedHandler}>
            <Select.Trigger
                {...rest}
                className="bg-zinc-900 py-3 px-4 rounded text-sm select-none [&[data-placeholder]]:text-zinc-500 flex justify-between"
            >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon className="text-zinc-400">
                    <CaretDown size={24} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className=" bg-zinc-900 text-white rounded select-none shadow-lg overflow-hidden border-2 border-zinc-700">
                    <Select.ScrollUpButton className="flex items-center justify-center">
                        <CaretUp size={16} />
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                        {games.map((game) => (
                            <ComboBoxItem {...game} key={game.id} />
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center">
                        <CaretDown size={16} />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
