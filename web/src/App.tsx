import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { Slider } from "./components/Slider";

import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios("http://localhost:3333/games").then((response) =>
            setGames(response.data)
        );
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logoImg} />
            <h1 className="text-6xl text-white font-black mt-20 mb-16">
                Seu{" "}
                <span className="bg-rainbow bg-clip-text text-transparent">
                    duo
                </span>{" "}
                está aqui.
            </h1>

            <Slider games={games} />

            <Dialog.Root>
                <CreateAdBanner />

                <CreateAdModal />
            </Dialog.Root>
        </div>
    );
}

export default App;
