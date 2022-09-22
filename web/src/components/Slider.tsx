import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import { Game } from "../App";
import { GameBanner } from "./GameBanner";
import { CaretLeft, CaretRight } from "phosphor-react";

interface SliderProps {
    games: Game[];
}

export function Slider({ games }: SliderProps) {
    const MutationPlugin: KeenSliderPlugin = (slider) => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                slider.update();
            });
        });
        const config = { childList: true };

        slider.on("created", () => {
            observer.observe(slider.container, config);
        });
        slider.on("destroyed", () => {
            observer.disconnect();
        });
    };

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slides: {
                perView: 6,
                spacing: 24,
            },
            loop: true,
        },
        [MutationPlugin]
    );

    return (
        <div className="w-full flex flex-row gap-6 justify-center items-center select-none">
            <div
                onClick={(e: any) =>
                    e.stopPropagation() ||
                    instanceRef.current?.moveToIdx(
                        instanceRef.current?.track.details.abs - 6,
                        true
                    )
                }
                className="h-60 flex items-center cursor-pointer shrink-0"
            >
                <CaretLeft size={48} className="text-zinc-400" />
            </div>

            <div ref={sliderRef} className="keen-slider">
                {games.map((game) => {
                    return (
                        <GameBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads}
                        />
                    );
                })}
            </div>

            <div
                onClick={(e: any) =>
                    e.stopPropagation() ||
                    instanceRef.current?.moveToIdx(
                        instanceRef.current?.track.details.abs + 6,
                        true
                    )
                }
                className="h-60 flex items-center cursor-pointer shrink-0"
            >
                <CaretRight size={48} className="text-zinc-400" />
            </div>
        </div>
    );
}
