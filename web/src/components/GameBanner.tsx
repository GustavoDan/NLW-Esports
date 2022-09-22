interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a
            href=""
            className="relative rounded-lg overflow-hidden keen-slider__slide"
        >
            <img src={props.bannerUrl} alt="" />

            <div className="w-full pt-16 pb-4 bg-shadow absolute bottom-0 left-0 right-0 text-center">
                <strong className="font-bold text-white block text-ellipsis whitespace-nowrap overflow-hidden">
                    {props.title}
                </strong>
                <span className="text-zinc-300 text-sm block">
                    {props.adsCount} anúncio{props.adsCount > 1 ? "s" : ""}.
                </span>
            </div>
        </a>
    );
}
