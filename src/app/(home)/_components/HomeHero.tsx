import HeroFilter from "./filter/HeroFilter"

export const HomeHero = () => {
    return (
        <div className={`bg-[url(/images/home/hero.webp)] bg-no-repeat bg-cover`} >
            <div className="h-screen max-w-7xl mx-auto flex flex-col justify-center items-center ">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-[4rem] font-bold text-center leading-tight text-white">
                        {"Tirematic:"}
                        <br />
                        Your Road to Reliability
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-2xl text-center  text-white">
                            {
                                "Premium quality doesn't have to come at a premium price. Experience top-tier performance and affordability with Tirematic tires."
                            }
                        </p>
                    </div>
                    <HeroFilter />
                </div>
            </div>
        </div>
    )
}