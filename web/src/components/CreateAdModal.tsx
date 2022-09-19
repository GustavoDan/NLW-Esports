import { FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { Label } from "./Form/Label";
import { ComboBox } from "./Form/ComboBox";
import { ToggleGroupItem } from "./Form/ToggleGroupItem";

export function CreateAdModal() {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [selectedGame, setSelectedGame] = useState("");

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        let data = Object.fromEntries(formData);

        for (let value of [selectedGame, ...Object.values(data)]) {
            if (!value) {
                return;
            }
        }
        if (weekDays.length == 0) {
            return;
        }

        try {
            await axios.post(
                `http://localhost:3333/games/${selectedGame}/ads`,
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekdays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel,
                }
            );

            alert("Anúncio criado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar o anúncio!");
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-[32px] font-black text-center">
                    Publique um anúncio
                </Dialog.Title>

                <form
                    onSubmit={handleCreateAd}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label text="Qual o game?" htmlFor="game" />
                        <ComboBox
                            id="game"
                            valueChangedHandler={setSelectedGame}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label text="Seu nome (ou nickname)?" htmlFor="name" />
                        <Input
                            name="name"
                            id="name"
                            placeholder="Como te chamam dentro do game?"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <Label
                                text="Joga há quantos anos?"
                                htmlFor="yearsPlaying"
                            />
                            <Input
                                name="yearsPlaying"
                                id="yearsPlaying"
                                type="number"
                                min={0}
                                placeholder="Tudo bem ser ZERO"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label text="Qual seu Discord?" htmlFor="discord" />
                            <Input
                                name="discord"
                                id="discord"
                                placeholder="Usuario#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <Label
                                text="Quando costuma jogar?"
                                htmlFor="weekDays"
                            />

                            <ToggleGroup.Root
                                id="weekDays"
                                type="multiple"
                                className="grid grid-cols-4 gap-1"
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroupItem value="0" title="Domingo">
                                    D
                                </ToggleGroupItem>
                                <ToggleGroupItem value="1" title="Segunda">
                                    S
                                </ToggleGroupItem>
                                <ToggleGroupItem value="2" title="Terça">
                                    T
                                </ToggleGroupItem>
                                <ToggleGroupItem value="3" title="Quarta">
                                    Q
                                </ToggleGroupItem>
                                <ToggleGroupItem value="4" title="Quinta">
                                    Q
                                </ToggleGroupItem>
                                <ToggleGroupItem value="5" title="Sexta">
                                    S
                                </ToggleGroupItem>
                                <ToggleGroupItem value="6" title="Sábado">
                                    S
                                </ToggleGroupItem>
                            </ToggleGroup.Root>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label
                                text="Qual horário do dia?"
                                htmlFor="hourStart"
                            />
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-around">
                                    <Label text="De" htmlFor="hourStart" />
                                    <Input
                                        name="hourStart"
                                        id="hourStart"
                                        type="time"
                                        placeholder="De"
                                    />
                                </div>
                                <div className="flex items-center justify-around">
                                    <Label text="Até" htmlFor="hourEnd" />
                                    <Input
                                        name="hourEnd"
                                        id="hourEnd"
                                        type="time"
                                        placeholder="Até"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            id="useVoiceChannel"
                            className="w-6 h-6 rounded bg-zinc-900 flex justify-center items-center"
                            onCheckedChange={(checked) =>
                                setUseVoiceChannel(checked === true)
                            }
                        >
                            <Checkbox.Indicator>
                                <Check size={16} className="text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                            htmlFor="useVoiceChannel"
                            className="text-sm select-none"
                        >
                            Costumo me conectar ao chat de voz
                        </label>
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}
